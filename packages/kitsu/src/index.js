import axios from 'axios'
import { camel, deserialise, error, kebab, query, serialise, snake } from 'kitsu-core'

/**
 * Creates a new `kitsu` instance
 *
 * @param {Object} options Options
 * @param {string} options.baseURL Set the API endpoint (default `https://kitsu.io/api/edge`)
 * @param {Object} options.headers Additional headers to send with requests
 * @param {boolean} options.camelCaseTypes If true, the `type` value will be camelCased, e.g `library-entries` and `library_entries` become `libraryEntries`  (default `true`)
 * @param {string} options.resourceCase `kebab`, `snake` or `none`. If `kebab`, `/libraryEntries` will become `/library-entries`. If `snake`, `/libraryEntries` will become `/library_entries`, If `none`, `/libraryEntries` will be unchanged (default `kebab`)
 * @param {boolean} options.pluralize If `true`, `/user` will become `/users` in the URL request and `type` will be pluralized in post, patch and delete requests - `user` -> `users` (default `true`)
 * @param {number} options.timeout Set the request timeout in milliseconds (default `30000`)
 * @example <caption>Using with Kitsu.io's API</caption>
 * const api = new Kitsu()
 * @example <caption>Using another API server</caption>
 * const api = new Kitsu({
 *   baseURL: 'https://api.example.org/2'
 * })
 * @example <caption>Setting headers</caption>
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

    /**
     * If pluralization is enabled (default, see Kitsu constructor docs) then pluralization rules can be added
     *
     * @memberof Kitsu
     * @external plural
     * @see {@link https://www.npmjs.com/package/pluralize} for documentation
     * @see Kitsu constructor options for disabling pluralization
     * @example <caption>Adding an uncountable pluralization rule</caption>
     * api.plural.plural('paper') //=> 'papers'
     * api.plural.addUncountableRule('paper')
     * api.plural.plural('paper') //=> 'paper'
     *
     */
    if (options.pluralize === false) this.plural = s => s
    else this.plural = require('pluralize')

    /**
     * Get the current headers or add additional headers
     *
     * @memberof Kitsu
     * @returns {Object} All the current headers
     * @example <caption>Get all headers</caption>
     * api.headers
     * @example <caption>Get a single header's value</caption>
     * api.headers['User-Agent']
     * @example <caption>Add or update a header's value</caption>
     * api.headers['Authorization'] = 'Bearer 1234567890'
     */
    this.headers = Object.assign({}, options.headers, { 'Accept': 'application/vnd.api+json', 'Content-Type': 'application/vnd.api+json' })

    this.axios = axios.create({
      baseURL: options.baseURL || 'https://kitsu.io/api/edge',
      timeout: options.timeout || 30000
    })
  }

  /**
   * Fetch resources (alias `fetch`)
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
   * @example <caption>Getting a resource with JSON:API parameters</caption>
   * api.get('users', {
   *   fields: {
   *     users: 'name,birthday'
   *   },
   *   filter: {
   *     name: 'wopian'
   *   }
   * })
   * @example <caption>Getting a collection of resources with their relationships</caption>
   * api.get('anime', {
   *   include: 'categories'
   * })
   * @example <caption>Getting a single resource by ID (method one)</caption>
   * api.get('anime/2', {
   *   include: 'categories'
   * })
   * @example <caption>Getting a single resource by ID (method two)</caption>
   * api.get('anime', {
   *   include: 'categories',
   *   filter: { id: '2' }
   * })
   * @example <caption>Getting a resource's relationship data only</caption>
   * api.get('anime/2/categories')
   * @example <caption>Handling errors (async/await)</caption>
   * try {
   *   const { data } = await api.get('anime')
   * } catch (err) {
   *   // Array of JSON:API errors: http://jsonapi.org/format/#error-objects
   *   if (err.errors) err.errors.forEach(error => { ... })
   *   // Error type (Error, TypeError etc.)
   *   err.name
   *   // Error message
   *   err.message
   *   // Axios request parameters
   *   err.config
   *   // Axios response parameters
   *   err.response
   * }
   * @example <caption>Handling errors (Promises)</caption>
   * api.get('anime')
   *   .then(({ data }) => { ... })
   *   .catch(err => {
   *     // Array of JSON:API errors: http://jsonapi.org/format/#error-objects
   *     if (err.errors) err.errors.forEach(error => { ... })
   *     // Error type (Error, TypeError etc.)
   *     err.name
   *     // Error message
   *     err.message
   *     // Axios request parameters
   *     err.config
   *     // Axios response parameters
   *     err.response
   *   })
   */
  async get (model, params = {}, headers = {}) {
    try {
      let [ res, id, relationship ] = model.split('/')

      let url = this.plural(this.resCase(res))
      if (id) url += `/${id}`
      if (relationship) url += `/${this.resCase(relationship)}`

      /* istanbul ignore next */
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
   * Update a resource (alias `update`)
   *
   * @memberof Kitsu
   * @param {string} model Model to update data in
   * @param {Object} body Data to send in the request
   * @param {Object} headers Additional headers to send with request
   * @returns {Object} JSON-parsed response
   * @example <caption>Update a post</caption>
   * api.update('posts', {
   *   id: '12345678',
   *   content: 'Goodbye World'
   * })
   */
  async patch (model, body, headers = {}) {
    try {
      const serialData = await serialise.apply(this, [ model, body, 'PATCH' ])
      const url = this.plural(this.resCase(model)) + '/' + body.id
      const { data } = await this.axios.patch(
        url,
        serialData,
        { headers: Object.assign(this.headers, headers) }
      )

      return data
    } catch (E) {
      throw error(E)
    }
  }

  /**
   * Create a new resource (alias `create`)
   *
   * @memberof Kitsu
   * @param {string} model Model to create a resource under
   * @param {Object} body Data to send in the request
   * @param {Object} headers Additional headers to send with request
   * @returns {Object} JSON-parsed response
   * @example <caption>Create a post on a user's profile feed</caption>
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
   */
  async post (model, body, headers = {}) {
    try {
      const url = this.plural(this.resCase(model))
      const { data } = await this.axios.post(
        url,
        await serialise.apply(this, [ model, body ]),
        { headers: Object.assign(this.headers, headers) }
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
   * @example <caption>Remove a user's post</caption>
   * api.remove('posts', 123)
   */
  async remove (model, id, headers = {}) {
    try {
      const url = this.plural(this.resCase(model)) + '/' + id
      const { data } = await this.axios.delete(url, {
        data: await serialise.apply(this, [ model, { id }, 'DELETE' ]),
        headers: Object.assign(this.headers, headers)
      })

      return data
    } catch (E) {
      throw error(E)
    }
  }

  /**
   * Get the authenticated user's data
   *
   * **Note** Requires the JSON:API server to support `filter[self]=true`
   *
   * @memberof Kitsu
   * @param {Object} params JSON-API request queries
   * @param {Object} params.fields Return a sparse fieldset with only the included attributes/relationships - [JSON:API Sparse Fieldsets](http://jsonapi.org/format/#fetching-sparse-fieldsets)
   * @param {string} params.include Include relationship data - [JSON:API Includes](http://jsonapi.org/format/#fetching-includes)
   * @param {Object} headers Additional headers to send with request
   * @returns {Object} JSON-parsed response
   * @example <caption>Get the authenticated user's resource</caption>
   * api.self()
   * @example <caption>Using JSON:API parameters</caption>
   * api.self({
   *   fields: 'name,birthday'
   * })
   */
  async self (params = {}, headers = {}) {
    try {
      const res = await this.get('users', Object.assign({ filter: { self: true } }, params), headers)
      return res.data[0]
    } catch (E) {
      throw error(E)
    }
  }

  fetch = this.get
  update = this.patch
  create = this.post
}
