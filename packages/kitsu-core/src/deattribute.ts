import { flatten } from './internal/flatten.js'
import type { DeserialiseOptions } from './types.js'
/**
 * Flattens resource attributes and moves resource metadata under `$` without mutation.
 *
 * This helper does not resolve relationships. Use deserialise for a complete document.
 * @param {(JsonApiResource|Array<JsonApiResource>|null)} data Wire resource data
 * @param {DeserialiseOptions} [options] Attribute naming options
 * @param {function(string): string} [options.attributeCase] Convert attribute names. Default: unchanged. Nested JSON and extension attributes keep their names; invalid names or collisions throw Error.
 * @param {boolean} [options.hoistData=false] Accepted through the shared type, but unused by this resource helper
 * @returns {(FlatResource|Array<FlatResource>|null)} Flat resource data
 * @example
 * deattribute({ type: 'people', id: '1', attributes: { name: 'Ada' }, meta: { active: true } })
 * // { type: 'people', id: '1', name: 'Ada', $: { meta: { active: true } } }
 * @example
 * import { camel, deattribute } from 'kitsu-core'
 * deattribute({ type: 'people', id: '9', attributes: { 'first-name': 'Mina' } }, { attributeCase: camel })
 * // { type: 'people', id: '9', firstName: 'Mina' }
 */
export function deattribute(data: any, options?: DeserialiseOptions): any {
  if (Array.isArray(data)) return data.map((resource) => deattribute(resource, options))
  if (!data || typeof data !== 'object' || Object.getPrototypeOf(data) !== Object.prototype)
    return data
  return flatten(data, options)
}
