import { error } from '../error'

const requiresID = (method, key) => `${method} requires an ID for the ${key} relationships`

/**
 * Checks if data is valid for serialisation
 *
 * @param {Object} obj The data
 * @param {string} method Request type
 * @private
 */
function isValid (obj, method, type) {
  // Check if obj is not an object or empty
  if (obj.constructor !== Object || Object.keys(obj).length === 0) {
    throw new Error(`${method} requires a JSON object body`)
  }
  // A POST request is the only request to not require an ID
  if (method !== 'POST' && !obj.id) {
    throw new Error(`${method} requires an ID for the ${type} type`)
  }
}

/**
 * Serialises an object to JSON:API format
 *
 * @param {Object} node Resource object
 * @param {string} nodeType Resource type of the object
 * @param {string} key The resource object's key value
 * @param {Object} data Root JSON:API data object
 * @param {string} method HTTP method
 * @private
 */
function serialiseObject (node, nodeType, key, data, method) {
  if (typeof node.id !== 'string') throw new Error(requiresID(method, key))
  if (!data.relationships) data.relationships = {}
  // Guess type if not provided
  if (!node.type) node.type = nodeType
  data.relationships[key] = {
    data: Object.assign(node)
  }
  return data
}

/**
 * Serialises an array to JSON:API format
 *
 * @param {Object} node Resource object
 * @param {string} nodeType Resource type of the object
 * @param {string} key The resource object's key value
 * @param {Object} data Root JSON:API data object
 * @param {string} method HTTP method
 * @private
 */
function serialiseArray (node, nodeType, key, data, method) {
  if (!data.relationships) data.relationships = {}
  data.relationships[key] = {
    data: node.map(({ id, type }) => {
      if (!id) throw new Error(requiresID(method, key))
      return {
        id,
        type: type || nodeType
      }
    })
  }
  return data
}

/**
 * Serialises attributes to JSON:API format
 *
 * @param {Object} node Attribute value
 * @param {string} key Attribute key
 * @param {Object} data Root JSON:API data object
 * @private
 */
function serialiseAttr (node, key, data) {
  if (!data.attributes) data.attributes = {}
  data.attributes[key] = node
  return data
}

/**
 * Checks if the object contains an id property
 *
 * @param {Object} node Attribute value
 * @returns {boolean} Whether `id` exists in object
 * @private
 */
function hasID (node) {
  return Object.prototype.hasOwnProperty.call(node, 'id')
}

/**
 * Serialises an object into a JSON-API structure
 *
 * @param {string} model Request model
 * @param {Object} obj The data
 * @param {string} method Request type
 * @returns {Object} The serialised data
 *
 * @example <caption>Due to its usage in kitsu, it **MUST** be called with **this** set in 6.0.x</caption>
 * import { serialise, camel, kebab } from 'kitsu-core'
 * import plural from 'pluralize'
 *
 * const output = serialise.apply({ camel, resCase: kebab, plural }, [ model, obj, 'PATCH' ])
 */
export function serialise (model, obj = {}, method = 'POST') {
  try {
    const type = this.plural ? this.plural(this.camel(model)) : this.camel(model)
    let data = { type }

    isValid(obj, method, type)

    if (obj.id) data.id = String(obj.id)

    for (const key in obj) {
      const node = obj[key]
      const nodeType = this.plural ? this.plural(this.camel(key)) : this.camel(key)
      // 1. Skip null nodes, 2. Only grab objects, 3. Filter to only serialise relationable objects
      if (node !== null && node.constructor === Object && hasID(node)) {
        data = serialiseObject(node, nodeType, key, data, method)
      // 1. Skip null nodes, 2. Only grab arrays, 3. Filter to only serialise relationable arrays
      } else if (node !== null && Array.isArray(node) && (node.length > 0 && hasID(node[0]))) {
        data = serialiseArray(node, nodeType, key, data, method)
      // 1. Don't place id/key inside attributes object
      } else if (key !== 'id' && key !== 'type') {
        data = serialiseAttr(node, key, data)
      }
    }

    return { data }
  } catch (E) {
    throw error(E)
  }
}
