import r from 'got'
import OAuth2 from 'client-oauth2'
import { version } from '../package'
import { buildQuery, errorHandler, linkRelationships } from './util'

const apiVersion = 'edge'
const apiUrl = `https://kitsu.io/api`

export default class Kitsu {
  constructor (opts = {}) {
    this._opts = opts

    // Set Headers
    this._opts.headers = Object.assign({
      'user-agent': `Kitsu/${version} (https://github.com/wopian/kitsu)`
    }, this._opts.headers, {
      'accept': 'application/vnd.api+json',
      'content-type': 'application/vnd.api+json'
    })
  }

  get isAuth () {
    return Boolean(this._opts.headers.authorization)
  }

  auth = async ({ clientId, clientSecret, username, password }) => {
    try {
      if (clientId && clientSecret && username && password) {
        const { owner } = new OAuth2({
          clientId,
          clientSecret,
          accessTokenUri: `${apiUrl}/oauth/token`
        })

        let { accessToken } = await owner.getToken(username, password)

        this._opts.headers = Object.assign(this._opts.headers, {
          'authorization': `Bearer ${accessToken}`
        })
      } else {
        console.error('Missing required properties for authentication')
      }
    } catch (err) {
      console.error(err)
    }
  }

  get = async (model, opts) => {
    try {
      // Handle query parameters
      const query = opts ? buildQuery(opts) : ''

      // Handle response
      let { body } = await r(`${apiUrl}/${apiVersion}/${model}${query}`, this._opts)
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
      return errorHandler(err)
    }
  }
}
