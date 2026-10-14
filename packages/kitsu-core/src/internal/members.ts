import { isDeepEqual } from '../deepEqual.js'
import type { JsonObject } from '../types.js'

/** Extension and implementation metadata stays opaque to the base codec.
 * @private
 */
export const extensionMember = (key: string): boolean => key.includes(':') || key.startsWith('@')
export const extraMember = (key: string): boolean => key !== 'type' && key !== 'id' && key !== 'lid'

export const identity = (
  resource: JsonObject,
  key = resource.id !== undefined ? 'id' : 'lid',
): string => {
  const type = resource.type
  const value = resource[key]
  // Length-prefix the type so arbitrary identifier text cannot collide with another type.
  return typeof type === 'string' && typeof value === 'string'
    ? `${type.length}:${type}${key}:${value}`
    : JSON.stringify([type, key, value])
}

/** Merge identifier stubs with full resources and retain both identity aliases.
 * @private
 */
export function resourceIndex(resources: JsonObject[], validate = false): Map<string, JsonObject> {
  const index = new Map<string, JsonObject>()
  for (const input of resources) {
    let resource = Object.getPrototypeOf(input) === Object.prototype ? input : { ...input }
    const previous =
      index.get(identity(resource)) ||
      (resource.lid !== undefined ? index.get(identity(resource, 'lid')) : undefined)
    let source = resource
    if (previous) {
      source = { ...previous }
      resource = { ...resource }
      for (const key of ['id', 'lid']) {
        if (
          validate &&
          source[key] !== undefined &&
          resource[key] !== undefined &&
          source[key] !== resource[key]
        )
          fail('Conflicting resources')
        const value = source[key] ?? resource[key]
        if (value !== undefined) source[key] = resource[key] = value
      }
      if (
        validate &&
        Object.keys(source).some(extraMember) &&
        Object.keys(resource).some(extraMember) &&
        !isDeepEqual(source, resource)
      )
        fail('Conflicting resources')
      Object.assign(source, resource)
    }
    for (const key of ['id', 'lid'])
      if (source[key] !== undefined) index.set(identity(source, key), source)
  }
  return index
}

/** Map JSON:API primary data or linkage while keeping absence and cardinality.
 * @private
 */
export const mapData = (data: any, callback: (resource: any) => any): any =>
  data == null ? data : Array.isArray(data) ? data.map(callback) : callback(data)

export function fail(message: string): never {
  throw new Error(message)
}

export const memberCount = (object: JsonObject): number => Object.keys(object).length
