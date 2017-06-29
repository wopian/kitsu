import r from 'got'
import camel from 'camelcase'
import OAuth2 from 'client-oauth2'
import { version } from '../package'
import { query, errorHandler, linkRelationships } from './util'

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

  whoAmI = async ({ compact } = false) => {
    if (this.isAuth) {
      return (await this.get('users', compact ? {
        filter: { self: true },
        fields: { users: 'name' }
      } : {
        filter: { self: true }
      })).data[0]
    } else {
      return {
        errors: [
          {
            title: 'Not Logged In',
            detail: 'No user is logged in',
            code: 'K01',
            status: 'K01'
          }
        ]
      }
    }
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

        return { accessToken }
      } else {
        console.error('Missing required properties for authentication')
      }
    } catch (err) {
      console.error(err)
    }
  }

  get = async (model, opts) => {
    try {
      // Handle response
      let { body } = await r(`${apiUrl}/${apiVersion}/${model}${query(opts)}`, this._opts)
      body = JSON.parse(body)

      // Handle relationships
      // Note: constructor is currently faster than isArray()
      // http://jsben.ch/QgYAV
      if (body.data.constructor === Array) {
        body.data.forEach(async data => {
          linkRelationships(data, body.included)
        })
      } else linkRelationships(body.data, body.included)

      delete body.included

      return body
    } catch (err) {
      return errorHandler(err)
    }
  }

  post = async (model, payload) => {
    try {
      if (this.isAuth) {
        // Handle request
        const options = Object.assign({
          body: {
            data: Object.assign(payload, {
              type: camel(model)
            })
          },
          json: true,
          method: 'POST'
        }, this._opts)

        console.log(options.body)
        await r.post(`${apiUrl}/${apiVersion}/${model}`, options)
      } else console.error('Not authenticated')
    } catch (err) {
      console.log(err)
    }
  }
}
