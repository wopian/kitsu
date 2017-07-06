import camel from 'camelcase'
import plural from 'pluralize'

// Remove when https://github.com/blakeembrey/pluralize/pull/63 is released
plural.addUncountableRule('anime')
plural.addUncountableRule('manga')

/**
 * Filters includes for the specific relationship
 *
 * @param {Object} included The response included object
 * @param {Object} options
 * @param {String} options.id The relationship ID
 * @param {String} options.type The relationship type
 * @returns {Array} The matched includes
 * @private
 */
export const filterIncludes = async (included, { id, type }) => {
  return included.filter(async obj => {
    await linkRelationships([obj], included)
    return obj.id === id && obj.type === type
  })
}

/**
 * Links relationships to included data
 *
 * @param {Object} data The response data object
 * @param {Object} included The response included object
 * @private
 */
export const linkRelationships = async (data, included) => {
  try {
    const { attributes, relationships } = data
    for (let key in relationships) {
      if (relationships[key].data && relationships[key].data.constructor === Array) {
        for (let { id, type } of relationships[key].data) {
          if (!attributes[type]) attributes[type] = []
          attributes[type].push((await filterIncludes(included, { id, type }))[0])
        }
      } else if (relationships[key].data) {
        const { id, type } = relationships[key].data
        if (!attributes[type]) attributes[type] = (await filterIncludes(included, { id, type }))[0]
        delete attributes[type].relationships
      }
    }
    delete data.relationships
  } catch (e) {
    throw e
  }
}

/**
 * Serialises an object into a JSON-API structure
 *
 * @param {String} model Request model
 * @param {Object} obj The data
 * @param {String} method Request type
 * @returns {Object} The serialised data
 * @private
 */
export function serialise (model, obj = {}, method = 'POST') {
  try {
    // Check if obj is not an object or empty
    if (obj.constructor !== Object && Object.keys(obj).length === 0) {
      throw new Error(`${method} requires a JSON object body`)
    }
    const type = camel(model)
    const data = { type }

    // A POST request is the only request to not require an ID
    if (method !== 'POST' && typeof obj.id === 'undefined') {
      throw new Error(`${method} requires an ID for the ${type} type`)
    }

    // Add ID to data
    if (method !== 'POST') {
      data.id = obj.id
    }

    // Attributes and relationships
    for (let prop in obj) {
      // Check if its a relationship
      if (
        obj[prop] !== null &&
        obj[prop].constructor === Object && (
          typeof obj[prop].id === 'string' ||
          typeof obj[prop].type === 'string'
        )
      ) {
        if (typeof data.relationships === 'undefined') data.relationships = {}
        // Guess relationship type if not provided
        if (typeof obj[prop].type === 'undefined') obj[prop].type = plural(camel(prop))
        data.relationships[prop] = { data: Object.assign(obj[prop]) }
      } else if (prop !== 'id') { // its an attribute
        if (typeof data.attributes === 'undefined') data.attributes = {}
        data.attributes[prop] = obj[prop]
      }
    }
    return { data }
  } catch (e) {
    throw e
  }
}

/**
 * Deserialises an object from a JSON-API structure
 *
 * @param {Object} obj The response
 * @returns {Object} The serialised response
 * @private
 */
export function deserialise (obj) {
  try {
    // Handle relationships
    // Note: constructor is currently faster than isArray()
    // http://jsben.ch/QgYAV
    if (obj.data && obj.data.constructor === Array) {
      obj.data.forEach(async data => {
        if (obj.included) linkRelationships(data, obj.included)
      })
    } else if (obj.included) linkRelationships(obj.data, obj.included)

    delete obj.included

    return obj
  } catch (e) {
    throw e
  }
}
