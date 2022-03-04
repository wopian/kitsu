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
    if (typeof payload !== 'object' || Object.keys(payload).length === 0) {
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
 * @param {Object} relations Relation object being built
 * @param {string} key Name of the relationship
 * @returns {Object} Serialised relationship
 * @private
 */
function serialiseRelationOne (node, relations, key) {
  relations[key] = { data: {} }
  for (const prop of Object.keys(node[key].data)) {
    const propNode = node[key].data[prop]
    let propRelations = relations[key].data
    // Pull everything but id and type into data.attributes
    if (prop && ![ 'id', 'type' ].includes(prop)) {
      propRelations = serialiseAttr(propNode, prop, propRelations)
    } else propRelations[prop] = propNode
  }
  return relations
}

/**
 * Serialises a relational data array to JSON:API format
 *
 * @param {Object} node Existing relation object
 * @param {Object} relations Relation object being built
 * @param {string} key Name of the relationship
 * @returns {Object} Serialised relationship
 * @private
 */
function serialiseRelationMany (node, relations, key) {
  relations[key] = { data: [] }
  for (const prop of node[key].data) {
    relations[key].data.push(prop)
  }
  return relations
}

/**
 * Serialises a relational object to JSON:API format
 *
 * @param {Object} node Relation object
 * @returns {Object} Serialised relationship
 * @private
 */
function serialiseRelation (node) {
  // Create a new object to handle collisions with attributes.attributes
  let relations = {}
  for (const key in node) {
    const isToMany = Array.isArray(node[key].data)
    relations = isToMany
      ? serialiseRelationMany(node, relations, key)
      : serialiseRelationOne(node, relations, key)
  }
  return relations
}

/**
 * Serialises an object to JSON:API format
 *
 * @param {Object} node Resource object
 * @param {string} nodeType Resource type of the object
 * @param {string} key The resource object's key value
 * @param {Object} data Root JSON:API data object
 * @private
 */
function serialiseObject (node, nodeType, key, data) {
  if (!data.relationships) data.relationships = {}
  // Guess type if not provided
  if (!node.type) node.type = nodeType
  data.relationships[key] = {
    data: Object.assign(node)
  }
  data.relationships = serialiseRelation(data.relationships)
  return data
}

/**
 * Serialises an array to JSON:API format
 *
 * @param {Object} node Resource object
 * @param {string} nodeType Resource type of the object
 * @param {string} key The resource object's key value
 * @param {Object} data Root JSON:API data object
 * @private
 */
function serialiseArray (node, nodeType, key, data) {
  if (!data.relationships) data.relationships = {}
  data.relationships[key] = {
    data: node.map(({ id, type, ...attributes }) => {
      return {
        id,
        type: type || nodeType,
        attributes: Object.keys(attributes).length ? attributes : undefined
      }
    })
  }
  data.relationships = serialiseRelation(data.relationships)
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
  if (payload?.id) data.id = String(payload.id)
  for (const key in payload) {
    const node = payload[key]
    const nodeType = options.pluralTypes(options.camelCaseTypes(key))
    // 1. Skip null nodes, 2. Only grab arrays, 3. Filter to only serialise relationable arrays
    if (node !== null && Array.isArray(node) && (node.length > 0 && hasID(node[0]))) {
      data = serialiseArray(node, nodeType, key, data)
    // 1. Skip null nodes, 2. Only grab objects, 3. Filter to only serialise relationable objects
    } else if (node !== null && typeof node === 'object' && hasID(node)) {
      data = serialiseObject(node, nodeType, key, data)
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
