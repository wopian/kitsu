import axios from 'axios'
import { get, patch, post, remove, self } from './methods'

const kitsu = 'https://kitsu.io/api/edge'

/**
 * A simple, lightweight & framework agnostic JSON-API client JSON API
 * @param {Object} options Options
 * @param {string} options.baseURL Set the API endpoint (default `https://kitsu.io/api/edge`)
 * @param {Object} options.headers Additional headers to send with requests
 * @param {boolean} options.kebabcase If `true`, `/libraryEntries` will become `/library-entries` in the URL request (default `true`)
 * @param {boolean} options.pluralize If `true`, `type` will be pluralized in post, patch and delete requests - `user` -> `users` (default `true`)
 * @param {number} options.timeout Set the request timeout in milliseconds (default `30000`)
 *
 * @example
 * // If using Kitsu.io's API
 * const api = new Kitsu()
 *
 * @example
 * // If using another API server
 * const api = new Kitsu({
 *   baseURL: 'https://api.example.org/2'
 * })
 *
 * @example
 * // Set a `user-agent` and an `authorization` token
 * const api = new Kitsu({
 *   headers: {
 *     'User-Agent': 'MyApp/1.0.0 (github.com/username/repo)',
 *     Authorization: 'Bearer 1234567890'
 *   }
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
      baseURL: this.baseURL,
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
   * api.headers
   *
   * @example
   * // Receive a specific header
   * api.headers['User-Agent']
   *
   * @example
   * // Add or update a header
   * api.headers['Authorization'] = 'Bearer 1234567890'
   */
  headers () {
    return this.headers
  }

  /**
   * Check if the client is authenticated (oAuth2)
   * @returns {boolean}
   *
   * @example
   * if (api.isAuth) console.log('Authenticated')
   * else console.log('Not authenticated')
   */
  get isAuth () {
    return Boolean(this.headers.Authorization)
  }

  get = get.bind(this)
  patch = patch.bind(this)
  post = post.bind(this)
  remove = remove.bind(this)
  self = self.bind(this)

  fetch = this.get
  update = this.patch
  create = this.post
}
