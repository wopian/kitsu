import { version } from '../package.json'
import auth from './methods/auth'
import get from './methods/get'
import patch from './methods/patch'
import post from './methods/post'
import remove from './methods/remove'
import whoAmI from './methods/whoAmI'

/**
 * JSON API `accept` and `content-type` headers are set
 * automatically
 * @param {Object} options Options
 * @param {String} options.apiUrl Override the API url (default `https://kitsu.io/api`, not yet implemented)
 * @param {String} options.apiVersion Override the API version (`edge`, not yet implemented)
 * @param {Number} options.timeout Timeout in milliseconds (default `30000`)
 * @param {Number} options.retries Times to retry requests after network failures (default `2`)
 * @param {Object} options.headers Headers to send with requests
 * @param {Boolean} options.useElectronNet Use `electron.net` when used with Electron (default `true`)
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
  constructor (options = {}) {
    this._options = options

    // Set API Url
    this._apiUrl = this._options.apiUrl || 'https://kitsu.io/api'
    this._apiVersion = this._options.apiVersion || 'edge'
    // delete options.apiUrl
    // delete options.apiVersion

    this._options.timeout = this._options.timeout || 30000
    this._options.retries = this._options.retries || 2

    // Set Headers
    this._options.headers = Object.assign({
      'user-agent': `Kitsu/${version} (https://github.com/wopian/kitsu)`
    }, this._options.headers, {
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
    return this._options.headers
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
    return Boolean(typeof this._options.headers.authorization !== 'undefined')
  }

  // Aliases (devour migration)
  fetch = this.get
  find = this.get
  findAll = this.get
  create = this.post
  update = this.patch
  destroy = this.remove
  // Deprecation aliases
  setHeader = this.header
}

Object.assign(Kitsu.prototype, {
  auth,
  get,
  patch,
  post,
  remove,
  whoAmI
})
