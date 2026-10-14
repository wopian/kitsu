import { deattribute } from '../deattribute.js'
import type { JsonObject } from '../types.js'
import {
  extensionMember,
  extraMember,
  identity,
  mapData,
  memberCount,
  resourceIndex,
} from './members.js'

/** Decode one document with a shared identity index, including local-id aliases.
 * @private
 */
export function decodeGraph(data: any, included: JsonObject[] = []): JsonObject {
  const roots = Array.isArray(data) ? data : data ? [data] : []
  const index = resourceIndex([...roots, ...included])
  const outputs = new Map<JsonObject, JsonObject>()
  function resolve(resource: any): any {
    const source = index.get(identity(resource)) || resource
    if (outputs.has(source)) return outputs.get(source)
    const output = deattribute(source)
    outputs.set(source, output)
    for (const [name, relationship] of Object.entries<JsonObject>(source.relationships || {})) {
      if (extensionMember(name)) {
        output.$ ??= {}
        output.$.relationships ??= {}
        output.$.relationships[name] = structuredClone(relationship)
        continue
      }
      const extras: JsonObject = {}
      for (const [key, value] of Object.entries(relationship)) {
        if (['meta', 'links'].includes(key) || extensionMember(key))
          extras[key] = structuredClone(value)
      }
      if ('data' in relationship) {
        const linkage = relationship.data
        const identifiers = Array.isArray(linkage) ? linkage : linkage ? [linkage] : []
        if (identifiers.some((identifier: JsonObject) => Object.keys(identifier).some(extraMember)))
          extras.data = structuredClone(linkage)
        // Identifier metadata belongs to this edge, never to the canonical resource.
        const target = (identifier: JsonObject) => {
          const identity: JsonObject = { type: identifier.type }
          for (const key of ['id', 'lid']) if (key in identifier) identity[key] = identifier[key]
          return resolve(identity)
        }
        output[name] = mapData(linkage, target)
      }
      if (memberCount(extras)) {
        output.$ ??= {}
        output.$.relationships ??= {}
        output.$.relationships[name] = extras
      }
    }
    return output
  }
  return {
    data: mapData(data, resolve),
    included: included.map(resolve),
  }
}
