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
export function deattribute (data) {
  if (typeof data === 'object' && data !== null) {
    if (Array.isArray(data)) data.map(el => deattribute(el))
    else if (data.attributes?.constructor === Object) {
      for (const key of Object.keys(data.attributes)) {
        // Hoist everything but attributes to parent to avoid issues with deleting
        // as can't delete data.attributes[key] as it will belete data[key] too
        if (!data.attributes.attributes) {
          data[key] = data.attributes[key]
        }
      }

      // Replace attributes with attributes variable if it exists, else delete
      // attributes. Avoids deletion issue with object references
      if (data.attributes.attributes) {
        data.attributes = data.attributes.attributes
      } else {
        delete data.attributes
      }
    }
  }
  return data
}
