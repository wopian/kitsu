import { deattribute } from '../deattribute.js'
import type { JsonObject } from '../types.js'
import { copy } from './copy.js'
import { extensionMember, extraMember, identity, mapData, resourceIndex } from './members.js'

/** Decode one document with a shared identity index, including local-id aliases.
 * @private
 */
export function decodeGraph(data: any, included: JsonObject[] = []): JsonObject {
  if (
    !included.length &&
    (data == null || (Object.getPrototypeOf(data) === Object.prototype && !data.relationships))
  )
    return { data: mapData(data, deattribute), included: [] }
  const roots = Array.isArray(data) ? data : data ? [data] : []
  const index = resourceIndex([...roots, ...included])
  const outputs = new Map<JsonObject, JsonObject>()
  function resolve(resource: any): any {
    return decode(index.get(identity(resource)) || resource)
  }
  function decode(source: JsonObject): JsonObject {
    const cached = outputs.get(source)
    if (cached) return cached
    const output = deattribute(source)
    outputs.set(source, output)
    for (const name of Object.keys(source.relationships || {})) {
      const relationship = source.relationships[name]
      if (extensionMember(name)) {
        output.$ ??= {}
        output.$.relationships ??= {}
        output.$.relationships[name] = copy(relationship)
        continue
      }
      let extras: JsonObject | undefined
      for (const key of Object.keys(relationship)) {
        if (key === 'meta' || key === 'links' || extensionMember(key)) {
          extras ??= {}
          extras[key] = copy(relationship[key])
        }
      }
      if ('data' in relationship) {
        const linkage = relationship.data
        const identifiers = Array.isArray(linkage) ? linkage : linkage ? [linkage] : []
        if (
          identifiers.some((identifier: JsonObject) => Object.keys(identifier).some(extraMember))
        ) {
          extras ??= {}
          extras.data = copy(linkage)
        }
        // Identifier metadata belongs to this edge, never to the canonical resource.
        const target = (identifier: JsonObject) => {
          const related = index.get(identity(identifier))
          if (related) return decode(related)
          const reference: JsonObject = { type: identifier.type }
          if ('id' in identifier) reference.id = identifier.id
          if ('lid' in identifier) reference.$ = { lid: identifier.lid }
          return reference
        }
        output[name] = mapData(linkage, target)
      }
      if (extras) {
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
