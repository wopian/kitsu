import { createHash } from 'node:crypto'
import collection from '../../../specification/getCollection/jsonapi.ts'
import collectionIncludes from '../../../specification/getCollectionWithIncludes/jsonapi.ts'
import single from '../../../specification/getSingle/jsonapi.ts'
import singleIncludes from '../../../specification/getSingleWithIncludes/jsonapi.ts'
import nested from '../../../specification/getSingleWithNestedIncludes/jsonapi.ts'
import patch from '../../../specification/patchSingle/jsonapi.ts'
import type { Fixture, JsonApiDocument, JsonApiResource, Schema } from './types.ts'

export const list = <T>(value: T | T[] | null | undefined): T[] =>
  value == null ? [] : Array.isArray(value) ? value : [value]
export const identity = (resource: { type?: string; id?: string | number }) =>
  JSON.stringify([resource.type, String(resource.id)])

/** Validate resource identity, linkage, field namespaces and compound-document reachability. */
export function validateDocument(document: JsonApiDocument): void {
  if (document.errors && document.data !== undefined) throw new Error('data and errors coexist')
  if (document.included && document.data === undefined) throw new Error('included requires data')
  const resources = [...list(document.data), ...(document.included ?? [])]
  const indexed = new Map<string, JsonApiResource>()
  for (const resource of resources) {
    if (typeof resource.id !== 'string' || typeof resource.type !== 'string')
      throw new Error('resource type and id must be strings')
    const key = identity(resource)
    if (indexed.has(key)) throw new Error(`duplicate resource ${key}`)
    indexed.set(key, resource)
    for (const name of Object.keys(resource.attributes ?? {})) {
      if (['id', 'type'].includes(name) || name in (resource.relationships ?? {}))
        throw new Error(`conflicting field ${name}`)
    }
    for (const [name, relationship] of Object.entries(resource.relationships ?? {})) {
      if (['id', 'type'].includes(name)) throw new Error(`conflicting field ${name}`)
      if (!('data' in relationship || 'links' in relationship || 'meta' in relationship))
        throw new Error('empty relationship')
      for (const target of list(relationship.data)) {
        if (typeof target.type !== 'string' || typeof target.id !== 'string')
          throw new Error('relationship type and id must be strings')
      }
    }
  }
  const visited = new Set<string>()
  const pending = list(document.data).map(identity)
  while (pending.length) {
    const key = pending.pop() as string
    if (visited.has(key)) continue
    visited.add(key)
    for (const relationship of Object.values(indexed.get(key)?.relationships ?? {}))
      pending.push(...list(relationship.data).map(identity))
  }
  for (const included of document.included ?? [])
    if (!visited.has(identity(included))) throw new Error('included resource lacks full linkage')
}

export function fixture(id: string, document: JsonApiDocument): Fixture {
  validateDocument(document)
  const schemas: Record<string, Schema> = {}
  for (const resource of [...list(document.data), ...(document.included ?? [])]) {
    const type = resource.type as string
    schemas[type] ??= { attributes: [], relationships: {} }
    const schema = schemas[type]
    schema.attributes = [
      ...new Set([...schema.attributes, ...Object.keys(resource.attributes ?? {})]),
    ]
    for (const [name, relationship] of Object.entries(resource.relationships ?? {})) {
      const target = list(relationship.data)[0]
      schema.relationships[name] = {
        type: target?.type ?? schema.relationships[name]?.type ?? type,
        many: Array.isArray(relationship.data),
        linkage: 'data' in relationship || schema.relationships[name]?.linkage === true,
      }
    }
  }
  return {
    id,
    document,
    schemas,
    hash: createHash('sha256').update(JSON.stringify(document)).digest('hex'),
    primaryCount: list(document.data).length,
    includedCount: document.included?.length ?? 0,
  }
}

function stress(count: number, comments: number, shared: boolean, depth = 0): JsonApiDocument {
  const data: JsonApiResource[] = []
  const included = new Map<string, JsonApiResource>()
  for (let index = 0; index < count; index++) {
    const article = structuredClone(singleIncludes.data) as JsonApiResource
    article.id = String(index + 1)
    article.relationships = {}
    const author = structuredClone(nested.included[0]) as JsonApiResource
    author.id = shared ? 'author' : `author-${index}`
    article.relationships.author = { data: { type: author.type, id: author.id } }
    included.set(identity(author), author)
    const related: JsonApiResource[] = []
    for (let offset = 0; offset < comments; offset++) {
      const comment = structuredClone(nested.included[1]) as JsonApiResource
      comment.id = shared ? `comment-${offset}` : `comment-${index}-${offset}`
      comment.relationships = { author: { data: { type: author.type, id: author.id } } }
      related.push({ type: comment.type, id: comment.id })
      included.set(identity(comment), comment)
    }
    article.relationships.comments = { data: related }
    data.push(article)
  }
  if (depth) {
    let previous = included.values().next().value as JsonApiResource
    for (let index = 0; index < depth; index++) {
      const person = structuredClone(nested.included[0]) as JsonApiResource
      person.id = `nested-${index}`
      previous.relationships = { colleague: { data: { type: person.type, id: person.id } } }
      included.set(identity(person), person)
      previous = person
    }
  }
  return { data, included: [...included.values()] }
}

const plain = structuredClone(single) as JsonApiDocument
delete (plain.data as JsonApiResource).relationships
const self = structuredClone(nested) as JsonApiDocument
;(self.included as JsonApiResource[])[0].relationships = {
  colleague: { data: { type: 'people', id: '1' } },
}
const mutual = structuredClone(self)
;(mutual.included as JsonApiResource[])[0].relationships = {
  colleague: { data: { type: 'people', id: 'other' } },
}
mutual.included?.push({
  type: 'people',
  id: 'other',
  attributes: { number: 1 },
  relationships: { colleague: { data: { type: 'people', id: '1' } } },
})
const empty = structuredClone(plain)
;(empty.data as JsonApiResource).relationships = {
  author: { data: null },
  comments: { data: [] },
}

/** Stress fixtures retain specification attributes; only topology and identities change. */
export function fixtures(smoke = false, only?: string): Fixture[] {
  const sources: [string, () => JsonApiDocument][] = [
    ['small-no-relationships', () => plain],
    ['small-links-only', () => single],
    ['small-relationships', () => singleIncludes],
    ['nested-relationships', () => nested],
    ['collection', () => collection],
    ['collection-includes', () => collectionIncludes],
    ['patch-single', () => patch],
    ['empty-relationships', () => empty],
    ['few-includes', () => stress(smoke ? 3 : 1000, 2, true)],
    ['many-includes', () => stress(smoke ? 3 : 1000, 2, false)],
    ['complex-relationships', () => stress(smoke ? 3 : 1000, smoke ? 3 : 20, false, 16)],
    ['wide-relationship', () => stress(1, smoke ? 8 : 4000, false)],
    ['self-cycle', () => self],
    ['mutual-cycle', () => mutual],
  ]
  return sources
    .filter(([id]) => !only || id === only)
    .map(([id, document]) => fixture(id, document()))
}
