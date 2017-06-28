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
  constructor (opts = {
    headers: {
      'user-agent': `Kitsu/${version} (https://github.com/wopian/kitsu)`,
      'accept': 'application/vnd.api+json',
      'content-type': 'application/vnd.api+json'
    }
  }) {
    this._auth = false
    this._opts = opts
  }

  get = async (model, opts) => {
    opts = Object.assign(this._opts, opts)

    try {
      let { body } = await r(`${apiUrl}/${model}?page[limit]=1&include=media`, opts)
      body = await JSON.parse(body)

      // Handle relationships
      // Note: constructor is currently faster than isArray()
      // http://jsben.ch/QgYAV
      if (body.data.constructor === Array) {
        await body.data.forEach(async data => {
          linkRelationships(data, body.included)
        })
      } else await linkRelationships(body.data, body.included)

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
