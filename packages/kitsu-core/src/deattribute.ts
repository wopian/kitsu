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
  const attributes = copy(data.attributes)
  const result: any =
    attributes && Object.getPrototypeOf(attributes) === Object.prototype
      ? attributes
      : { ...attributes }
  delete result.id
  delete result.type
  delete result.$
  let envelope: any
  for (const key of Object.keys(data)) {
    if (key === 'id' || key === 'type') result[key] = data[key]
    else if (['lid', 'links', 'meta'].includes(key) || extensionMember(key)) {
      envelope ??= {}
      envelope[key] = copy(data[key])
    }
  }
  if (envelope) result.$ = envelope
  return result
}
