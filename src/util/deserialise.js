import { linkRelationships } from './linkRelationships'

/**
 * Deserialises an object from a JSON-API structure
 *
 * @param {Object} obj The response
 * @returns {Object} The serialised response
 * @private
 */
export async function deserialise (obj) {
  try {
    // Handle relationships
    // Note: constructor is currently faster than isArray()
    // http://jsben.ch/QgYAV
    if (obj.data && obj.data.constructor === Array) {
      obj.data.forEach(async data => {
        if (obj.included) await linkRelationships(data, obj.included)
      })
    } else if (obj.included) linkRelationships(obj.data, obj.included)

    delete obj.included

    return obj
  } catch (e) {
    throw e
  }
}
