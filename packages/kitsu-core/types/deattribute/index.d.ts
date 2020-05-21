/**
 * Hoists attributes to be top-level
 *
 * @param {Object|Object[]} data Resource data
 * @returns {Object|Object[]} Deattributed resource data
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
 * const output = deattribute(data) // [ { id: '1', type: 'users', slug: 'wopian' } ]
 *
 * @example <caption>Deattribute a resource</caption>
 * // JSON:API 'data' field
 * const data = {
 *   id: '1',
 *   type: 'users',
 *   attributes: { slug: 'wopian' }
 * }
 *
 * const output = deattribute(data) // { id: '1', type: 'users', slug: 'wopian' }
 */
export function deattribute(data: any | any[]): any | any[];
