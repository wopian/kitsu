import { isDeepStrictEqual } from 'node:util'
import { identity, list } from './fixtures.ts'
import { type Fixture, Incorrect, type JsonApiResource, type View } from './types.ts'

export const flatView: View = {
  roots: (output) => output,
  type: (resource) => resource.type,
  id: (resource) => String(resource.id),
  attribute: (resource, key) => resource[key],
  relationship: (resource, key) => resource[key],
}
export const wrappedView: View = {
  ...flatView,
  roots: (output) => output.data,
  relationship: (resource, key) => resource[key]?.data,
}

/** Touch actual relationships, including lazy ORM getters, inside measured work. */
export function touchGraph(output: any, view: View, fixture: Fixture): void {
  const seen = new Set<string>()
  const pending = [...list(view.roots(output))]
  while (pending.length) {
    const resource = pending.pop()
    if (!resource || typeof resource !== 'object') continue
    const key = identity({ type: view.type(resource), id: view.id(resource) })
    if (seen.has(key)) continue
    seen.add(key)
    const schema = fixture.schemas[view.type(resource)]
    if (!schema) continue
    for (const name of Object.keys(schema.relationships))
      pending.push(...list(view.relationship(resource, name)))
  }
}

/** Read decoded values, not fixture values, when preparing write requests. */
export function requestResources(output: any, view: View, fixture: Fixture): any {
  const roots = view.roots(output)
  const resources = list(roots).map((resource) => {
    const type = view.type(resource)
    const schema = fixture.schemas[type]
    if (!schema) throw new Incorrect('decoded resource has unknown type')
    const result: JsonApiResource = { type, id: view.id(resource), attributes: {} }
    for (const name of schema.attributes) {
      const value = view.attribute(resource, name)
      if (value !== undefined) (result.attributes as Record<string, any>)[name] = value
    }
    for (const [name, relationship] of Object.entries(schema.relationships)) {
      if (!relationship.linkage) continue
      const value = view.relationship(resource, name)
      if (value === undefined) continue
      const identifiers = list(value).map((target) => ({
        type: view.type(target) ?? relationship.type,
        id: view.id(target),
      }))
      result.relationships ??= {}
      result.relationships[name] = {
        data: value === null ? null : Array.isArray(value) ? identifiers : identifiers[0],
      }
    }
    return result
  })
  return Array.isArray(roots) ? resources : resources[0]
}

export function expectedRequest(fixture: Fixture): any {
  const resources = list(fixture.document.data).map((resource) => {
    const result: JsonApiResource = {
      type: resource.type,
      id: resource.id,
      attributes: structuredClone(resource.attributes ?? {}),
    }
    for (const [name, relationship] of Object.entries(resource.relationships ?? {})) {
      if (!('data' in relationship)) continue
      result.relationships ??= {}
      result.relationships[name] = { data: structuredClone(relationship.data) }
    }
    return result
  })
  return { data: Array.isArray(fixture.document.data) ? resources : resources[0] }
}

export function validateDecoded(output: any, view: View, fixture: Fixture): void {
  const roots = view.roots(output)
  if (Array.isArray(roots) !== Array.isArray(fixture.document.data))
    throw new Incorrect('decoded primary cardinality differs')
  const actualRoots = list(roots)
  const expectedRoots = list(fixture.document.data)
  if (actualRoots.length !== expectedRoots.length)
    throw new Incorrect('decoded primary count differs')
  const indexed = new Map(
    [...expectedRoots, ...(fixture.document.included ?? [])].map((resource) => [
      identity(resource),
      resource,
    ]),
  )
  const visited = new Set<string>()
  const pending = actualRoots.map((actual, index) => ({ actual, expected: expectedRoots[index] }))
  while (pending.length) {
    const { actual, expected } = pending.pop() as (typeof pending)[number]
    const key = identity(expected)
    if (!actual || view.type(actual) !== expected.type || view.id(actual) !== String(expected.id))
      throw new Incorrect(`decoded identity differs: ${key}`)
    // Validate repeated representations too; missing included attributes must never earn a score.
    for (const [name, value] of Object.entries(expected.attributes ?? {}))
      if (!isDeepStrictEqual(view.attribute(actual, name), value))
        throw new Incorrect(`decoded attribute differs: ${key}.${name}`)
    if (visited.has(key)) continue
    visited.add(key)
    for (const [name, relationship] of Object.entries(expected.relationships ?? {})) {
      if (!('data' in relationship)) continue
      const value = view.relationship(actual, name)
      if (relationship.data === null) {
        if (value !== null) throw new Incorrect(`decoded null relationship differs: ${name}`)
        continue
      }
      if (Array.isArray(value) !== Array.isArray(relationship.data))
        throw new Incorrect(`decoded relationship cardinality differs: ${name}`)
      const actualTargets = list(value)
      const expectedTargets = list(relationship.data)
      if (actualTargets.length !== expectedTargets.length)
        throw new Incorrect(`decoded relationship count differs: ${name}`)
      for (let index = 0; index < expectedTargets.length; index++) {
        const identifier = expectedTargets[index]
        pending.push({
          actual: actualTargets[index],
          expected: indexed.get(identity(identifier)) ?? identifier,
        })
      }
    }
  }
}

function normalizedRequest(document: any): any {
  const resources = list(document?.data).map((resource) => {
    const result: any = {
      type: resource.type,
      id: String(resource.id),
      attributes: resource.attributes ?? {},
    }
    const relationships: any = {}
    for (const [name, relation] of Object.entries<any>(resource.relationships ?? {})) {
      if (!('data' in relation)) continue
      const identifiers = list<any>(relation.data).map((target) => ({
        type: target.type,
        id: String(target.id),
      }))
      relationships[name] = {
        data:
          relation.data === null
            ? null
            : Array.isArray(relation.data)
              ? identifiers
              : identifiers[0],
      }
      // Relationship linkage cannot embed resource attributes or nested relationships.
      for (const target of list<any>(relation.data))
        if ('attributes' in target || 'relationships' in target)
          throw new Incorrect('encoded relationship contains resource object')
    }
    if (Object.keys(relationships).length) result.relationships = relationships
    return result
  })
  if (document?.included?.length)
    throw new Incorrect('request unexpectedly contains included resources')
  return { data: Array.isArray(document?.data) ? resources : resources[0] }
}

export function validateEncoded(document: any, fixture: Fixture): void {
  if (!isDeepStrictEqual(normalizedRequest(document), normalizedRequest(expectedRequest(fixture))))
    throw new Incorrect('encoded request differs from expected attributes or linkage')
}

/** Preparation only: convert canonical request resources into a library's native input shape. */
export function plainNative(resources: any, wrappers = false, names = false): any {
  const mapped = list<any>(resources).map((resource) => {
    const output: any = { ...resource.attributes, type: resource.type, id: resource.id }
    const relationshipNames: string[] = []
    for (const [name, relationship] of Object.entries<any>(resource.relationships ?? {})) {
      output[name] = wrappers ? { data: relationship.data } : relationship.data
      relationshipNames.push(name)
    }
    if (names && relationshipNames.length) output.relationshipNames = relationshipNames
    return output
  })
  return Array.isArray(resources) ? mapped : mapped[0]
}
