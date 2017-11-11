import camel from 'camelcase'

/**
 * Serialises an object into a JSON-API structure
 *
 * @param {String} model Request model
 * @param {Object} obj The data
 * @param {String} method Request type
 * @returns {Object} The serialised data
 * @private
 */
export async function serialise (model, obj = {}, method = 'POST') {
  try {
    // Check if obj is not an object or empty
    if (obj.constructor !== Object || Object.keys(obj).length === 0) {
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
        if (typeof obj[prop].type === 'undefined') obj[prop].type = camel(prop)
        data.relationships[prop] = { data: Object.assign(obj[prop]) }
      } else if (prop !== 'id') { // Its an attribute
        if (typeof data.attributes === 'undefined') data.attributes = {}
        data.attributes[prop] = obj[prop]
      }
    }
    return { data }
  } catch (e) {
    throw e
  }
}
