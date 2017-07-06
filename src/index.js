import r from 'got'
import OAuth2 from 'client-oauth2'
import { version } from '../package.json'
import { serialise, deserialise } from './serialise'
import { query, errorHandler } from './util'

const apiVersion = 'edge'
const apiUrl = `https://kitsu.io/api`

/**
 * JSON API `accept` and `content-type` headers are set
 * automatically
 * @param {Object} opts Options
 * @param {String} opts.apiUrl Override the API url (default `https://kitsu.io/api`, not yet implemented)
 * @param {String} opts.apiVersion Override the API version (`edge`, not yet implemented)
 * @param {Number} opts.timeout Timeout in milliseconds (default `30000`)
 * @param {Number} opts.retries Times to retry requests after network failures (default `2`)
 * @param {Object} opts.headers Headers to send with requests
 * @param {Boolean} opts.useElectronNet Use `electron.net` when used with Electron (default `true`)
 *
 * @example
 * // Basic
 * const kitsu = new Kitsu()
 *
 * @example
 * // Set a custom `user-agent` header and reuse your authorization
 * // `accessToken`
 * const kitsu = new Kitsu({
 *  headers: {
 *    'user-agent': 'MyApp/1.0.0 (contact or link to repo)',
 *    authorization: 'Bearer 1234567890'
 *  }
 * })
 */
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

  /**
   * Get the current headers
   * @returns {Object} Object containing the current headers
   *
   * @example
   * console.log(kitsu.headers)
   */
  get headers () {
    return this._opts.headers
  }

  /**
   * Check if the client is authenticated
   * @returns {Boolean}
   *
   * @example
   * if (kitsu.isAuth) console.log('Authenticated')
   * else console.log('Not authenticated')
   */
  get isAuth () {
    return Boolean(this._opts.headers.authorization)
  }

  /**
   * Set new or updated headers
   * @param {String} field Header field name
   * @param {String} value Header field value
   *
   * @example
   * kitsu.setHeader('user-agent', 'MyApp/1.0.0 (contact or link to repo)')
   */
  setHeader = (field, value) => {
    // Prevent overriding the JSON API headers
    if (field.toLowerCase() !== 'user-agent' &&
        field.toLowerCase() !== 'content-type'
    ) this._opts.headers[field.toLowerCase()] = value
  }

  /**
   * Get user data of the authenticated user
   * @param {Object} opts
   * @param {Boolean} opts.compact Return only the user ID & name
   * @returns {Object} user data
   *
   * @example
   * kitsu.whoAmI()
   */
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

  /**
   * Authenticate as a Kitsu.io user
   * @param {Object} opts
   * @param {String} opts.clientId Unique client ID
   * @param {String} opts.clientSecret Unique client secret
   * @param {String} opts.username User's username
   * @param {String} opts.password User's password
   * @returns {Object} An object containing the `accessToken`
   *
   * @example
   * kitsu.auth({
   *   clientId: '1234567890',
   *   clientSecret: '0987654321',
   *   username: 'josh',
   *   password: 'hunter2'
   * })
   */
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

  /**
   * Get resources - aliases: `fetch` & `find`
   * @param {String} model Model to get data from
   * @param {Object} opts Request queries
   * @param {Object} opts.page
   * @param {Number} opts.page.limit Number of resources to return in request (Max 20 for all methods other than `libraryEntries` (500))
   * @param {Number} opts.page.offset Number of resources to offset the dataset by
   * @param {Object} opts.fields Return a sparse fieldset with only the included attributes
   * @param {Object} opts.filter Filter dataset by attribute values
   * @param {String} opts.sort Sort dataset by one or more attributes (prepend `-` for descending order)
   * @param {String} opts.include Include relationships
   * @returns {Object} JSON parsed response
   *
   * @example
   * // Get only a specific user's name and birthday
   * kitsu.get('users', {
   *   fields: {
   *     users: 'name,birthday'
   *   },
   *   filter: {
   *     name: 'wopian'
   *   }
   * })
   */
  get = async (model, opts) => {
    try {
      // Handle response
      let { body } = await r(`${apiUrl}/${apiVersion}/${model}${query(opts)}`, this._opts)
      return deserialise(JSON.parse(body))
    } catch (err) {
      return errorHandler(err)
    }
  }

  // Alias of get()
  fetch = this.get
  find = this.get

  /**
   * Create a new resource - aliases: `create`
   * @param {String} model Model to create a resource under
   * @param {Object} data Data to send in request
   *
   * @example
   * // Post a comment to a user's own profile feed
   * kitsu.post('posts', {
   *   content: 'Hello world',
   *   targetUser: {
   *     id: '42603',
   *     type: 'users'
   *   },
   *   user: {
   *     id: '42603',
   *     type: 'users'
   *   }
   * })
   */
  post = async (model, data) => {
    try {
      if (this.isAuth) {
        // Handle request
        const options = Object.assign({
          body: serialise(model, data),
          json: true,
          method: 'POST'
        }, this._opts)

        await r.post(`${apiUrl}/${apiVersion}/${model}`, options)
      } else console.error('Not authenticated')
    } catch (err) {
      return errorHandler(err)
    }
  }

  // Alias of post()
  create = this.post

  /**
   * Update an existing resource - aliases: `update`
   * @param {String} model Model to update a resource under
   * @param {Object} data Data to send in a request
   *
   * @example
   * // Update a user's post (if created less than 30 mins ago)
   * kitsu.patch('posts', {
   *   id: '12345678',
   *   content: 'Goodbye world',
   * })
   */
  patch = async (model, data) => {
    try {
      if (this.isAuth) {
        // Handle request
        const options = Object.assign({
          body: serialise(model, data, 'PATCH'),
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

  /**
   * Delete an existing resource - aliases: `destroy`
   * @param {String} model Model to update a resource under
   * @param {Object} data Data to send in a request
   *
   * @example
   * // Delete a user's post
   * kitsu.remove('posts', {
   *   id: '12345678',
   * })
   */
  remove = async (model, data) => {
    try {
      if (this.isAuth) {
        // Handle request
        const options = Object.assign({
          body: serialise(model, data, 'DELETE'),
          json: true,
          method: 'DELETE'
        }, this._opts)
      await r.patch(`${apiUrl}/${apiVersion}/${kebab(model, '-')}/${data.id}`, options)
        .catch(err => { throw JSON.parse(err.response.body) || err.response.body })
    } catch (err) {
      return errorHandler(err)
    }
  }

  // Alias of remove()
  destroy = this.remove
}
