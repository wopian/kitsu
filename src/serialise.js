import camel from 'camelcase'
import plural from 'pluralize'
import { errorHandler } from './util'

// Remove when https://github.com/blakeembrey/pluralize/pull/63 is released
plural.addUncountableRule('anime')
plural.addUncountableRule('manga')

export const filterIncludes = async (included, { id, type }) => {
  return included.filter(async obj => {
    await linkRelationships([obj], included)
    return obj.id === id && obj.type === type
  })
}

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
  } catch (err) {
    console.log(err)
  }
}

/*
  data: {
    id: '1234',
    type: 'posts'
    attributes: {
      content: 'Hello world'
    },
    relationships: {
      targetUser: {
        data: {
          id: '1234',
          type: 'users'
        }
      },
      user: {
        data: {
          id: '1234',
          type: 'users'
        }
      }
    }
  }
*/

/*
  data: {
    id: '1234'
    content: 'Hello world',
    targetUser: {
      id: '1234',
      type: 'users'
    },
    user: {
      id: '1234'
      type: 'users'
    }
  }
*/

/**
 * Serialises an object into a JSON-API structure
 *
 * @param {*} obj The payload object
 */
export function serialise (model, obj = {}, method = 'POST') {
  try {
    // Check if obj is not an object or empty
    if (obj.constructor !== Object && Object.keys(obj).length === 0) {
      throw `${method} requires a JSON object body`
    } else {
      const type = camel(model)
      const data = { type }

      // A POST request is the only request to not require an ID
      if (method !== 'POST' && typeof obj.id === 'undefined') {
        throw `${method} requires an ID for the ${type} type`
      } else if (method !== 'POST') {
        data.id = obj.id
        delete obj.id
      }

      // Attributes and relationships
      for (let prop in obj) {
        // Check if its a relationship
        if (
          obj[prop].constructor === Object && (
            typeof obj[prop].id === 'string' ||
            typeof obj[prop].type === 'string'
          )
        ) {
          if (typeof data.relationships === 'undefined') data.relationships = {}
          // Guess relationship type if not provided
          if (typeof obj[prop].type === 'undefined') obj[prop].type = plural(camel(prop))
          data.relationships[prop] = { data: Object.assign(obj[prop]) }
        } else { // its an attribute
          if (typeof data.attributes === 'undefined') data.attributes = {}
          data.attributes[prop] = obj[prop]
        }
      }

      console.log(data.relationships)
      return { data }
    }
  } catch (err) {
    return errorHandler(err)
  }
}

/**
 * Deserialises the JSON-API structure
 *
 * @param {*} obj The response body object
 */
export function deserialise (obj) {
  try {
    // Handle relationships
    // Note: constructor is currently faster than isArray()
    // http://jsben.ch/QgYAV
    if (obj.data.constructor === Array) {
      obj.data.forEach(async data => {
        if (obj.included) linkRelationships(data, obj.included)
      })
    } else if (obj.included) linkRelationships(obj.data, obj.included)

    delete obj.included

    return obj
  } catch (err) {
    return errorHandler(err)
  }
}
