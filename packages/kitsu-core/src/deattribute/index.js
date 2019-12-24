/**
 * Hoists attributes to be top-level
 *
 * @param {Object|Array} data Resource data
 * @returns {Object|Array} Deattributed resource data
 *
 * @example <caption>Deattribute an array of resources</caption>
 * // JSON:API 'data' field
 * const data = [
 *   {
 *     id: '1',
 *     type: 'users',
 *     attributes: { slug: 'wopian' }
 *   }
 * ]
 *
 * const output = await deattribute(data) // [ { id: '1', type: 'users', slug: 'wopian' } ]
 *
 * @example <caption>Deattribute a resource</caption>
 * // JSON:API 'data' field
 * const data = {
 *   id: '1',
 *   type: 'users',
 *   attributes: { slug: 'wopian' }
 * }
 *
 * const output = await deattribute(data) // { id: '1', type: 'users', slug: 'wopian' }
 */
export function deattribute (data) {
  if (typeof data === 'object' && data !== null) {
    if (Array.isArray(data)) data.map(async el => deattribute(el))
    else if (data.attributes && data.attributes.constructor === Object) {
      Object.keys(data.attributes).forEach(key => { data[key] = data.attributes[key] })
      delete data.attributes
    }
  }
  return data
}
