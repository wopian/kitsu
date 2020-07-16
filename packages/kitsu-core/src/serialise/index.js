import { error } from '../error'

/**
 * Checks if data is valid for serialisation
 *
 * @param {boolean} isArray If root element of the payload was an Array or Object
 * @param {string} type Resource type
 * @param {Object} payload The data
 * @param {string} method Request type - `PATCH` or `POST`
 * @private
 */
function isValid (isArray, type, payload, method) {
  const requireID = new Error(`${method} requires an ID for the ${type} type`)

  if (type === undefined) {
    throw new Error(`${method} requires a resource type`)
  }

  if (isArray) {
    // A POST request is the only request to not require an ID in spec
    if (method !== 'POST' && payload.length > 0) {
      for (const resource of payload) {
        if (!resource.id) throw requireID
      }
    }
  } else {
    if (payload?.constructor !== Object || Object.keys(payload).length === 0) {
      throw new Error(`${method} requires an object or array body`)
    }
    // A POST request is the only request to not require an ID in spec
    if (method !== 'POST' && !payload.id) {
      throw requireID
    }
  }
}

/**
 * Serialises a relational data object to JSON:API format
 *
 * @param {Object} node Existing relation object
 * @param {Object} nodeType Resource type of the relation
 * @returns {Object} Serialised relationship
 * @private
 */
function serialiseRelationOne (node, nodeType) {
  let relation = {}
  for (const prop of Object.keys(node)) {
    if ([ 'id', 'type' ].includes(prop)) relation[prop] = node[prop]
    else relation = serialiseAttr(node[prop], prop, relation)
  }
  // Guess relationship type if not provided
  if (!relation.type) relation.type = nodeType
  return relation
}

/**
 * Serialises a relational data array to JSON:API format
 *
 * @param {Object} node Existing relation object
 * @param {Object} nodeType Resource type of the relation
 * @returns {Object} Serialised relationship
 * @private
 */
function serialiseRelationMany (node, nodeType) {
  const relation = []
  for (const prop of node) {
    const serialised = serialiseRelationOne(prop)
    // Guess relationship type if not provided
    if (!serialised.type) serialised.type = nodeType
    relation.push(serialised)
  }
  return relation
}

/**
 * Serialises a relational object to JSON:API format
 *
 * @param {Object} node Resource object
 * @param {string} nodeType Resource type of the object
 * @param {string} key The resource object's key value
 * @param {Object} data Root JSON:API data object
 * @private
 */
function serialiseRelation (node, nodeType, key, data) {
  if (!data.relationships) data.relationships = {}
  data.relationships[key] = {
    data: Array.isArray(node.data)
      ? serialiseRelationMany(node.data, nodeType)
      : serialiseRelationOne(node.data, nodeType)
  }
  if (node?.links?.self || node?.links?.related) data.relationships[key].links = node.links
  if (node?.meta) data.relationships[key].meta = node.meta
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
  if (key === 'links' && (typeof node.self === 'string' || typeof node.related === 'string')) data.links = node
  else if (key === 'meta' && node.constructor === Object) data.meta = node
  else data.attributes[key] = node
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
  if (!node.data) return false
  // Check if relationship is to-many
  const nodeData = Array.isArray(node.data) ? node.data[0] : node.data
  return Object.prototype.hasOwnProperty.call(nodeData, 'id')
}

/**
 * Handles the Bulk Extension support. See `serialise` for examples.
 *
 * @param {string} type Resource type
 * @param {Object[]} payload The data
 * @param {string} method Request type (PATCH, POST, DELETE)
 * @param {Object} options Optional configuration for camelCase and pluralisation handling
 * @param {Function} options.camelCaseTypes Convert library-entries and library_entries to libraryEntries (default no conversion). To use parameter, import camel from kitsu-core
 * @param {Function} options.pluralTypes Pluralise types (default no pluralisation). To use parameter, import pluralize (or another pluralisation npm package)
 * @returns {Object} The serialised data
 * @private
 */
