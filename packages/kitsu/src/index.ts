import type { AxiosInstance } from 'axios'
import axios from 'axios'
import type { JsonObject } from 'kitsu-core'
import { camel, deserialise, error, kebab, query, serialise, snake, splitModel } from 'kitsu-core'
import pluralise from 'pluralize'
import type { ArbitraryRequest, KitsuOptions, KitsuResponse, RequestConfig } from './types.js'

/**
 * JSON:API client using Axios, including adapters and interceptors.
 *
 * Constructor options configure defaults. Pass params and document per request;
 * constructor params and document are accepted by the type but ignored.
 *
 * @param {KitsuOptions} [options={}] Client defaults; see typed properties and individual examples in KitsuOptions
 * @param {string} [options.baseURL='https://kitsu.app/api/edge'] API base URL for relative resource paths
 * @param {JsonObject} [options.headers] Default headers. Accept and Content-Type initially use application/vnd.api+json. Media parameters and Accept alternatives are preserved.
 * @param {('traditional'|'modern'|function(JsonObject=): string)} [options.query='traditional'] Traditional mode repeats array keys. Modern mode uses key[]. A callback returns an encoded query string without ?.
 * @param {boolean} [options.camelCaseTypes=true] Convert inferred outgoing types to camelCase; decoded types stay unchanged
 * @param {('kebab'|'snake'|'none')} [options.resourceCase='kebab'] Generated URL case: library-entries, library_entries, or libraryEntries
 * @param {('kebab'|'snake'|'none')} [options.attributeCase='none'] Keep attribute names by default. kebab and snake encode that case and decode camelCase. Nested JSON, relationships, metadata, extension attributes and queries stay unchanged.
 * @param {boolean} [options.pluralize=true] Pluralize generated resource URLs and inferred outgoing types
 * @param {number} [options.timeout=30000] Timeout in milliseconds. Top-level 0 also selects 30000; use axiosOptions.timeout: 0 to disable.
 * @param {boolean} [options.hoistData=false] Unwrap a single-resource document containing only data. Document metadata and included keep the wrapper; HTTP arrays and null stay under data. Resource metadata stays under $.
 * @param {AxiosRequestConfig} [options.axiosOptions] Axios defaults, overriding generated baseURL, timeout and paramsSerializer when supplied.
 * @param {JsonObject} [options.params] Ignored at construction; pass config.params to a method
 * @param {JsonApiDocument} [options.document] Ignored at construction; pass config.document on writes
 * @example <caption>Configure every constructor option</caption>
 * import Kitsu from 'kitsu'
 * const api = new Kitsu({
 *   baseURL: 'https://bakery.example/api',
 *   headers: { Authorization: 'Bearer bakery-demo-token' },
 *   query: 'modern',
 *   camelCaseTypes: false,
 *   resourceCase: 'snake',
 *   attributeCase: 'kebab',
 *   pluralize: false,
 *   timeout: 10000,
 *   hoistData: false,
 *   axiosOptions: { withCredentials: true }
 * })
 * await api.get('article', { params: { include: 'author' } })
 * @example <caption>Attribute casing enabled and disabled</caption>
 * const unchanged = new Kitsu({ attributeCase: 'none' })
 * const converted = new Kitsu({ attributeCase: 'kebab' })
 * await unchanged.post('people', { firstName: 'Mina' }) // attributes: { firstName: 'Mina' }
 * await converted.post('people', { firstName: 'Mina' }) // attributes: { 'first-name': 'Mina' }
 * // For a response with attributes: { 'first-name': 'Mina' }:
 * // unchanged.get('people/9') keeps data['first-name']; converted.get('people/9') gives data.firstName.
 * @example <caption>Document metadata, resource metadata, and hoisting</caption>
 * const wrapped = new Kitsu({ hoistData: false })
 * const hoisted = new Kitsu({ hoistData: true })
 * // Server body: { data: { type: 'people', id: '9', meta: { editable: true } } }
 * const first = await wrapped.get('people/9')
 * console.log(first.data.$.meta.editable) // true
 * const second = await hoisted.get('people/9')
 * console.log(second.$.meta.editable) // true; status and headers remain available
 * // If that body also contains meta: { total: 1 }, both clients retain data:
 * // result.meta.total describes the document; result.data.$.meta.editable describes the person.
 * @example <caption>Custom query serializer</caption>
 * const custom = new Kitsu({
 *   query: (params) => new URLSearchParams({ title: String(params?.title ?? '') }).toString()
 * })
 * await custom.get('articles', { params: { title: 'Moonlight Bread' } })
 * // URL ends with ?title=Moonlight+Bread
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
  #attributeCase?: (name: string) => string
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

    if (options.attributeCase === 'kebab') this.#attributeCase = kebab
    else if (options.attributeCase === 'snake') this.#attributeCase = snake

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
     * const myInterceptor = api.interceptors.request.use(config => config)
     * api.interceptors.request.eject(myInterceptor)
     */
    this.interceptors = this.axios.interceptors
  }

  #result(data: any, status: number, headers: JsonObject): any {
    const decoded = deserialise(data, {
      hoistData: this.hoistData,
      attributeCase: this.#attributeCase ? camel : undefined,
    })
    return {
      ...(decoded === null || Array.isArray(decoded) ? { data: decoded } : decoded),
      status,
      ...(headers && Object.keys(headers).length ? { headers } : {}),
    }
  }

  /**
   * Fetch a resource, collection, related resources, or relationship linkage. Alias: fetch.
   * @param {string} model Resource path: articles, articles/42, articles/42/author, or articles/42/relationships/author
   * @param {RequestConfig} [config={}] Per-request options
   * @param {JsonObject} [config.headers] Override default headers without changing client defaults
   * @param {JsonObject} [config.params] Encoded query parameters: include, fields, sort, page, filter and extension families.
   * @param {JsonApiDocument} [config.document] Ignored by this read method; use document on writes.
   * @param {AxiosRequestConfig} [config.axiosOptions] Axios overrides, applied after generated headers and params. request() also permits method, url and data overrides. Use signal for cancellation.
   * @returns {Promise<KitsuResponse>} Decoded document with HTTP details
   * @example
   * await api.get('articles', {
   *   headers: { 'Accept-Language': 'en' },
   *   params: { include: 'author', fields: { articles: 'title,author' }, sort: '-createdAt', page: { number: 2, size: 10 }, filter: { title: 'Bread' } },
   *   axiosOptions: { timeout: 10000, signal: new AbortController().signal }
   * })
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
   * Update a resource or replace relationship linkage. Alias: update.
   * @param {string} model Resource or relationship path. With a bare resource name, body.id is appended to the URL.
   * @param {(JsonObject|Array<JsonObject>|null)} body Flat resources or relationship identifiers. Use null to clear to-one linkage at a relationship endpoint.
   * @param {RequestConfig} [config={}] Per-request options
   * @param {JsonObject} [config.headers] Override default headers without changing client defaults
   * @param {JsonObject} [config.params] Encoded query parameters: include, fields, sort, page, filter and extension families.
   * @param {JsonApiDocument} [config.document] Extra write document members: meta, links, jsonapi, included and extensions. No data or errors. Ignored by bodyless resource DELETE.
   * @param {AxiosRequestConfig} [config.axiosOptions] Axios overrides, applied after generated headers and params. request() also permits method, url and data overrides. Use signal for cancellation.
   * @returns {Promise<KitsuResponse>} Decoded response with HTTP details
   * @example <caption>Resource and document metadata</caption>
   * await api.patch('articles', {
   *   id: '42', title: 'Moonlight Bread', $: { meta: { editable: true } }
   * }, { document: { meta: { requestId: 'demo-42' } } })
   * @example <caption>Clear relationships</caption>
   * await api.patch('articles/42/relationships/author', null)
   * await api.patch('articles/42/relationships/tags', [])
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
        attributeCase: this.#attributeCase,
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
   * Create resources or add relationship linkage. Alias: create. Resource arrays require server support; no Atomic Operations processing.
   * @param {string} model Resource or relationship path
   * @param {(JsonObject|Array<JsonObject>|null)} body Flat resources or relationship identifiers; full related resources generate included
   * @param {RequestConfig} [config={}] Per-request options
   * @param {JsonObject} [config.headers] Override default headers without changing client defaults
   * @param {JsonObject} [config.params] Encoded query parameters: include, fields, sort, page, filter and extension families.
   * @param {JsonApiDocument} [config.document] Extra write document members: meta, links, jsonapi, included and extensions. No data or errors. Ignored by bodyless resource DELETE.
   * @param {AxiosRequestConfig} [config.axiosOptions] Axios overrides, applied after generated headers and params. request() also permits method, url and data overrides. Use signal for cancellation.
   * @returns {Promise<KitsuResponse>} Decoded response with HTTP details
   * @example
   * await api.post('articles', { title: 'Moonlight Bread', author: { type: 'people', id: '9' } }, {
   *   document: { meta: { requestId: 'demo-42' } }
   * })
   * await api.post('articles/42/relationships/tags', [{ type: 'tags', id: '3' }])
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
          attributeCase: this.#attributeCase,
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
   * Delete a resource or remove relationship identifiers. Alias: remove. Resource DELETE sends no body.
   * Relationship DELETE sends identifiers without appending their IDs to the URL. Legacy bulk resource DELETE requires server support.
   * @param {string} model Resource name or relationship path. For a resource, pass its ID separately.
   * @param {(string|number|Array<(string|number)>)} id Resource ID, including 0, or IDs for relationship/bulk deletion
   * @param {RequestConfig} [config={}] Per-request options
   * @param {JsonObject} [config.headers] Override default headers without changing client defaults
   * @param {JsonObject} [config.params] Encoded query parameters: include, fields, sort, page, filter and extension families.
   * @param {JsonApiDocument} [config.document] Extra write document members: meta, links, jsonapi, included and extensions. No data or errors. Ignored by bodyless resource DELETE.
   * @param {AxiosRequestConfig} [config.axiosOptions] Axios overrides, applied after generated headers and params. request() also permits method, url and data overrides. Use signal for cancellation.
   * @returns {Promise<KitsuResponse>} Decoded response; empty responses retain HTTP details
   * @example
   * await api.delete('articles', '42') // DELETE /articles/42; no body
   * await api.delete('articles/42/relationships/tags', ['3'], { document: { meta: { requestId: 'demo-42' } } })
   * // DELETE /articles/42/relationships/tags; body: { data: [{ type: 'tags', id: '3' }] }
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
                attributeCase: this.#attributeCase,
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
   * Fetch the first authenticated user. Server must support filter[self]=true; supplied filter is replaced.
   * @param {RequestConfig} [config={}] Per-request options
   * @param {JsonObject} [config.headers] Override default headers without changing client defaults
   * @param {JsonObject} [config.params] Encoded query parameters: include, fields, sort, page, filter and extension families. self() replaces filter with { self: true }.
   * @param {JsonApiDocument} [config.document] Ignored by this read method; use document on writes.
   * @param {AxiosRequestConfig} [config.axiosOptions] Legacy self() forwards this object as outer get configuration. Use get() for transport overrides.
   * @returns {Promise<KitsuResponse>} First user under data, plus response headers. Legacy self() omits status and other document members.
   * @example
   * const result = await api.self({ headers: { Authorization: 'Bearer bakery-demo-token' }, params: { fields: { users: 'name' } } })
   * console.log(result.data?.name)
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
   * Send an arbitrary JSON:API request without generated URL casing or pluralization.
   * @param {ArbitraryRequest} config Request options; inherits all RequestConfig members
   * @param {string} config.url Relative or absolute URL, used as supplied
   * @param {string} [config.method='GET'] HTTP method, case-insensitive; commonly GET, POST, PATCH or DELETE
   * @param {string} [config.type] Encoding type; may be omitted when body supplies type or no body is sent
   * @param {(JsonObject|Array<JsonObject>|null)} [config.body={}] Flat data or relationship identifiers. GET and resource DELETE send no body.
   * @param {boolean} [config.relationship] Encode primary data as identifiers. Defaults to whether url contains /relationships/.
   * @param {JsonObject} [config.headers] Per-request header overrides
   * @param {JsonObject} [config.params] Query parameters, including nested JSON:API families and extension parameters
   * @param {JsonApiDocument} [config.document] Additional document members for body-bearing requests; no data or errors
   * @param {AxiosRequestConfig} [config.axiosOptions] Axios overrides, applied after generated headers and params. request() also permits method, url and data overrides. Use signal for cancellation.
   * @returns {Promise<KitsuResponse>} Decoded document with HTTP details
   * @example <caption>Custom relationship endpoint</caption>
   * await api.request({
   *   method: 'PATCH', url: 'articles/42/byline', type: 'people', relationship: true,
   *   body: { id: '9' }, headers: { 'Accept-Language': 'en' }, params: { include: 'author' },
   *   document: { meta: { requestId: 'demo-42' } },
   *   axiosOptions: { withCredentials: true }
   * })
   * @example <caption>Bodyless resource DELETE</caption>
   * await api.request({ method: 'DELETE', url: 'articles/42' })
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
                attributeCase: this.#attributeCase,
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
