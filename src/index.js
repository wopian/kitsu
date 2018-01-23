import axios from 'axios'
import { camel, deserialise, error, kebab, query, serialise, snake } from './util'

/**
 * @name Kitsu
 * @param {Object} options Options
 * @param {string} options.baseURL Set the API endpoint (default `https://kitsu.io/api/edge`)
 * @param {Object} options.headers Additional headers to send with requests
 * @param {boolean} options.camelCaseTypes If true, the `type` value will be camelCased, e.g `library-entries` and `library_entries` become `libraryEntries`  (default `true`)
 * @param {string} options.resourceCase `kebab`, `snake` or `none`. If `kebab`, `/libraryEntries` will become `/library-entries`. If `snake`, `/libraryEntries` will become `/library_entries`, If `none`, `/libraryEntries` will be unchanged (default `kebab`)
 * @param {boolean} options.pluralize If `true`, `/user` will become `/users` in the URL request and `type` will be pluralized in post, patch and delete requests - `user` -> `users` (default `true`)
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
    if (options.camelCaseTypes === false) this.camel = s => s
    else this.camel = camel

    if (options.resourceCase === 'none') this.resCase = s => s
    else if (options.resourceCase === 'snake') this.resCase = snake
    else this.resCase = kebab

    if (options.pluralize === false) this.plural = s => s
    else this.plural = require('pluralize')

    /**
     * Get the current headers or add additional headers
     *
     * @memberof Kitsu
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
    this.headers = Object.assign({}, options.headers, { 'Accept': 'application/vnd.api+json', 'Content-Type': 'application/vnd.api+json' })

    this.axios = axios.create({
      baseURL: options.baseURL || 'https://kitsu.io/api/edge',
      timeout: options.timeout || 30000
    })
  }

  /**
   * Check if the client is authenticated (oAuth2/Authorization header)
   *
   * @memberof Kitsu
   * @returns {boolean}
   *
   * @example
   * if (api.isAuth) console.log('Authenticated')
   * else console.log('Not authenticated')
   */
  get isAuth () {
    return Boolean(this.headers.Authorization)
  }

  /**
   * Fetch resources
   * Aliases: `fetch`
   *
   * @memberof Kitsu
   * @param {string} model Model to fetch data from
   * @param {Object} params JSON-API request queries
   * @param {Object} params.page [JSON:API Pagination](http://jsonapi.org/format/#fetching-pagination)
   * @param {number} params.page.limit Number of resources to return in request (Max `20` for Kitsu.io except on `libraryEntries` which has a max of `500`)
   * @param {number} params.page.offset Number of resources to offset the dataset by
   * @param {Object} params.fields Return a sparse fieldset with only the included attributes/relationships - [JSON:API Sparse Fieldsets](http://jsonapi.org/format/#fetching-sparse-fieldsets)
   * @param {Object} params.filter Filter dataset by attribute values - [JSON:API Filtering](http://jsonapi.org/format/#fetching-filtering)
   * @param {string} params.sort Sort dataset by one or more comma separated attributes (prepend `-` for descending order) - [JSON:API Sorting](http://jsonapi.org/format/#fetching-sorting)
   * @param {string} params.include Include relationship data - [JSON:API Includes](http://jsonapi.org/format/#fetching-includes)
   * @param {Object} headers Additional headers to send with request
   * @returns {Object} JSON-parsed response
   *
   * @example
   * // Get a specific user's name & birthday
   * api.get('users', {
   *   fields: {
   *     users: 'name,birthday'
   *   },
   *   filter: {
   *     name: 'wopian'
   *   }
   * })
   *
   * @example
   * // Get a collection of anime resources and their categories
   * api.get('anime', {
   *   include: 'categories'
   * })
   *
   * @example
   * // Get a single resource and its relationships by ID (method one)
   * api.get('anime', {
   *   include: 'categories',
   *   filter: { id: '2' }
   * })
   *
   * @example
   * // Get a single resource and its relationships by ID (method two)
   * api.get('anime/2', {
   *   include: 'categories'
   * })
   *
   * @example
   * // Get a resource's relationship data only
   * api.get('anime/2/categories')
   *
   * @example
   * // Handling errors (async/await)
   * // http://jsonapi.org/format/#error-objects
   * try {
   *   const { data } = api.get('anime')
   * } catch (err) {
   *   if (err.errors) err.errors.forEach(error => {
   *       console.log(error) // Prints JSON:API error object
   *   })
   * }
   *
   * @example
   * // Handling errors (Promise)
   * // http://jsonapi.org/format/#error-objects
   * api.get('anime')
   *   .then(res => res.data)
   *   .catch(err => {
   *     if (err.errors) err.errors.forEach(error => {
   *       console.log(error) // Prints JSON:API error object
   *     })
   *   })
   */
  async get (model, params = {}, headers = {}) {
    try {
      let [ res, id, relationship ] = model.split('/')

      let url = this.plural(this.resCase(res))
      if (id) url += `/${id}`
      if (relationship) url += `/${this.resCase(relationship)}`

      const { data } = await this.axios.get(url, {
        params,
        paramsSerializer: p => query(p),
        headers: Object.assign(this.headers, headers)
      })

      return deserialise(data)
    } catch (E) {
      throw error(E)
    }
  }

  /**
   * Update a resource
   * Aliases: `update`
   *
   * @memberof Kitsu
   * @param {string} model Model to update data in
   * @param {Object} body Data to send in the request
   * @param {Object} headers Additional headers to send with request
   * @returns {Object} JSON-parsed response
   *
   * @example
   * // Update a user's post (Note: For Kitsu.io, posts cannot be edited 30 minutes after creation)
   * api.update('posts', {
   *   id: '12345678',
   *   content: 'Goodbye World'
   * })
   *
   * @example
   * // Handling errors (async/await)
   * // http://jsonapi.org/format/#error-objects
   * try {
   *   api.update('posts', { ... })
   * } catch (err) {
   *   if (err.errors) err.errors.forEach(error => {
   *       console.log(error) // Prints JSON:API error object
   *   })
   * }
   *
   * @example
   * // Handling errors (Promise)
   * // http://jsonapi.org/format/#error-objects
   * api.update('posts', { ... })
   *   .catch(err => {
   *     if (err.errors) err.errors.forEach(error => {
   *       console.log(error) // Prints JSON:API error object
   *     })
   *   })
   */
  async patch (model, body, headers = {}) {
    try {
      headers = Object.assign(this.headers, headers)
      if (!this.isAuth) throw new Error('Not logged in')
      if (typeof body.id === 'undefined') throw new Error('Updating a resource requires an ID')

      const url = this.plural(this.resCase(model)) + '/' + body.id
      const { data } = await this.axios.patch(
        url,
        await serialise.apply(this, [ model, body, 'PATCH' ]),
        { headers }
      )

      return data
    } catch (E) {
      throw error(E)
    }
  }

  /**
   * Create a new resource
   * Aliases: `create`
   *
   * @memberof Kitsu
   * @param {string} model Model to create a resource under
   * @param {Object} body Data to send in the request
   * @param {Object} headers Additional headers to send with request
   * @returns {Object} JSON-parsed response
   *
   * @example
   * // Post to a user's own profile
   * api.create('posts', {
   *   content: 'Hello World',
   *   targetUser: {
   *     id: '42603',
   *     type: 'users'
   *   },
   *   user: {
   *     id: '42603',
   *     type: 'users'
   *   }
   * })
   *
   * @example
   * // Handling errors (async/await)
   * // http://jsonapi.org/format/#error-objects
   * try {
   *   api.create('posts', { ... })
   * } catch (err) {
   *   if (err.errors) err.errors.forEach(error => {
   *       console.log(error) // Prints JSON:API error object
   *   })
   * }
   *
   * @example
   * // Handling errors (Promise)
   * // http://jsonapi.org/format/#error-objects
   * api.create('posts', { ... })
   *   .catch(err => {
   *     if (err.errors) err.errors.forEach(error => {
   *       console.log(error) // Prints JSON:API error object
   *     })
   *   })
   */
  async post (model, body, headers = {}) {
    try {
      headers = Object.assign(this.headers, headers)
      if (!this.isAuth) throw new Error('Not logged in')

      const url = this.plural(this.resCase(model))
      const { data } = await this.axios.post(
        url,
        await serialise.apply(this, [ model, body ]),
        { headers }
      )

      return data
    } catch (E) {
      throw error(E)
    }
  }

  /**
   * Remove a resource
   *
   * @memberof Kitsu
   * @param {string} model Model to remove data from
   * @param {string|number} id Resource ID to remove
   * @param {Object} headers Additional headers to send with request
   * @returns {Object} JSON-parsed response
   *
   * @example
   * // Delete a user's post
   * api.remove('posts', 123)
   *
   * @example
   * // Handling errors (async/await)
   * // http://jsonapi.org/format/#error-objects
   * try {
   *   api.remove('posts', 1)
   * } catch (err) {
   *   if (err.errors) err.errors.forEach(error => {
   *       console.log(error) // Prints JSON:API error object
   *   })
   * }
   *
   * @example
   * // Handling errors (Promise)
   * // http://jsonapi.org/format/#error-objects
   * api.remove('posts', 1)
   *   .catch(err => {
   *     if (err.errors) err.errors.forEach(error => {
   *       console.log(error) // Prints JSON:API error object
   *     })
   *   })
   */
  async remove (model, id, headers = {}) {
    try {
      headers = Object.assign(this.headers, headers)
      if (!this.isAuth) throw new Error('Not logged in')

      const url = this.plural(this.resCase(model)) + '/' + id
      const { data } = await this.axios.delete(url, {
        data: await serialise.apply(this, [ model, { id }, 'DELETE' ]),
        headers
      })

      return data
    } catch (E) {
      throw error(E)
    }
  }

  /**
   * Get the authenticated user's data
   * Note: Requires the JSON:API server to support `filter[self]=true`
   *
   * @memberof Kitsu
   * @param {Object} params JSON-API request queries
   * @param {Object} params.fields Return a sparse fieldset with only the included attributes/relationships - [JSON:API Sparse Fieldsets](http://jsonapi.org/format/#fetching-sparse-fieldsets)
   * @param {string} params.include Include relationship data - [JSON:API Includes](http://jsonapi.org/format/#fetching-includes)
   * @param {Object} headers Additional headers to send with request
   * @returns {Object} JSON-parsed response
   *
   * @example
   * // Receive all attributes
   * api.self()
   *
   * @example
   * // Receive a sparse fieldset
   * api.self({
   *   fields: 'name,birthday'
   * })
   *
   * @example
   * // Handling errors (async/await)
   * // http://jsonapi.org/format/#error-objects
   * try {
   *   const { data } = api.self()
   * } catch (err) {
   *   if (err.errors) err.errors.forEach(error => {
   *       console.log(error) // Prints JSON:API error object
   *   })
   * }
   *
   * @example
   * // Handling errors (Promise)
   * // http://jsonapi.org/format/#error-objects
   * api.self()
   *   .then(res => res.data)
   *   .catch(err => {
   *     if (err.errors) err.errors.forEach(error => {
   *       console.log(error) // Prints JSON:API error object
   *     })
   *   })
   */
  async self (params = {}, headers = {}) {
    try {
      const res = await this.get('users', Object.assign({ filter: { self: true } }, params), headers)
      if (res.errors) throw res
      return res.data[0]
    } catch (E) {
      throw error(E)
    }
  }

  fetch = this.get
  update = this.patch
  create = this.post
}
