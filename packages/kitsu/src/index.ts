import type { AxiosInstance } from 'axios'
import axios from 'axios'
import type { JsonObject } from 'kitsu-core'
import { camel, deserialise, error, kebab, query, serialise, snake, splitModel } from 'kitsu-core'
import pluralise from 'pluralize'
import type { ArbitraryRequest, KitsuOptions, KitsuResponse, RequestConfig } from './types.js'

/**
 * Creates a new `kitsu` instance
 *
 * @param {Object} [options] Options
 * @param {string} [options.baseURL='https://kitsu.app/api/edge'] Set the API endpoint
 * @param {Object} [options.headers] Additional headers to send with the requests
 * @param {'traditional'|'modern'|Function} [options.query=traditional] Query serializer function to use. This will impact the way keys are serialized when passing arrays as query parameters. 'modern' is recommended for new projects.
 * @param {boolean} [options.camelCaseTypes=true] If enabled, `type` will be converted to camelCase from kebab-casae or snake_case
 * @param {'kebab'|'snake'|'none'} [options.resourceCase=kebab] Case to convert camelCase to. `kebab` - `/library-entries`; `snake` - /library_entries`; `none` - `/libraryEntries`
 * @param {boolean} [options.pluralize=true] If enabled, `/user` will become `/users` in the URL request and `type` will be pluralized in POST, PATCH and DELETE requests
 * @param {number} [options.timeout=30000] Set the request timeout in milliseconds
 * @param {Object} [options.axiosOptions] Additional options for the axios instance (see [axios/axios#request-config](https://github.com/axios/axios#request-config) for details)
 * @param {boolean} [options.hoistData=false] Unwrap resource documents containing only data. Arrays and null stay under data in HTTP responses; document metadata keeps the wrapper.
 * @example <caption>Using with kitsu.app's API</caption>
 * const api = new Kitsu()
 * @example <caption>Using another API server</caption>
 * const api = new Kitsu({
 *   baseURL: 'https://api.example.org/2'
 * })
 *
 * @example <caption>Setting headers</caption>
 * const api = new Kitsu({
 *   headers: {
 *     'User-Agent': 'MyApp/1.0.0 (github.com/username/repo)',
 *     Authorization: 'Bearer 1234567890'
 *   }
 * })
 *
 * @example <caption>Flatter responses without data properties</caption>
 * const api = new Kitsu({ hoistData: true })
 * const { data } = await api.get('library-entries')
 * // instead of: { data: { id: '1', type: 'people', coworkers: [ { id: '2', type: 'people' } ] } }
 * // you get: { id: '1', type: 'people', coworkers: [ { id: '2', type: 'people' } ] }
 */
