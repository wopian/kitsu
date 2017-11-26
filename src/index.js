import axios from 'axios'
import create from './methods/create'
import fetch from './methods/fetch'
import remove from './methods/remove'
import self from './methods/self'
import update from './methods/update'

const kitsu = 'https://kitsu.io/api'

/**
 * A simple, lightweight & framework agnostic JSON-API client JSON API
 * @param {Object} options Options
 * @param {String} options.baseURL Override the HTTP API endpoint (default `https://kitsu.io/api)
 * @param {String} options.version Override the HTTP API version (default `edge` if kitsu.io, else defaults to an empty `String`)
 * @param {Number} options.timeout Override the request timeout in milliseconds (default `30000`)
 * @param {Object} options.headers Additional headers to send with requests
 *
 * @example
 * // Basic
 * const api = new Kitsu()
 *
 * @example
 * // Set a `user-agent` and pre-existing `authorization` token
 * const api = new Kitsu({
 *   headers: {
 *     'user-agent': 'MyApp/1.0.0 (github.com/username/repo)',
 *     authorization: 'Bearer 1234567890'
 *   }
 * })
 *
 * @example
 * // Use a different JSON-API backend
 * const api = new Kitsu({
 *   baseURL: 'https://api.example.org'
 * })
 */
export default class Kitsu {
  constructor (options = {}) {
    this.baseURL = options.baseURL || kitsu
    this.headers = Object.assign(options.headers ? options.headers : {}, {
      'accept': 'application/vnd.api+json',
      'content-type': 'application/vnd.api+json'
    })
    this.axios = axios.create({
      baseURL: this.baseURL + '/' + (options.version || (this.baseURL === kitsu ? 'edge' : '')),
      timeout: options.timeout || 30000,
      headers: this.headers
    })
  }

  /**
   * Get the current headers or add additional headers
   * @returns {Object} All the current headers
   *
   * @example
   * // Receive all the headers
   * console.log(api.headers)
   *
   * @example
   * // Receive a specific header
   * console.log(api.headers['user-agent'])
   *
   * @example
   * // Add or update a header
   * api.headers['authorization'] = 'Bearer 1234567890'
   */
  headers () {
    return this.headers
  }

  /**
   * Check if the client is authenticated (oAuth2)
   * @returns {Boolean}
   *
   * @example
   * if (api.isAuth) console.log('Authenticated')
   * else console.log('Not authenticated')
   */
  get isAuth () {
    return Boolean(this.headers.Authorization)
  }

  fetch = fetch.bind(this)
  update = update.bind(this)
  create = create.bind(this)
  remove = remove.bind(this)
  self = self.bind(this)

  // Aliases (kitsu <= 2.0.4 & devour)
  get = this.fetch
  find = this.fetch
  findAll = this.fetch
  patch = this.update
  post = this.create
  destroy = this.remove
  whoAmI = this.self
}
