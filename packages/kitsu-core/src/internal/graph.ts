import { deattribute } from '../deattribute.js'
import type { DeserialiseOptions, JsonObject } from '../types.js'
import { copy } from './copy.js'
import { flatten } from './flatten.js'
import { extensionMember, identity, mapData, resourceIndex } from './members.js'

function reference(identifier: JsonObject): JsonObject {
  const output: JsonObject = { type: identifier.type }
  if ('id' in identifier) output.id = identifier.id
  if ('lid' in identifier) output.$ = { lid: identifier.lid }
  return output
}
function link(
  relationships: JsonObject,
  output: JsonObject,
  target: (identifier: JsonObject) => JsonObject,
): void {
  for (const name in relationships) {
    if (!Object.hasOwn(relationships, name)) continue
    const relationship = relationships[name]
    if (extensionMember(name)) {
      output.$ ??= {}
      output.$.relationships ??= {}
      output.$.relationships[name] = copy(relationship)
      continue
    }
    let extras: JsonObject | undefined
    for (const key in relationship) {
      if (key === 'data') continue
      if (
        (key === 'meta' || key === 'links' || extensionMember(key)) &&
        Object.hasOwn(relationship, key)
      ) {
        extras ??= {}
        extras[key] = copy(relationship[key])
      }
    }
    if ('data' in relationship) {
      const linkage = relationship.data
      let metadata = false
      if (Array.isArray(linkage)) {
        const values = new Array(linkage.length)
        for (let index = 0; index < linkage.length; index++) {
          const identifier = linkage[index]
          values[index] = target(identifier)
          if (!metadata)
            for (const key in identifier)
              if (
                key !== 'id' &&
                key !== 'type' &&
                key !== 'lid' &&
                Object.hasOwn(identifier, key)
              ) {
                metadata = true
                break
              }
        }
        output[name] = values
      } else {
        output[name] = linkage == null ? linkage : target(linkage)
        for (const key in linkage)
          if (key !== 'id' && key !== 'type' && key !== 'lid' && Object.hasOwn(linkage, key)) {
            metadata = true
            break
          }
      }
      if (metadata) {
        extras ??= {}
        extras.data = copy(linkage)
      }
    }
    if (extras) {
      output.$ ??= {}
      output.$.relationships ??= {}
      output.$.relationships[name] = extras
    }
  }
}

/** Allocate resources before linking edges, so graphs never require recursive decoding.
 * @private
 */
export function decodeGraph(
  data: any,
  included: JsonObject[] = [],
  options?: DeserialiseOptions,
): JsonObject {
  if (!included.length && (data == null || Object.getPrototypeOf(data) === Object.prototype)) {
    const output = data == null ? data : flatten(data, options)
    if (data?.relationships)
      link(data.relationships, output, (identifier) =>
        identifier.type === data.type &&
        (identifier.id !== undefined
          ? identifier.id === data.id
          : identifier.lid !== undefined && identifier.lid === data.lid)
          ? output
          : reference(identifier),
      )
    return { data: output, included: [] }
  }
  const roots = Array.isArray(data) ? data : data ? [data] : []
  const ids = new Map<any, Map<any, JsonObject>>()
  const pending: any[] = []
  function allocate(source: JsonObject): JsonObject | undefined {
    if (
      source.lid !== undefined ||
      source.id === undefined ||
      Object.getPrototypeOf(source) !== Object.prototype
    )
      return
    let type = ids.get(source.type)
    if (!type) {
      type = new Map()
      ids.set(source.type, type)
    }
    if (type.has(source.id)) return
    const output = flatten(source, options)
    type.set(source.id, output)
    if (source.relationships) pending.push(source.relationships, output)
    return output
  }
  const primary = new Array(roots.length)
  const supplied = new Array(included.length)
  for (let position = 0; position < roots.length; position++) {
    const output = allocate(roots[position])
    if (!output) return decodeAliases(data, included, options)
    primary[position] = output
  }
  for (let position = 0; position < included.length; position++) {
    const output = allocate(included[position])
    if (!output) return decodeAliases(data, included, options)
    supplied[position] = output
  }
  function target(identifier: JsonObject): JsonObject {
    return ids.get(identifier.type)?.get(identifier.id) || reference(identifier)
  }
  for (let position = 0; position < pending.length; position += 2)
    link(pending[position], pending[position + 1], target)
  return {
    data: Array.isArray(data) ? primary : data == null ? data : primary[0],
    included: supplied,
  }
}

function decodeAliases(
  data: any,
  included: JsonObject[],
  options?: DeserialiseOptions,
): JsonObject {
  const roots = Array.isArray(data) ? data : data ? [data] : []
  const aliases = resourceIndex(roots.concat(included))
  const ids = new Map<any, Map<any, JsonObject>>()
  const lids = new Map<any, Map<any, JsonObject>>()
  const outputs = new Map<JsonObject, JsonObject>()
  const pending: any[] = []
  function allocate(input: JsonObject): JsonObject {
    const source = aliases.get(identity(input)) || input
    const cached = outputs.get(source)
    if (cached) return cached
    const output = deattribute(source, options)
    outputs.set(source, output)
    if (source.id !== undefined) {
      let type = ids.get(source.type)
      if (!type) {
        type = new Map()
        ids.set(source.type, type)
      }
      type.set(source.id, output)
    }
    if (source.lid !== undefined) {
      let type = lids.get(source.type)
      if (!type) {
        type = new Map()
        lids.set(source.type, type)
      }
      type.set(source.lid, output)
    }
    if (source.relationships) pending.push(source.relationships, output)
    return output
  }
  const primary = mapData(data, allocate)
  const supplied = included.map(allocate)
  function target(identifier: JsonObject): JsonObject {
    return (
      (identifier.id !== undefined
        ? ids.get(identifier.type)?.get(identifier.id)
        : lids.get(identifier.type)?.get(identifier.lid)) || reference(identifier)
    )
  }
  for (let position = 0; position < pending.length; position += 2)
    link(pending[position], pending[position + 1], target)
  return { data: primary, included: supplied }
}
