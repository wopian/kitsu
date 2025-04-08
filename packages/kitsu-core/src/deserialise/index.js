import { deattribute } from '../deattribute'
import { linkRelationships } from '../linkRelationships'

/**
 * Deserialises an array from a JSON-API structure
 *
 * @param {Object} response The response
 * @returns {Object} The deserialised response
 * @private
 */
function deserialiseArray (response) {
  const previouslyLinked = {}
  const relationshipCache = {}
  for (let value of response.data) {
    const included = [
      ...response.data.map(item => ({ ...item, relationships: { ...item.relationships } })),
      ...(response.included || [])
    ]
    value = linkRelationships(value, included, previouslyLinked, relationshipCache)
    if (value.attributes) value = deattribute(value)
    response.data[response.data.indexOf(value)] = value
  }
  return response
}

/**
 * Deserialises a JSON-API response
 *
 * @param {Object} response The raw JSON:API response object
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
 * }) // { data: { id: '1', user: { data: { type: 'users', id: '2', slug: 'wopian' } } } }
 */
export function deserialise (response) {
  if (!response) return

  // Collection of resources
  if (Array.isArray(response.data)) response = deserialiseArray(response)
  // Single resource with included relationships
  else if (response.included) response.data = linkRelationships(response.data, response.included)
  else if (typeof response.data === 'object' && response.data !== null) response.data = linkRelationships(response.data)

  delete response.included

  // Move attributes to the parent object
  if (response.data?.attributes) response.data = deattribute(response.data)

  return response
}
