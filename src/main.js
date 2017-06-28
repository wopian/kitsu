import r from 'got'
import { version } from '../package'

const apiVersion = 'edge'
const apiUrl = `https://kitsu.io/api/${apiVersion}`

const filterIncludes = async (included, { id, type }) => {
  return included.filter(async obj => {
    await linkRelationships([obj], included)
    return obj.id === id && obj.type === type
  })
}

const linkRelationships = async (data, included) => {
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

  /*
  console.log(relationships.mappings.data)
  console.log(included)

  console.log(attributes)
  */
}

export default class Kitsu {
  constructor (opts = {}) {
    this._auth = false
    this._opts = opts

    // Set Headers
    this._opts.headers = Object.assign({
      'user-agent': `Kitsu/${version} (https://github.com/wopian/kitsu)`
    }, this._opts.headers, {
      'accept': 'application/vnd.api+json',
      'content-type': 'application/vnd.api+json'
    })
  }

  get = async (model, opts) => {
    try {
      // Handle options

      /*
      {
        page: {
          limit: 20,
          offset: 500
        },
        fields: {
          anime: 'canonicalTitle'
        }
        filter: {
          canonicalTitle: 'Cowboy Bebop'
        }
        sort: '-id',
        include: 'media'
      }
      */
      // Handle query parameters
      let query = ''
      if (opts) {
        for (let param in opts) {
          if (typeof opts[param] === 'object') {
            Object.keys(opts[param]).forEach(value => {
              query += `&${param}[${value}]=${opts[param][value]}`
            })
          } else if (typeof opts[param] === 'string') {
            query += `&${param}=${opts[param]}`
          }
        }
        query = '?' + query.slice(1)
      }

      let { body } = await r(`${apiUrl}/${model}${query}`, this._opts)
      body = await JSON.parse(body)

      // Handle relationships
      // Note: constructor is currently faster than isArray()
      // http://jsben.ch/QgYAV
      if (body.data.constructor === Array) {
        await body.data.forEach(async data => {
          linkRelationships(data, body.included)
        })
      } else await linkRelationships(body.data, body.included)

      delete body.included

      return body
    } catch (err) {
      console.log(err)
      return {
        errors: [
          {
            title: err.statusMessage,
            detail: err.statusMessage,
            code: err.statusCode,
            status: err.statusCode
          }
        ]
      }
    }
  }
}
