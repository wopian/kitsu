import { error } from '../'

/**
 * Hoists attributes to be top-level
 *
 * @param {Object|Array} data Resource data
 * @returns {Object|Array} Deattributed resource data
 * @private
 */
export async function deattribute (data) {
  try {
    if (typeof data !== 'undefined') {
      // Check if data is an array of resources and recursively loop
      // this function for each resource
      if (Array.isArray(data)) await data.map(async el => deattribute(el))
      else if (data.attributes && data.attributes.constructor === Object) {
        Object.keys(data.attributes).forEach(key => { data[key] = data.attributes[key] })
        delete data.attributes
      }
    }
    return data
  } catch (E) {
    error(E)
  }
}
