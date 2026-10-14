import {
  extensionMember,
  extraMember,
  fail,
  identity,
  mapData,
  memberCount,
  resourceIndex,
} from './internal/members.js'
import type { FlatResource, JsonObject, SerialiseOptions } from './types.js'

const member = /^[a-z\d\u0080-\u{10ffff}](?:[\w\u0080-\u{10ffff} -]*[a-z\d\u0080-\u{10ffff}])?$/iu

/**
 * Serialises flat resources and direct relationships into a JSON:API document.
 * Put resource metadata under `$` and explicit attribute overrides under `$.attributes`.
 *
 * @param {string} type Resource type
 * @param {Object|Object[]} [data={}] Flat primary data
 * @param {string} [method=POST] Request method
 * @param {Object} [options={}] Serialization options
 * @param {Function} [options.camelCaseTypes] Transform inferred resource types
 * @param {Function} [options.pluralTypes] Pluralize inferred resource types
 * @param {Object} [options.document] Additional top-level document members
 * @param {boolean} [options.relationship=false] Serialize primary data as identifiers
 * @returns {Object} JSON:API document with deduplicated included resources
 * @example
 * serialise('articles', { title: 'Hello', author: { type: 'people', id: '9' } })
 * // { data: { type: 'articles', attributes: { title: 'Hello' }, relationships: { author: { data: { type: 'people', id: '9' } } } } }
 */
