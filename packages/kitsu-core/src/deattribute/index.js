/**
 * Hoists attributes to be top-level
 *
 * @param {Object|Array} data Resource data
 * @returns {Object|Array} Deattributed resource data
 */
export async function deattribute (data) {
  if (typeof data === 'object' && data !== null) {
    if (Array.isArray(data)) await data.map(async el => deattribute(el))
    else if (data.attributes && data.attributes.constructor === Object) {
      Object.keys(data.attributes).forEach(key => { data[key] = data.attributes[key] })
      delete data.attributes
    }
  }
  return data
}
