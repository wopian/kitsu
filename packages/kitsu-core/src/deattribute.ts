import { Copies } from './internal/copies.js'
import { copy } from './internal/copy.js'
import { extensionMember } from './internal/members.js'
/**
 * Flattens resource attributes and moves resource metadata under `$` without mutation.
 *
 * @param {Object|Object[]} data Resource data
 * @returns {Object|Object[]} Flat resource data
 * @example
 * deattribute({ type: 'people', id: '1', attributes: { name: 'Ada' }, meta: { active: true } })
 * // { type: 'people', id: '1', name: 'Ada', $: { meta: { active: true } } }
 */
export function deattribute(data: any): any {
  if (Array.isArray(data)) return data.map(deattribute)
  if (!data || typeof data !== 'object' || Object.getPrototypeOf(data) !== Object.prototype)
    return data
  const attributes = data.attributes
  const result: any = { ...attributes }
  let seen: Copies | undefined
  for (const key of Object.keys(result)) {
    if (key === 'id' || key === 'type' || key === '$') delete result[key]
    else {
      const value = result[key]
      if (
        value !== null &&
        (typeof value === 'object' || typeof value === 'function' || typeof value === 'symbol')
      ) {
        seen ??= new Copies(attributes, result)
        result[key] = copy(value, seen)
      }
    }
  }
  let envelope: any
  for (const key in data) {
    if (!Object.hasOwn(data, key)) continue
    if (key === 'id' || key === 'type') result[key] = data[key]
    else if (key === 'lid' || key === 'links' || key === 'meta' || extensionMember(key)) {
      envelope ??= {}
      envelope[key] = copy(data[key])
    }
  }
  if (envelope) result.$ = envelope
  return result
}
