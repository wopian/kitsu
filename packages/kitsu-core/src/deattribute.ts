import type { JsonObject } from './types.js'
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
export function deattribute(data: any): any {
  if (typeof data === 'object' && data !== null) {
    if (Array.isArray(data)) data.map((el) => deattribute(el))
    else if (
      typeof (data as JsonObject).attributes === 'object' &&
      !Array.isArray((data as JsonObject).attributes) &&
      (data as JsonObject).attributes !== null
    ) {
      for (const key of Object.keys((data as JsonObject).attributes)) {
        // Hoist everything but attributes to parent to avoid issues with deleting
        // as can't delete (data as JsonObject).attributes[key] as it will belete (data as JsonObject)[key] too
        if (!(data as JsonObject).attributes.attributes) {
          ;(data as JsonObject)[key] = (data as JsonObject).attributes[key]
        }
      }

      // Replace attributes with attributes variable if it exists, else delete
      // attributes. Avoids deletion issue with object references
      if ((data as JsonObject).attributes.attributes) {
        ;(data as JsonObject).attributes = (data as JsonObject).attributes.attributes
      } else {
        delete (data as JsonObject).attributes
      }
    }
  }
  return data
}