export default class Kitsu {
  declare query: (params?: JsonObject) => string
  declare camel: (value: string) => string
  declare resCase: (value: string) => string
  declare plural: typeof pluralise
  declare headers: JsonObject
  declare axios: AxiosInstance
  declare hoistData: boolean
  declare fetch: Kitsu['get']
  declare update: Kitsu['patch']
  declare create: Kitsu['post']
  declare remove: Kitsu['delete']
  declare interceptors: AxiosInstance['interceptors']
  constructor(options: KitsuOptions = {}) {
    const traditional = typeof options.query === 'string' ? options.query === 'traditional' : true
    this.query =
      typeof options.query === 'function'
        ? options.query
        : (obj) => query(obj, undefined, traditional)

    if (options.camelCaseTypes === false) this.camel = (s) => s
    else this.camel = camel

    if (options.resourceCase === 'none') this.resCase = (s) => s
    else if (options.resourceCase === 'snake') this.resCase = snake
    else this.resCase = kebab

    /**
     * If pluralization is enabled (default, see Kitsu constructor docs) then pluralization rules can be added
     *
     * @memberof Kitsu
     * @external plural
     * @see {@link https://www.npmjs.com/package/pluralize} for documentation
     * @see {@link Kitsu} constructor options for disabling pluralization
     * @example <caption>Adding an uncountable pluralization rule</caption>
     * api.plural.plural('paper') //=> 'papers'
     * api.plural.addUncountableRule('paper')
     * api.plural.plural('paper') //=> 'paper'
     *
     */
    if (options.pluralize === false) this.plural = ((s: string) => s) as typeof pluralise
    else this.plural = pluralise

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
    this.headers = {
      ...{ Accept: 'application/vnd.api+json', 'Content-Type': 'application/vnd.api+json' },
      ...options.headers,
    }

    this.axios = axios.create({
      ...{
        baseURL: options.baseURL || 'https://kitsu.app/api/edge',
        timeout: options.timeout || 30000,
      },
      paramsSerializer: { serialize: (p) => this.query(p) },
      ...options.axiosOptions,
    })

    this.hoistData = options.hoistData || false

    this.fetch = this.get
    this.update = this.patch
    this.create = this.post
    this.remove = this.delete

    /**
     * Axios Interceptors (alias of `axios.interceptors`)
     *
     * You can intercept responses before they are handled by `get`, `post`, `patch` and `delete` and before requests are sent to the API server.
     *
     * @memberof Kitsu
     * @see {@link https://github.com/axios/axios#interceptors} for documentation
     * @example <caption>Request Interceptor</caption>
     * // Add a request interceptor
     * api.interceptors.request.use(config => {
     *    // Do something before request is sent
     *    return config
     * }, error => {
     *    // Do something with the request error
     *    return Promise.reject(error)
     * })
     * @example <caption>Response Interceptor</caption>
     * // Add a response interceptor
     * api.interceptors.response.use(response => {
     *    // Any status code that lie within the range of 2xx cause this function to trigger
     *    // Do something with response data
     *    return response
     * }, error => {
     *    // Any status codes that falls outside the range of 2xx cause this function to trigger
     *    // Do something with response error
     *    return Promise.reject(error)
     * })
     * @example <caption>Removing Interceptors</caption>
     * const myInterceptor = api.interceptors.request.use(function () {...})
     * api.interceptors.request.eject(myInterceptor)
     */
    this.interceptors = this.axios.interceptors
  }

