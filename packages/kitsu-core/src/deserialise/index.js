import { deattribute, linkRelationships } from '../'

/**
 * Deserialises an array from a JSON-API structure
 *
 * @param {*} obj The response
 * @returns {Object} The deserialised response
 * @private
 */
async function deserialiseArray (obj) {
  for (let value of await obj.data) {
    if (obj.included) value = await linkRelationships(value, obj.included)
    if (value.attributes) value = await deattribute(value)
    obj.data[obj.data.indexOf(value)] = value
  }
  return obj
}

/**
 * Deserialises an object from a JSON-API structure
 *
 * @param {Object} obj The response
 * @returns {Object} The deserialised response
 * @private
 */
export async function deserialise (obj) {
  // Collection of resources
  // Note: constructor is currently faster than isArray()
  // http://jsben.ch/QgYAV
  if (obj.data && obj.data.constructor === Array) obj = await deserialiseArray(obj)
  // Single resource with included relationships
  else if (obj.included) obj.data = await linkRelationships(obj.data, obj.included)

  delete obj.included

  // Move attributes to the parent object
  if (obj.data.attributes) obj.data = await deattribute(obj.data)

  return obj
}
