import { version } from '../package.json'
import auth from './methods/auth'
import get from './methods/get'
import header from './methods/header'
import patch from './methods/patch'
import post from './methods/post'
import remove from './methods/remove'
import whoAmI from './methods/whoAmI'

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
    this._opts = opts

    // Set API Url
    this._apiUrl = this._opts.apiUrl || 'https://kitsu.io/api'
    this._apiVersion = this._opts.apiVersion || 'edge'
    // delete opts.apiUrl
    // delete opts.apiVersion

    this._opts.timeout = this._opts.timeout || 30000
    this._opts.retries = this._opts.retries || 2

    // Set Headers
    this._opts.headers = Object.assign({
      'user-agent': `Kitsu/${version} (https://github.com/wopian/kitsu)`
    }, this._opts.headers, {
      'accept': 'application/vnd.api+json',
      'content-type': 'application/vnd.api+json'
    })

    this.auth = auth.bind(this)
    this.get = get.bind(this)
    this.header = header.bind(this)
    this.patch = patch.bind(this)
    this.post = post.bind(this)
    this.remove = remove.bind(this)
    this.whoAmI = whoAmI.bind(this)
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
    return Boolean(typeof this._opts.headers.authorization !== 'undefined')
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
