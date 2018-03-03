import { error } from '../error'

const requiresID = (method, key) => `${method} requires an ID for the ${key} relationships`

/**
 * Serialises an object into a JSON-API structure
 *
 * @param {string} model Request model
 * @param {Object} obj The data
 * @param {string} method Request type
 * @returns {Object} The serialised data
 *
 * @example <caption>Due to its usage in kitsu, it **MUST** be called with **this** set in 5.0.x</caption>
 * import { serialise, camel, kebab } from 'kitsu-core'
 * import plural from 'pluralize'
 *
 * const output = await serialise.apply({ camel, resCase: kebab, plural }, [ model, obj, 'PATCH' ])
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
    if (method !== 'POST' && !obj.id) {
      throw new Error(`${method} requires an ID for the ${type} type`)
    }

    // Add ID to data - MUST be a string
    if (method !== 'POST') {
      data.id = obj.id.toString()
    }

    // Attributes and relationships
    for (let key in obj) {
      // Check if it's a relationship
      if (obj[key] !== null && obj[key].constructor === Object) {
        if (typeof obj[key].id === 'string') {
          if (!data.relationships) data.relationships = {}
          // Guess relationship type if not provided
          if (!obj[key].type) obj[key].type = this.plural(this.camel(key))
          data.relationships[key] = { data: Object.assign(obj[key]) }
        } else throw new Error(requiresID(method, key))
      // Check if it's a relationship array
      } else if (obj[key] !== null && Array.isArray(obj[key])) {
        // validate whole array
        const keytype = this.plural(this.camel(key))
        if (!data.relationships) data.relationships = {}
        data.relationships[key] = { data: obj[key].map(elem => {
          if (!elem.id) throw new Error(requiresID(method, key))
          return {
            id: elem.id,
            type: elem.type || keytype
          }
        }) }
      } else if (key !== 'id' && key !== 'type') { // Its an attribute
        if (!data.attributes) data.attributes = {}
        data.attributes[key] = obj[key]
      }
    }
    return { data }
  } catch (E) {
    throw error(E)
  }
}
