import r from 'got'
import OAuth2 from 'client-oauth2'
import { version } from '../package.json'
import { serialise, deserialise } from './serialise'
import { query, errorHandler } from './util'

const apiVersion = 'edge'
const apiUrl = `https://kitsu.io/api`

export default class Kitsu {
  constructor (opts = {}) {
    // Set API Url
    this._apiUrl = opts.apiUrl
    this._apiVersion = opts.apiVersion
    delete opts.apiUrl
    delete opts.apiVersion

    this._opts = opts

    this._opts.timeout = this._opts.timeout || 30000
    this._opts.retries = this._opts.retries || 2

    // Set Headers
    this._opts.headers = Object.assign({
      'user-agent': `Kitsu/${version} (https://github.com/wopian/kitsu)`
    }, this._opts.headers, {
      'accept': 'application/vnd.api+json',
      'content-type': 'application/vnd.api+json'
    })
  }

  get headers () {
    return this._opts.headers
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
      return deserialise(JSON.parse(body))
    } catch (err) {
      return errorHandler(err)
    }
  }

  // Aliases of get()
  fetch = this.get
  find = this.get

  post = async (model, payload) => {
    try {
      if (this.isAuth) {
        // Handle request
        const options = Object.assign({
          body: serialise(model, payload),
          json: true,
          method: 'POST'
        }, this._opts)

        // await r.post(`${apiUrl}/${apiVersion}/${model}`, options)
      } else console.error('Not authenticated')
    } catch (err) {
      return errorHandler(err)
    }
  }

  // Alias of post()
  create = this.post

  patch = async (model, payload) => {
    try {
      if (this.isAuth) {
        // Handle request
        const options = Object.assign({
          body: serialise(model, payload, 'PATCH'),
          json: true,
          method: 'PATCH'
        }, this._opts)

        await r.patch(`${apiUrl}/${apiVersion}/${model}`, options)
      } else console.error('Not authenticated')
    } catch (err) {
      return errorHandler(err)
    }
  }

  // Alias of patch()
  update = this.patch

  remove = async (model, payload) => {
    try {
      if (this.isAuth) {
        // Handle request
        const options = Object.assign({
          body: serialise(model, payload, 'DELETE'),
          json: true,
          method: 'DELETE'
        }, this._opts)

        await r.patch(`${apiUrl}/${apiVersion}/${model}`, options)
      } else console.error('Not authenticated')
    } catch (err) {
      return errorHandler(err)
    }
  }

  // Alias of remove()
  destroy = this.remove
}
