import { deattribute } from '../deattribute'
import { linkRelationships } from '../linkRelationships'

/**
 * Hoists the contents of `data` properties to their parent object recursively.
 * This provides a flatter response object, but removes access to `links` and `meta`
 * properties.
 *
 * @param {Object} response The response object
 * @returns {Object} The response with `data` properties hoisted
 * @private
 */
function hoistData (response) {
  const seen = new WeakMap()
  const hasOwn = Object.prototype.hasOwnProperty

  /**
   * Recursively traverses and clones an object or array, handling cyclic references.
   * If the object is a wrapper of the form { data: ... }, it unwraps and processes the `data` property.
   *
   * @param {any} object The input to hoist (object or array)
   * @returns {any} The hoisted object or array
   * @private
   */
  function hoist (object) {
    if (object && typeof object === 'object') {
      if (seen.has(object)) {
        return seen.get(object)
      }

      let out

      if (Array.isArray(object)) {
        out = []
        seen.set(object, out)

        let i = 0

        for (const item of object) {
          out[i] = hoist(item)
          i++
        }

        return out
      }

      // Check for { data: ... } wrapper without allocating Object.keys
      let onlyData = false

      for (const key in object) {
        if (!hasOwn.call(object, key)) continue

        if (key === 'data' && !onlyData) {
          onlyData = true
        } else {
          onlyData = false
          break
        }
      }

      if (onlyData) {
        return hoist(object.data)
      }

      out = {}
      seen.set(object, out)

      for (const key in object) {
        if (hasOwn.call(object, key)) {
          out[key] = hoist(object[key])
        }
      }

      return out
    }

    return object
  }

  return hoist(response)
}

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
  const included = [
    ...response.data.map(item => ({ ...item, relationships: { ...item.relationships } })),
    ...(response.included || [])
  ]

  for (let value of response.data) {
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
 * @param {Object} [options={}] Deserialisation options
 * @param {boolean} [options.hoistData=false] If enabled, the contents of the `data` property will be hoisted to the parent. This provides a flatter response object, but removes access to `links` and `meta` properties. It will transform:
 * ```js
 * { data: { id: '1', type: 'people', coworkers: data: [ { id: '2', type: 'people' } ] } }
 * ```
 * into the following:
 * ```js
 * { id: '1', type: 'people', coworkers: [ { id: '2', type: 'people' } ] }
 * ```
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
export function deserialise (response, options = { hoistData: false }) {
  if (!response) return

  // Collection of resources
  if (Array.isArray(response.data)) response = deserialiseArray(response)
  // Single resource with included relationships
  else if (response.included) response.data = linkRelationships(response.data, response.included)
  else if (typeof response.data === 'object' && response.data !== null) response.data = linkRelationships(response.data)

  delete response.included

  // Move attributes to the parent object
  if (response.data?.attributes) response.data = deattribute(response.data)

  // Hoist data to flatten the response structure if requested
  if (options.hoistData && response.data) {
    response = hoistData(response)
  }

  return response
}
