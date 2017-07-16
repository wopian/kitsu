import { deattribute } from './deattribute'
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
    // Collection of resources
    // Note: constructor is currently faster than isArray()
    // http://jsben.ch/QgYAV
    if (obj.data && obj.data.constructor === Array) {
      for (let [index, value] of await obj.data.entries()) {
        if (obj.included) value = await linkRelationships(value, obj.included)
        if (value.attributes) value = await deattribute(value)
        obj.data[index] = value
      }
    // Single resource
    } else if (obj.included) obj.data = await linkRelationships(obj.data, obj.included)

    delete obj.included

    // Move attributes to the parent object
    if (obj.data.attributes) obj.data = await deattribute(obj.data)

    return obj
  } catch (e) {
    throw e
  }
}
