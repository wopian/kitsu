import { deattribute } from '../deattribute'
import { linkRelationships } from '../linkRelationships'

/**
 * Deserialises an array from a JSON-API structure
 *
 * @param {*} obj The response
 * @returns {Object} The deserialised response
 * @private
 */
function deserialiseArray (obj) {
  for (let value of obj.data) {
    if (obj.included) value = linkRelationships(value, obj.included)
    if (value.relationships) value = linkRelationships(value)
    if (value.attributes) value = deattribute(value)
    obj.data[obj.data.indexOf(value)] = value
  }
  return obj
}

/**
 * Deserialises a JSON-API response
 *
 * @param {Object} obj The response
 * @returns {Object} The deserialised response
 *
 * @example <caption>Deserialise with a basic data object</caption>
 * deserialise({
 *   data: {
 *     id: '1',
 *     attributes: { liked: true }
 *   },
 *   meta: { hello: 'world' }
 * }) // { data: { id: '1', liked: true }, meta: { hello: 'world' } }
 *
 * @example <caption>Deserialise with relationships</caption>
 * deserialise({
 *   data: {
 *     id: '1',
 *     relationships: {
 *       user: {
 *         data: {
 *           type: 'users',
 *           id: '2' }
 *       }
 *     }
 *   },
 *   included: [
 *     {
 *       type: 'users',
 *       id: '2',
 *       attributes: { slug: 'wopian' }
 *     }
 *   ]
 * }) // { data: { id: '1', user: { type: 'users', id: '2', slug: 'wopian' } } }
 */
export function deserialise (obj) {
  if (!obj) return

  // Collection of resources
  // Note: constructor is currently faster than isArray()
  // http://jsben.ch/QgYAV
  if (obj.data && obj.data.constructor === Array) obj = deserialiseArray(obj)
  // Single resource with included relationships
  else if (obj.included) obj.data = linkRelationships(obj.data, obj.included)
  else if (obj.data && obj.data.constructor === Object) obj.data = linkRelationships(obj.data)

  delete obj.included

  // Move attributes to the parent object
  if (obj.data && obj.data.attributes) obj.data = deattribute(obj.data)

  return obj
}
