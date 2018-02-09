import { error } from '../'

/**
 * Serialises an object into a JSON-API structure
 *
 * @param {string} model Request model
 * @param {Object} obj The data
 * @param {string} method Request type
 * @returns {Object} The serialised data
 * @private
 */
export async function serialise (model, obj = {}, method = 'POST') {
  try {
    // Check if obj is not an object or empty
    if (obj.constructor !== Object || Object.keys(obj).length === 0) {
      throw new Error(`${method} requires a JSON object body`)
    }
    const type = this.plural(this.camel(model))
    const data = { type }

    // A POST request is the only request to not require an ID
    if (method !== 'POST' && typeof obj.id === 'undefined') {
      throw new Error(`${method} requires an ID for the ${type} type`)
    }

    // Add ID to data - MUST be a string
    if (method !== 'POST') {
      data.id = obj.id.toString()
    }

    // Attributes and relationships
    for (let prop in obj) {
      // Check if it's a relationship
      if (obj[prop] !== null && obj[prop].constructor === Object) {
        if (typeof obj[prop].id === 'string') {
          if (typeof data.relationships === 'undefined') data.relationships = {}
          // Guess relationship type if not provided
          if (typeof obj[prop].type === 'undefined') obj[prop].type = this.plural(this.camel(prop))
          data.relationships[prop] = { data: Object.assign(obj[prop]) }
        } else throw new Error(`${method} requires an ID for the ${prop} relationships`)
      // Check if it's a relationship array
      } else if (obj[prop] !== null && Array.isArray(obj[prop])) {
        // validate whole array
        const ptype = this.plural(this.camel(prop))
        if (typeof data.relationships === 'undefined') data.relationships = {}
        data.relationships[prop] = { data: obj[prop].map(elem => {
          if (typeof elem.id === 'undefined') throw new Error(`${method} requires an ID for the ${prop} relationships`)
          return {
            id: elem.id,
            type: elem.type || ptype
          }
        }) }
      } else if (prop !== 'id' && prop !== 'type') { // Its an attribute
        if (typeof data.attributes === 'undefined') data.attributes = {}
        data.attributes[prop] = obj[prop]
      }
    }
    return { data }
  } catch (E) {
    throw error(E)
  }
}
