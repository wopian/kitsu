import { attributeName } from './internal/attributes.js'
import { Copies } from './internal/copies.js'
import { copy } from './internal/copy.js'
import { extensionMember } from './internal/members.js'
import type { DeserialiseOptions } from './types.js'
/**
 * Flattens resource attributes and moves resource metadata under `$` without mutation.
 *
 * This helper does not resolve relationships. Use deserialise for a complete document.
 * @param {(JsonApiResource|Array<JsonApiResource>|null)} data Wire resource data
 * @param {DeserialiseOptions} [options] Attribute naming options
 * @param {function(string): string} [options.attributeCase] Convert attribute names. Default: unchanged. Nested JSON and extension attributes keep their names; invalid names or collisions throw TypeError.
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
  const attributes = data.attributes
  const convert = options?.attributeCase
  const result: any = {}
  let seen: Copies | undefined
  for (const key in attributes) {
    if (!Object.hasOwn(attributes, key) || key === 'id' || key === 'type' || key === '$') continue
    const name = convert ? attributeName(key, convert, result, data.relationships) : key
    const value = attributes[key]
    let output = value
    if (
      value !== null &&
      (typeof value === 'object' || typeof value === 'function' || typeof value === 'symbol')
    ) {
      seen ??= new Copies(attributes, result)
      output = copy(value, seen)
    }
    if (name === '__proto__')
      Object.defineProperty(result, name, {
        value: output,
        enumerable: true,
        writable: true,
        configurable: true,
      })
    else result[name] = output
  }
  let envelope: any
  for (const key in data) {
    if (key === 'attributes' || key === 'relationships' || !Object.hasOwn(data, key)) continue
    if (key === 'id' || key === 'type') result[key] = data[key]
    else if (key === 'lid' || key === 'links' || key === 'meta' || extensionMember(key)) {
      envelope ??= {}
      envelope[key] = copy(data[key])
    }
  }
  if (envelope) result.$ = envelope
  return result
}