export function serialise(
  type?: string,
  data: FlatResource | FlatResource[] | null = {},
  method = 'POST',
  options: SerialiseOptions = {},
): JsonObject {
  method = method.toUpperCase()
  data = structuredClone(data)
  const document = structuredClone(options.document || {})
  if ('data' in document || 'errors' in document) fail('document cannot override data/errors')
  const transform = (value: string) => {
    value = options.camelCaseTypes?.(value) ?? value
    return options.pluralTypes?.(value) ?? value
  }
  const visited = new WeakMap<object, JsonObject>()
  const collected: JsonObject[] = []
  function identifier(input: JsonObject, fallback: string, lid = input.$?.lid): JsonObject {
    const result: JsonObject = { type: input.type ?? fallback }
    if (typeof result.type !== 'string' || !member.test(result.type)) fail('Invalid resource type')
    for (const [key, value] of Object.entries({ id: input.id ?? undefined, lid })) {
      if (value === undefined) continue
      if (typeof value !== 'string' && (key !== 'id' || typeof value !== 'number'))
        fail(`Invalid resource ${key}`)
      result[key] = String(value)
    }
    return result
  }
  function rawIdentifier(input: JsonObject, fallback: string): JsonObject {
    const result = identifier(input, fallback, input.lid)
    if (result.id === undefined && result.lid === undefined) fail('Relationship requires id or lid')
    for (const [key, value] of Object.entries(input))
      if ((key === 'meta' || extensionMember(key)) && value !== undefined) result[key] = value
    return result
  }
  function resource(input: FlatResource, resourceType: string, root = false): JsonObject {
    if (!input || typeof input !== 'object' || Array.isArray(input))
      fail(`${method} requires an object or array body`)
    if (visited.has(input)) return visited.get(input) as JsonObject
    const result = identifier(
      { ...input, type: root && !options.relationship ? resourceType : input.type },
      resourceType,
    )
    if (root && method !== 'POST' && result.id === undefined && !options.relationship)
      fail(`${method} requires an ID for the ${resourceType} type`)
    const envelope = input.$ || {}
    for (const [key, value] of Object.entries(envelope)) {
      if (['links', 'meta'].includes(key) || extensionMember(key)) result[key] = value
    }
    visited.set(input, result)
    collected.push(result)
    const attributes: JsonObject = {}
    const relationships: JsonObject = { ...envelope.relationships }
    function linkage(value: any, fallback: string, saved: any): any {
      return mapData(value, (value) => {
        const related = resource(value, fallback)
        const reference = rawIdentifier(
          { type: related.type, id: related.id, lid: related.lid },
          fallback,
        )
        const previous = (Array.isArray(saved) ? saved : saved ? [saved] : []).find(
          (item: JsonObject) =>
            identity(item) === identity(reference) ||
            (reference.lid !== undefined &&
              item.lid === reference.lid &&
              item.type === reference.type),
        )
        for (const key of Object.keys(previous || {}))
          if (key === 'meta' || extensionMember(key)) reference[key] = previous[key]
        return reference
      })
    }
    for (const [key, value] of Object.entries(input)) {
      if (['id', 'type', '$'].includes(key)) continue
      if (!member.test(key) && !key.startsWith('@')) fail(`Invalid field: ${key}`)
      if (Object.hasOwn(envelope.attributes || {}, key)) continue
      const candidates = Array.isArray(value) ? value : [value]
      const isRelationship =
        !key.startsWith('@') &&
        ((Array.isArray(value) && value.length === 0) ||
          candidates.some(
            (item: any) =>
              item &&
              typeof item === 'object' &&
              ('id' in item || 'type' in item || item.$?.lid !== undefined),
          ) ||
          Object.hasOwn(relationships, key))
      if (isRelationship) {
        relationships[key] = {
          ...relationships[key],
          data: linkage(value, transform(key), relationships[key]?.data),
        }
      } else attributes[key] = value
    }
    for (const [key, value] of Object.entries(envelope.attributes || {})) {
      if (['id', 'type', '$'].includes(key) || (!member.test(key) && !key.startsWith('@')))
        fail(`Invalid field: ${key}`)
      if (Object.hasOwn(relationships, key)) fail(`Field conflict: ${key}`)
      attributes[key] = value
    }
    for (const [key, relationship] of Object.entries<JsonObject>(relationships)) {
      if (key.startsWith('@') || key.includes(':')) continue
      if (!member.test(key) || ['id', 'type'].includes(key)) fail(`Invalid field: ${key}`)
      if ('data' in relationship)
        relationship.data = mapData(relationship.data, (value) =>
          rawIdentifier(value, transform(key)),
        )
      if (!memberCount(relationship)) fail(`Empty relationship: ${key}`)
      if (root && method === 'POST' && !('data' in relationship)) fail(`POST requires data: ${key}`)
    }
    if (memberCount(attributes)) result.attributes = attributes
    if (memberCount(relationships)) result.relationships = relationships
    return result
  }
  let output = mapData(data, (input) => {
    if (type === undefined) fail(`${method} requires a resource type`)
    return resource(input, transform(type), true)
  })
  const index = resourceIndex([...collected, ...(document.included || [])], true)
  const canonical = (value: JsonObject) => index.get(identity(value)) || value
  const resources = [...new Set([...collected.map(canonical), ...index.values()])]
  for (const resource of resources) {
    for (const [name, relationship] of Object.entries<JsonObject>(resource.relationships || {})) {
      if (extensionMember(name)) continue
      if (!relationship || typeof relationship !== 'object' || !('data' in relationship)) continue
      relationship.data = mapData(relationship.data, (reference) => {
        const target = canonical(reference)
        return { ...reference, ...identifier(target, reference.type, target.lid) }
      })
    }
  }
  output = mapData(output, (value) =>
    options.relationship ? rawIdentifier(canonical(value), value.type) : canonical(value),
  )
  const roots = new Set(
    (Array.isArray(output) ? output : output ? [output] : []).map((item) => identity(item)),
  )
  const supplied = new Set(
    (document.included || []).map((item: JsonObject) => identity(canonical(item))),
  )
  const included = resources.filter(
    (item) =>
      !roots.has(identity(item)) &&
      (supplied.has(identity(item)) || Object.keys(item).some(extraMember)),
  )
  const explicitIncludes = 'included' in document
  delete document.included
  return {
    ...document,
    data: output,
    ...(included.length || explicitIncludes ? { included } : {}),
  }
}