  #result(data: any, status: number, headers: JsonObject): any {
    const decoded = deserialise(data, { hoistData: this.hoistData })
    return {
      ...(decoded === null || Array.isArray(decoded) ? { data: decoded } : decoded),
      status,
      ...(headers && Object.keys(headers).length ? { headers } : {}),
    }
  }

  /**
   * Fetch resources (alias `fetch`)
   *
   * @memberof Kitsu
   * @param {string} model Resource to fetch data from. Expected formats are [`:resource`](https://jsonapi.org/format/#document-resource-objects), [`:resource/:id`](https://jsonapi.org/format/#document-resource-objects), [`:resource/:id/:relationship`](https://jsonapi.org/format/#document-resource-object-relationships) or [`:resource/:id/relationships/:relationship`](https://jsonapi.org/format/#document-resource-object-linkage)
   * @param {Object} [config] Additional configuration
   * @param {Object} [config.headers] Additional headers to send with the request
   * @param {Object} [config.params] JSON:API request queries. JSON:API query parameters not listed are supported
   * @param {Object} [config.params.fields] Return a sparse fieldset with only the included attributes/relationships - [JSON:API Sparse Fieldsets](http://jsonapi.org/format/#fetching-sparse-fieldsets)
   * @param {Object} [config.params.filter] Filter dataset by attribute values - [JSON:API Filtering](http://jsonapi.org/format/#fetching-filtering)
   * @param {string} [config.params.include] Include relationship data - [JSON:API Includes](http://jsonapi.org/format/#fetching-includes)
   * @param {string} [config.params.sort] Sort dataset by one or more comma separated attributes (prepend `-` for descending order) - [JSON:API Sorting](http://jsonapi.org/format/#fetching-sorting)
   * @param {Object} [config.params.page] [JSON:API Pagination](http://jsonapi.org/format/#fetching-pagination). All pagination strategies are supported, even if they are not listed below.
   * @param {number} [config.params.page.limit] Number of resources to return in request (Offset-based) - **Note:** For kitsu.app, max is `20` except on `libraryEntries` which has a max of `500`
   * @param {number} [config.params.page.offset] Number of resources to offset the dataset by (Offset-based)
   * @param {number} [config.params.page.number] Page of resources to return in request (Page-based) - **Note:** Not supported on kitsu.app
   * @param {number} [config.params.page.size] Number of resources to return in request (Page-based and cursor-based) - **Note:** Not supported on kitsu.app
   * @param {string} [config.params.page.before] Get the previous page of resources (Cursor-based) - **Note:** Not Supported on kitsu.app
   * @param {string} [config.params.page.after] Get the next page of resources (Cursor-based) - **Note:** Not Supported on kitsu.app
   * @param {Object} [config.document] Top-level JSON:API members accompanying writes
   * @param {Object} [config.axiosOptions] Additional options for the axios instance (see [axios/axios#request-config](https://github.com/axios/axios#request-config) for details)
   * @returns {Promise<Object>} JSON-parsed response
   * @example <caption>Getting a resource with JSON:API parameters</caption>
   * api.get('users', {
   *   params: {
   *     fields: {
   *       users: 'name,birthday'
   *     },
   *     filter: {
   *       name: 'wopian'
   *     }
   *   }
   * })
   * @example <caption>Getting a collection of resources with their relationships</caption>
   * api.get('anime', {
   *   params: {
   *     include: 'categories'
   *   }
   * })
   * @example <caption>Getting a single resource by ID (method one)</caption>
   * api.get('anime/2', {
   *   params: {
   *     include: 'categories'
   *   }
   * })
   * @example <caption>Getting a single resource by ID (method two)</caption>
   * api.get('anime', {
   *   params: {
   *     include: 'categories',
   *     filter: { id: '2' }
   *  }
   * })
   * @example <caption>Getting a resource's relationship data only</caption>
   * api.get('anime/2/categories')
   * @example <caption>Getting a resource with nested JSON:API filters (not supported by kitsu.app's API)</caption>
   * // resource?filter[x][y]=value
   * api.get('resource', {
   *   params: {
   *     filter: {
   *       x: {
   *         y: 'value'
   *       }
   *     }
   *   }
   * })
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
  async get<T = any>(model: string, config: RequestConfig = {}): Promise<KitsuResponse<T>> {
    try {
      const headers = { ...this.headers, ...config.headers }
      const params = config.params
      const [res, id, relationship, subRelationship] = model.split('/')

      // :resource
      let url = this.plural(this.resCase(res))
      // :resource/:id
      // :resource/:relationship
      if (id) url += `/${id}`
      // :resource/:id/:relationship
      // :resource/:relationship/:subRelationship
      if (relationship) url += `/${this.resCase(relationship)}`
      // :resource/:id/relationships/:relationship
      // :resource/:id/:relationship/:subRelationship
      if (subRelationship) url += `/${this.resCase(subRelationship)}`

      const {
        data,
        headers: responseHeaders,
        status,
      } = await this.axios.get(url, {
        headers,
        params,
        ...config.axiosOptions,
      })

      return this.#result(data, status, responseHeaders)
    } catch (E) {
      throw error(E)
    }
  }

  /**
   * Update a resource (alias `update`)
   *
   * @memberof Kitsu
   * @param {string} model Resource to update data in. Expected formats are [`:resource`](https://jsonapi.org/format/#document-resource-objects), [`:resource/:id`](https://jsonapi.org/format/#document-resource-objects), [`:resource/:id/:relationship`](https://jsonapi.org/format/#document-resource-object-relationships) or [`:resource/:id/relationships/:relationship`](https://jsonapi.org/format/#document-resource-object-linkage)
   * @param {Object|Object[]|null} body Data to send in the request
   * @param {Object} [config] Additional configuration
   * @param {Object} [config.params] JSON:API request queries. See [#get](#get) for documentation
   * @param {Object} [config.headers] Additional headers to send with the request
   * @param {Object} [config.document] Top-level JSON:API members accompanying writes
   * @param {Object} [config.axiosOptions] Additional options for the axios instance (see [axios/axios#request-config](https://github.com/axios/axios#request-config) for details)
   * @returns {Promise<Object|Object[]>} JSON-parsed response
   * @example <caption>Update a resource</caption>
   * api.update('posts', {
   *   id: '1',
   *   content: 'Goodbye World'
   * })
   * @example <caption>Update a resource with relationships</caption>
   * api.update('posts', {
   *   id: '1',
   *   content: 'Hello World',
   *   uploads: {
   *     id: '167585',
   *     type: 'uploads'
   *   }
   * })
   * @example <caption>Clear to-one relationships from a resource</caption>
   * api.update('posts/1/relationships/uploads', null)
   * @example <caption>Clear to-many relationships from a resource</caption>
   * api.update('posts/1/relationships/uploads', [])
   * @example <caption>Update multiple resources (API must support the Bulk Extension)</caption>
   * api.update('posts', [
   *   { id: '1', content: 'Hello World' },
   *   { id: '2', content: 'Another post' }
   * ])
   */
  async patch<T = any>(
    model: string,
    body: JsonObject | JsonObject[] | null,
    config: RequestConfig = {},
  ): Promise<KitsuResponse<T>> {
    try {
      const headers = { ...this.headers, ...config.headers }
      const params = config.params
      const [resourceModel, url] = model.includes('/')
        ? splitModel(model)
        : splitModel(model, {
            resourceCase: this.resCase,
            pluralModel: this.plural,
          })
      const resourceType =
        (body as JsonObject)?.type ||
        (model.split('/').length === 2 ? model.split('/')[0] : resourceModel)
      const serialData = serialise(resourceType, body, 'PATCH', {
        camelCaseTypes: this.camel,
        pluralTypes: this.plural,
        document: config.document,
        relationship: model.includes('/relationships/'),
      })
      const fullURL =
        !model.includes('/') && (body as JsonObject)?.id !== undefined
          ? `${url}/${encodeURIComponent(String((body as JsonObject).id))}`
          : url
      const {
        data,
        headers: responseHeaders,
        status,
      } = await this.axios.patch(fullURL, serialData, {
        headers,
        params,
        ...config.axiosOptions,
      })

      return this.#result(data, status, responseHeaders)
    } catch (E) {
      throw error(E)
    }
  }

  /**
   * Create a new resource (alias `create`)
   *
   * @memberof Kitsu
   * @param {string} model Resource to create. Expected formats are [`:resource`](https://jsonapi.org/format/#document-resource-objects), [`:resource/:id`](https://jsonapi.org/format/#document-resource-objects), [`:resource/:id/:relationship`](https://jsonapi.org/format/#document-resource-object-relationships) or [`:resource/:id/relationships/:relationship`](https://jsonapi.org/format/#document-resource-object-linkage)
   * @param {Object|Object[]|null} body Data to send in the request
   * @param {Object} [config] Additional configuration
   * @param {Object} [config.params] JSON:API request queries. See [#get](#get) for documentation
   * @param {Object} [config.headers] Additional headers to send with the request
   * @param {Object} [config.document] Top-level JSON:API members accompanying writes
   * @param {Object} [config.axiosOptions] Additional options for the axios instance (see [axios/axios#request-config](https://github.com/axios/axios#request-config) for details)
   * @returns {Promise<Object|Object[]>} JSON-parsed response
   * @example <caption>Create a post on a user's profile feed</caption>
   * api.create('posts', {
   *   content: 'Hello World',
   *   targetUser: { id: '42603', type: 'users' },
   *   user: { id: '42603', type: 'users' }
   * })
   * @example <caption>Create multiple resources (API must support the Bulk Extension)</caption>
   * api.create('posts', [
   *   { content: 'Hello World' },
   *   { content: 'Another post' }
   * ])
   */
  async post<T = any>(
    model: string,
    body: JsonObject | JsonObject[] | null,
    config: RequestConfig = {},
  ): Promise<KitsuResponse<T>> {
    try {
      const headers = { ...this.headers, ...config.headers }
      const params = config.params
      const [resourceModel, url] = model.includes('/')
        ? splitModel(model)
        : splitModel(model, {
            resourceCase: this.resCase,
            pluralModel: this.plural,
          })
      const {
        data,
        headers: responseHeaders,
        status,
      } = await this.axios.post(
        url,
        serialise(resourceModel, body, 'POST', {
          camelCaseTypes: this.camel,
          pluralTypes: this.plural,
          document: config.document,
          relationship: model.includes('/relationships/'),
        }),
        {
          headers,
          params,
          ...config.axiosOptions,
        },
      )

      return this.#result(data, status, responseHeaders)
    } catch (E) {
      throw error(E)
    }
  }

  /**
   * Remove a resource (alias `remove`)
   *
   * @memberof Kitsu
   * @param {string} model Resource to remove. Expected formats are [`:resource`](https://jsonapi.org/format/#document-resource-objects), [`:resource/:id/:relationship`](https://jsonapi.org/format/#document-resource-object-relationships) or [`:resource/:id/relationships/:relationship`](https://jsonapi.org/format/#document-resource-object-linkage)
   * @param {string|number|number[]} id Resource ID to remove. Pass an array of IDs to delete multiple resources (Bulk Extension)
   * @param {Object} [config] Additional configuration
   * @param {Object} [config.params] JSON:API request queries. See [#get](#get) for documentation
   * @param {Object} [config.headers] Additional headers to send with the request
   * @param {Object} [config.document] Top-level JSON:API members accompanying writes
   * @param {Object} [config.axiosOptions] Additional options for the axios instance (see [axios/axios#request-config](https://github.com/axios/axios#request-config) for details)
   * @returns {Promise<Object|Object[]>} JSON-parsed response
   * @example <caption>Remove one or more relationships from a resource</caption>
   * api.delete('posts/1/relationships/uploads', [456, 789])
   * @example <caption>Remove a single resource</caption>
   * api.delete('posts', 123)
   * @example <caption>Remove multiple resources (API must support the Bulk Extension)</caption>
   * api.delete('posts', [ 1, 2 ])
   */
  async delete<T = any>(
    model: string,
    id: string | number | (string | number)[],
    config: RequestConfig = {},
  ): Promise<KitsuResponse<T>> {
    try {
      const headers = { ...this.headers, ...config.headers }
      const params = config.params
      const [resourceModel, url] = model.includes('/')
        ? splitModel(model)
        : splitModel(model, {
            resourceCase: this.resCase,
            pluralModel: this.plural,
          })
      const isBulk = Array.isArray(id)
      const relationship = model.includes('/relationships/')
      if (id === undefined || id === null)
        throw new Error(`DELETE requires an ID for the ${resourceModel} type`)
      let path: string, payload: JsonObject | JsonObject[]

      if (isBulk || relationship) {
        path = url
        payload = (isBulk ? id : [id]).map((id) => ({ id }))
      } else {
        path = `${url}/${encodeURIComponent(String(id))}`
        payload = { id }
      }

      const {
        data,
        headers: responseHeaders,
        status,
      } = await this.axios.delete(path, {
        data:
          isBulk || relationship
            ? serialise(resourceModel, payload, 'DELETE', {
                camelCaseTypes: this.camel,
                pluralTypes: this.plural,
                document: config.document,
                relationship,
              })
            : undefined,
        headers,
        params,
        ...config.axiosOptions,
      })

      return this.#result(data, status, responseHeaders)
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
   * @param {Object} [config] Additional configuration
   * @param {Object} [config.params] JSON:API request queries. See [#get](#get) for documentation
   * @param {Object} [config.headers] Additional headers to send with the request
   * @param {Object} [config.document] Top-level JSON:API members accompanying writes
   * @param {Object} [config.axiosOptions] Additional options for the axios instance (see [axios/axios#request-config](https://github.com/axios/axios#request-config) for details)
   * @returns {Promise<Object>} JSON-parsed response
   * @example <caption>Get the authenticated user's resource</caption>
   * api.self()
   * @example <caption>Using JSON:API parameters</caption>
   * api.self({
   *   params: {
   *     fields: {
   *       users: 'name,birthday'
   *     }
   *   }
   * })
   */
  async self<T = any>(config: RequestConfig = {}): Promise<KitsuResponse<T>> {
    try {
      const headers = { ...this.headers, ...config.headers }
      const params = { ...config.params, ...{ filter: { self: true } } }
      const res = await this.get('users', { ...{ headers }, ...{ params }, ...config.axiosOptions })
      return {
        ...(res.headers && { headers: res.headers }),
        ...(res.data?.[0] && { data: res.data[0] }),
      }
    } catch (E) {
      throw error(E)
    }
  }

  /**
   * Send arbitrary requests
   *
   * **Note** Planned changes to the `get`, `patch`, `post` and `delete` methods in a future major release may make this method redundent. See https://github.com/wopian/kitsu/issues/415 for details.
   *
   * @memberof Kitsu
   * @param {Object} config Request configuration
   * @param {string} config.url The URL path of the resource
   * @param {string} config.type The resource type
   * @param {boolean} [config.relationship] Treat custom URL as a relationship endpoint
   * @param {Object|Object[]} [config.body] Data to send in the request
   * @param {string} [config.method] Request method - `GET`, `PATCH`, `POST` or `DELETE` (defaults to `GET`, case-insensitive)
   * @param {Object} [config.params] JSON:API request queries. See [#get](#get) for documentation
   * @param {Object} [config.headers] Additional headers to send with the request
   * @param {Object} [config.document] Top-level JSON:API members accompanying writes
   * @param {Object} [config.axiosOptions] Additional options for the axios instance (see [axios/axios#request-config](https://github.com/axios/axios#request-config) for details)
   * @returns {Promise<Object>} JSON-parsed response
   * @example <caption>Raw GET request</caption>
   * api.request({
   *   url: 'anime/1/mappings',
   *   type: 'mappings',
   *   params: { filter: { externalSite: 'aozora' } }
   * })
   * @example <caption>Raw PATCH request</caption>
   * api.request({
   *   method: 'PATCH',
   *   url: 'anime',
   *   type: 'anime',
   *   body: { id: '1', subtype: 'tv' }
   * })
   * @example <caption>Raw POST request</caption>
   * api.request({
   *   method: 'PATCH',
   *   url: 'anime',
   *   type: 'anime',
   *   body: { subtype: 'tv' }
   * })
   * @example <caption>Raw DELETE request</caption>
   * api.request({
   *   method: 'DELETE',
   *   url: 'anime/1',
   *   type: 'anime',
   *   body: { id: '1' }
   * })
   * @example <caption>Bulk Extension support (`PATCH`, `POST` & `DELETE`)</caption>
   * api.request({
   *   method: 'PATCH',
   *   url: 'anime',
   *   type: 'anime',
   *   body: [
   *     { id: '1', subtype: 'tv' }
   *     { id: '2', subtype: 'ona' }
   *   ]
   * })
   */
  async request<T = any>({
    body,
    method,
    params,
    type,
    url,
    headers,
    axiosOptions,
    document,
    relationship = url?.includes('/relationships/') ?? false,
  }: ArbitraryRequest): Promise<KitsuResponse<T>> {
    try {
      method = method?.toUpperCase() || 'GET'
      const {
        data,
        headers: responseHeaders,
        status,
      } = await this.axios.request({
        method,
        url,
        data:
          method === 'GET' || (method === 'DELETE' && !relationship)
            ? undefined
            : serialise(type, body, method, {
                camelCaseTypes: this.camel,
                pluralTypes: this.plural,
                document,
                relationship,
              }),
        headers: { ...this.headers, ...headers },
        params,
        ...axiosOptions,
      })

      return this.#result(data, status, responseHeaders)
    } catch (E) {
      throw error(E)
    }
  }
}

export type * from './types.js'
