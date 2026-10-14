import { extensionMember, memberCount } from './internal/members.js'
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
  const result: any = { ...structuredClone(data.attributes) }
  delete result.id
  delete result.type
  delete result.$
  const envelope: any = {}
  for (const [key, value] of Object.entries(data)) {
    if (key === 'id' || key === 'type') result[key] = value
    else if (['lid', 'links', 'meta'].includes(key) || extensionMember(key))
      envelope[key] = structuredClone(value)
  }
  if (memberCount(envelope)) result.$ = envelope
  return result
}