function serialiseRootArray (type, payload, method, options) {
  isValid(true, type, payload, method)
  const data = []
  for (const resource of payload) {
    data.push(serialiseRootObject(type, resource, method, options).data)
  }
  return { data }
}

/**
 * Serialises the root data object. See `serialise` for examples.
 *
 * @param {string} type Resource type
 * @param {Object} payload The data
 * @param {string} method Request type (PATCH, POST, DELETE)
 * @param {Object} options Optional configuration for camelCase and pluralisation handling
 * @param {Function} options.camelCaseTypes Convert library-entries and library_entries to libraryEntries (default no conversion). To use parameter, import camel from kitsu-core
 * @param {Function} options.pluralTypes Pluralise types (default no pluralisation). To use parameter, import pluralize (or another pluralisation npm package)
 * @returns {Object} The serialised data
 * @private
 */
function serialiseRootObject (type, payload, method, options) {
  isValid(false, type, payload, method)
  type = options.pluralTypes(options.camelCaseTypes(type))
  let data = { type }
  // ID not required for POST requests
  if (payload?.id) data.id = String(payload.id)
  for (const key in payload) {
    const node = payload[key]
    const nodeType = options.pluralTypes(options.camelCaseTypes(key))
    // 1. Skip null nodes, 2. Only grab objects, 3. Filter to only serialise relationable objects
    if (node !== null && node?.constructor === Object && hasID(node)) {
      data = serialiseRelation(node, nodeType, key, data)

    // 1. Don't place id/key inside attributes object
    } else if (key !== 'id' && key !== 'type') {
      data = serialiseAttr(node, key, data)
    }
  }
  return { data }
}

/**
 * Serialises an object into a JSON-API structure
 *
 * @param {string} type Resource type
 * @param {Object|Object[]} [data] The data
 * @param {string} [method] Request type (PATCH, POST, DELETE)
 * @param {Object} [options] Optional configuration for camelCase and pluralisation handling
 * @param {Function} [options.camelCaseTypes=s=>s] Convert library-entries and library_entries to libraryEntries (default no conversion). To use parameter, import camel from kitsu-core
 * @param {Function} [options.pluralTypes=s=>s] Pluralise types (default no pluralisation). To use parameter, import pluralize (or another pluralisation npm package)
 * @returns {Object} The serialised data
 *
 * @example <caption>Setting camelCaseTypes and pluralTypes options (example shows options used by `kitsu` by default)</caption>
 * import { serialise, camel } from 'kitsu-core'
 * import pluralize from 'pluralize'
 *
 * const model = 'anime'
 * const obj = { id: '1', slug: 'shirobako' }
 *
 * // { data: { id: '1', type: 'anime', attributes: { slug: 'shirobako' } } }
 * const output = serialise(model, obj, 'PATCH', { camelCaseTypes: camel, pluralTypes: pluralize })
 *
 * @example <caption>Basic usage (no case conversion or pluralisation)</caption>
 * import { serialise } from 'kitsu-core'
 *
 * const model = 'anime'
 * const obj = { id: '1', slug: 'shirobako' }
 *
 * // { data: { id: '1', type: 'anime', attributes: { slug: 'shirobako' } } }
 * const output = serialise(model, obj, 'PATCH')
 */
export function serialise (type, data = {}, method = 'POST', options = {}) {
  try {
    if (!options.camelCaseTypes) options.camelCaseTypes = s => s
    if (!options.pluralTypes) options.pluralTypes = s => s
    // Delete relationship to-one (data: null) or to-many (data: [])
    if (data === null || (Array.isArray(data) && data.length === 0)) return { data }
    if (Array.isArray(data) && data?.length > 0) return serialiseRootArray(type, data, method, options)
    else return serialiseRootObject(type, data, method, options)
  } catch (E) {
    throw error(E)
  }
}
