import { error } from '../error'

const requiresID = (method, key) => `${method} requires an ID for the ${key} relationships`

/**
 * Checks if data is valid for serialisation
 *
 * @param {Object} obj The data
 * @param {string} method Request type
 */
async function isValid (obj, method, type) {
  // Check if obj is not an object or empty
  if (obj.constructor !== Object || Object.keys(obj).length === 0) {
    throw new Error(`${method} requires a JSON object body`)
  }
  // A POST request is the only request to not require an ID
  if (method !== 'POST' && !obj.id) {
    throw new Error(`${method} requires an ID for the ${type} type`)
  }
}

async function serialiseObject (node, nodeType, key, data, method) {
  if (typeof node.id !== 'string') throw new Error(requiresID(method, key))
  if (!data.relationships) data.relationships = {}
  // Guess type if not provided
  if (!node.type) node.type = nodeType
  data.relationships[key] = {
    data: Object.assign(node)
  }
  return data
}

async function serialiseArray (node, nodeType, key, data, method) {
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

async function serialiseAttr (node, key, data) {
  if (!data.attributes) data.attributes = {}
  data.attributes[key] = node
  return data
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
 * const output = await serialise.apply({ camel, resCase: kebab, plural }, [ model, obj, 'PATCH' ])
 */
export async function serialise (model, obj = {}, method = 'POST') {
  try {
    const type = this.plural(this.camel(model))
    let data = { type }

    await isValid(obj, method, type)

    if (method !== 'POST') data.id = String(obj.id)

    for (let key in obj) {
      const node = obj[key]
      const nodeType = this.plural(this.camel(key))
      if (node !== null & node.constructor === Object) {
        data = await serialiseObject(node, nodeType, key, data, method)
      } else if (node !== null && Array.isArray(node)) {
        data = await serialiseArray(node, nodeType, key, data, method)
      } else if (key !== 'id' && key !== 'type') {
        data = await serialiseAttr(node, key, data)
      }
    }

    return { data }
  } catch (E) {
    throw error(E)
  }
}
