import type { JsonObject } from 'kitsu-core'
import { camel, deserialise, kebab, query, serialise, snake, splitModel } from 'kitsu-core'
import pluralise from 'pluralize'
import {
  type ArbitraryRequest,
  type FetchOptions,
  KitsuNativeError,
  type KitsuNativeOptions,
  type KitsuNativeResponse,
  type RequestConfig,
} from './types.js'

/**
 * JSON:API client using native Fetch in browsers, Node and Bun.
 *
 * Constructor options configure defaults. Pass params and document per request;
 * constructor params and document are accepted by the type but ignored.
 *
 * @param {KitsuNativeOptions} [options={}] Client defaults; see typed properties and individual examples in KitsuNativeOptions
 * @param {string} [options.baseURL='https://kitsu.app/api/edge'] API base URL for relative resource paths
 * @param {HeadersInit} [options.headers] Default headers. Accept and Content-Type initially use application/vnd.api+json. Media parameters and Accept alternatives are preserved.
 * @param {('traditional'|'modern'|function(JsonObject=): string)} [options.query='traditional'] Traditional mode repeats array keys. Modern mode uses key[]. A callback returns an encoded query string without ?.
 * @param {boolean} [options.camelCaseTypes=true] Convert inferred outgoing types to camelCase; decoded types stay unchanged
 * @param {('kebab'|'snake'|'none')} [options.resourceCase='kebab'] Generated URL case: library-entries, library_entries, or libraryEntries
 * @param {('kebab'|'snake'|'none')} [options.attributeCase='none'] Keep attribute names by default. kebab and snake encode that case and decode camelCase. Nested JSON, relationships, metadata, extension attributes and queries stay unchanged.
 * @param {boolean} [options.pluralize=true] Pluralize generated resource URLs and inferred outgoing types
 * @param {number} [options.timeout=30000] Timeout in milliseconds. Set 0 to disable. Combines with caller cancellation.
 * @param {boolean} [options.hoistData=false] Unwrap a single-resource document containing only data. Document metadata and included keep the wrapper; HTTP arrays and null stay under data. Resource metadata stays under $.
 * @param {FetchOptions} [options.fetchOptions] Default native RequestInit options, excluding method, headers and body. Request options win.
 * @param {function((string|URL|Request), RequestInit=): Promise<Response>} [options.fetch=globalThis.fetch] Inject transport. api.fetch remains an alias for api.get.
 * @param {JsonObject} [options.params] Ignored at construction; pass config.params to a method
 * @param {JsonApiDocument} [options.document] Ignored at construction; pass config.document on writes
 * @example <caption>Configure every constructor option</caption>
 * import Kitsu, { type KitsuNativeOptions } from 'kitsu-native'
 * const options: KitsuNativeOptions = {
 *   baseURL: 'https://bakery.example/api',
 *   headers: { Authorization: 'Bearer bakery-demo-token' },
 *   query: 'modern',
 *   camelCaseTypes: false,
 *   resourceCase: 'snake',
 *   attributeCase: 'kebab',
 *   pluralize: false,
 *   timeout: 10000,
 *   hoistData: false,
 *   fetch: (input, init) => globalThis.fetch(input, init),
 *   fetchOptions: { credentials: 'include', cache: 'no-store' }
 * }
 * const api = new Kitsu(options)
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
  query: (params?: JsonObject) => string
  camel: (value: string) => string
  resCase: (value: string) => string
  plural: typeof pluralise
  headers: Headers
  hoistData: boolean
  fetch: Kitsu['get']
  update: Kitsu['patch']
  create: Kitsu['post']
  remove: Kitsu['delete']
  #transport: typeof globalThis.fetch
  #baseURL: string
  #timeout: number
  #fetchOptions?: FetchOptions
  #attributeCase?: (name: string) => string
  constructor(options: KitsuNativeOptions = {}) {
    const traditional = typeof options.query === 'string' ? options.query === 'traditional' : true
    this.query =
      typeof options.query === 'function'
        ? options.query
        : (params) => query(params, undefined, traditional)
    this.camel = options.camelCaseTypes === false ? (value) => value : camel
    this.resCase =
      options.resourceCase === 'none'
        ? (value) => value
        : options.resourceCase === 'snake'
          ? snake
          : kebab
    this.plural =
      options.pluralize === false ? (((value: string) => value) as typeof pluralise) : pluralise
    this.headers = new Headers({
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
    })
    if (options.headers)
      new Headers(options.headers).forEach((value, name) => this.headers.set(name, value))
    this.#baseURL = options.baseURL || 'https://kitsu.app/api/edge'
    this.#timeout = options.timeout ?? 30000
    this.hoistData = options.hoistData || false
    if (options.attributeCase === 'kebab') this.#attributeCase = kebab
    else if (options.attributeCase === 'snake') this.#attributeCase = snake
    this.#fetchOptions = options.fetchOptions
    this.#transport = options.fetch ?? globalThis.fetch
    this.fetch = this.get
    this.update = this.patch
    this.create = this.post
    this.remove = this.delete
  }

  /**
   * Fetch a resource, collection, related resources, or relationship linkage. Alias: fetch.
   * @param {string} model Resource path: articles, articles/42, articles/42/author, or articles/42/relationships/author
   * @param {RequestConfig} [config={}] Per-request options
   * @param {HeadersInit} [config.headers] Override default headers without changing client defaults
   * @param {JsonObject} [config.params] Encoded query parameters: include, fields, sort, page, filter and extension families.
   * @param {JsonApiDocument} [config.document] Ignored by this read method; use document on writes.
   * @param {FetchOptions} [config.fetchOptions] Native RequestInit overrides. Request options win over constructor defaults; generated method, headers and body remain authoritative. Use signal for cancellation.
   * @returns {Promise<KitsuNativeResponse>} Decoded document with HTTP details
   * @example
   * await api.get('articles', {
   *   headers: { 'Accept-Language': 'en' },
   *   params: { include: 'author', fields: { articles: 'title,author' }, sort: '-createdAt', page: { number: 2, size: 10 }, filter: { title: 'Bread' } },
   *   fetchOptions: { cache: 'no-store', signal: new AbortController().signal }
   * })
   */
  get<T = any>(model: string, config: RequestConfig = {}): Promise<KitsuNativeResponse<T>> {
    try {
      const [resource, id, relationship, subRelationship] = model.split('/')
      let url = this.plural(this.resCase(resource))
      if (id) url += `/${id}`
      if (relationship) url += `/${this.resCase(relationship)}`
      if (subRelationship) url += `/${this.resCase(subRelationship)}`
      return this.request({ ...config, method: 'GET', url })
    } catch (error) {
      return Promise.reject(error)
    }
  }

  /**
   * Update a resource or replace relationship linkage. Alias: update.
   * @param {string} model Resource or relationship path. With a bare resource name, body.id is appended to the URL.
   * @param {(JsonObject|Array<JsonObject>|null)} body Flat resources or relationship identifiers. Use null to clear to-one linkage at a relationship endpoint.
   * @param {RequestConfig} [config={}] Per-request options
   * @param {HeadersInit} [config.headers] Override default headers without changing client defaults
   * @param {JsonObject} [config.params] Encoded query parameters: include, fields, sort, page, filter and extension families.
   * @param {JsonApiDocument} [config.document] Extra write document members: meta, links, jsonapi, included and extensions. No data or errors. Ignored by bodyless resource DELETE.
   * @param {FetchOptions} [config.fetchOptions] Native RequestInit overrides. Request options win over constructor defaults; generated method, headers and body remain authoritative. Use signal for cancellation.
   * @returns {Promise<KitsuNativeResponse>} Decoded response with HTTP details
   * @example <caption>Resource and document metadata</caption>
   * await api.patch('articles', {
   *   id: '42', title: 'Moonlight Bread', $: { meta: { editable: true } }
   * }, { document: { meta: { requestId: 'demo-42' } } })
   * @example <caption>Clear relationships</caption>
   * await api.patch('articles/42/relationships/author', null)
   * await api.patch('articles/42/relationships/tags', [])
   */
  patch<T = any>(
    model: string,
    body: JsonObject | JsonObject[] | null,
    config: RequestConfig = {},
  ): Promise<KitsuNativeResponse<T>> {
    try {
      const [resource, url] = this.#model(model)
      const type =
        (body as JsonObject)?.type ||
        (model.split('/').length === 2 ? model.split('/')[0] : resource)
      const path =
        !model.includes('/') && (body as JsonObject)?.id !== undefined
          ? `${url}/${encodeURIComponent(String((body as JsonObject).id))}`
          : url
      return this.request({
        ...config,
        method: 'PATCH',
        url: path,
        type,
        body,
        relationship: model.includes('/relationships/'),
      })
    } catch (error) {
      return Promise.reject(error)
    }
  }

  /**
   * Create resources or add relationship linkage. Alias: create. Resource arrays require server support; no Atomic Operations processing.
   * @param {string} model Resource or relationship path
   * @param {(JsonObject|Array<JsonObject>|null)} body Flat resources or relationship identifiers; full related resources generate included
   * @param {RequestConfig} [config={}] Per-request options
   * @param {HeadersInit} [config.headers] Override default headers without changing client defaults
   * @param {JsonObject} [config.params] Encoded query parameters: include, fields, sort, page, filter and extension families.
   * @param {JsonApiDocument} [config.document] Extra write document members: meta, links, jsonapi, included and extensions. No data or errors. Ignored by bodyless resource DELETE.
   * @param {FetchOptions} [config.fetchOptions] Native RequestInit overrides. Request options win over constructor defaults; generated method, headers and body remain authoritative. Use signal for cancellation.
   * @returns {Promise<KitsuNativeResponse>} Decoded response with HTTP details
   * @example
   * await api.post('articles', { title: 'Moonlight Bread', author: { type: 'people', id: '9' } }, {
   *   document: { meta: { requestId: 'demo-42' } }
   * })
   * await api.post('articles/42/relationships/tags', [{ type: 'tags', id: '3' }])
   */
  post<T = any>(
    model: string,
    body: JsonObject | JsonObject[] | null,
    config: RequestConfig = {},
  ): Promise<KitsuNativeResponse<T>> {
    try {
      const [type, url] = this.#model(model)
      return this.request({
        ...config,
        method: 'POST',
        type,
        url,
        body,
        relationship: model.includes('/relationships/'),
      })
    } catch (error) {
      return Promise.reject(error)
    }
  }

  /**
   * Delete a resource or remove relationship identifiers. Alias: remove. Resource DELETE sends no body.
   * Relationship DELETE sends identifiers without appending their IDs to the URL. Legacy bulk resource DELETE requires server support.
   * @param {string} model Resource name or relationship path. For a resource, pass its ID separately.
   * @param {(string|number|Array<(string|number)>)} id Resource ID, including 0, or IDs for relationship/bulk deletion
   * @param {RequestConfig} [config={}] Per-request options
   * @param {HeadersInit} [config.headers] Override default headers without changing client defaults
   * @param {JsonObject} [config.params] Encoded query parameters: include, fields, sort, page, filter and extension families.
   * @param {JsonApiDocument} [config.document] Extra write document members: meta, links, jsonapi, included and extensions. No data or errors. Ignored by bodyless resource DELETE.
   * @param {FetchOptions} [config.fetchOptions] Native RequestInit overrides. Request options win over constructor defaults; generated method, headers and body remain authoritative. Use signal for cancellation.
   * @returns {Promise<KitsuNativeResponse>} Decoded response; empty responses retain HTTP details
   * @example
   * await api.delete('articles', '42') // DELETE /articles/42; no body
   * await api.delete('articles/42/relationships/tags', ['3'], { document: { meta: { requestId: 'demo-42' } } })
   * // DELETE /articles/42/relationships/tags; body: { data: [{ type: 'tags', id: '3' }] }
   */
  delete<T = any>(
    model: string,
    id: string | number | (string | number)[],
    config: RequestConfig = {},
  ): Promise<KitsuNativeResponse<T>> {
    try {
      const [type, url] = this.#model(model)
      if (id === undefined || id === null)
        throw new Error(`DELETE requires an ID for the ${type} type`)
      const bulk = Array.isArray(id)
      const relationship = model.includes('/relationships/')
      const path = bulk || relationship ? url : `${url}/${encodeURIComponent(String(id))}`
      if (bulk && !relationship) {
        // Legacy bulk DELETE is supported by kitsu, separately from resource DELETE.
        return this.#send(
          { ...config, method: 'DELETE', url: path },
          serialise(
            type,
            id.map((id) => ({ id })),
            'DELETE',
            {
              camelCaseTypes: this.camel,
              attributeCase: this.#attributeCase,
              pluralTypes: this.plural,
              document: config.document,
            },
          ),
        )
      }
      return this.request({
        ...config,
        method: 'DELETE',
        type,
        url: path,
        relationship,
        body: relationship ? (bulk ? id : [id]).map((id) => ({ id })) : undefined,
      })
    } catch (error) {
      return Promise.reject(error)
    }
  }

  /**
   * Fetch the first authenticated user. Server must support filter[self]=true; supplied filter is replaced.
   * @param {RequestConfig} [config={}] Per-request options
   * @param {HeadersInit} [config.headers] Override default headers without changing client defaults
   * @param {JsonObject} [config.params] Encoded query parameters: include, fields, sort, page, filter and extension families. self() replaces filter with { self: true }.
   * @param {JsonApiDocument} [config.document] Ignored by this read method; use document on writes.
   * @param {FetchOptions} [config.fetchOptions] Native RequestInit overrides. Request options win over constructor defaults; generated method, headers and body remain authoritative. Use signal for cancellation.
   * @returns {Promise<KitsuNativeResponse>} First user with HTTP details
   * @example
   * const result = await api.self({ headers: { Authorization: 'Bearer bakery-demo-token' }, params: { fields: { users: 'name' } } })
   * console.log(result.data?.name)
   */
  async self<T = any>(config: RequestConfig = {}): Promise<KitsuNativeResponse<T>> {
    const response = await this.get<any[]>('users', {
      ...config,
      params: { ...config.params, filter: { self: true } },
    })
    return { ...response, data: response.data?.[0] }
  }

  /**
   * Send an arbitrary JSON:API request without generated URL casing or pluralization.
   * @param {ArbitraryRequest} config Request options; inherits all RequestConfig members
   * @param {string} config.url Relative or absolute URL, used as supplied
   * @param {string} [config.method='GET'] HTTP method, case-insensitive; commonly GET, POST, PATCH or DELETE
   * @param {string} [config.type] Encoding type, required for nonempty resource input even when body contains type; omitted for bodyless requests, null or empty linkage
   * @param {(JsonObject|Array<JsonObject>|null)} [config.body={}] Flat data or relationship identifiers. GET and resource DELETE send no body.
   * @param {boolean} [config.relationship] Encode primary data as identifiers. Defaults to whether url contains /relationships/.
   * @param {HeadersInit} [config.headers] Per-request header overrides
   * @param {JsonObject} [config.params] Query parameters, including nested JSON:API families and extension parameters
   * @param {JsonApiDocument} [config.document] Additional document members for body-bearing requests; no data or errors
   * @param {FetchOptions} [config.fetchOptions] Native RequestInit overrides. Request options win over constructor defaults; generated method, headers and body remain authoritative. Use signal for cancellation.
   * @returns {Promise<KitsuNativeResponse>} Decoded document with HTTP details
   * @example <caption>Custom relationship endpoint</caption>
   * await api.request({
   *   method: 'PATCH', url: 'articles/42/byline', type: 'people', relationship: true,
   *   body: { id: '9' }, headers: { 'Accept-Language': 'en' }, params: { include: 'author' },
   *   document: { meta: { requestId: 'demo-42' } },
   *   fetchOptions: { credentials: 'include' }
   * })
   * @example <caption>Bodyless resource DELETE</caption>
   * await api.request({ method: 'DELETE', url: 'articles/42' })
   */
  request<T = any>(config: ArbitraryRequest): Promise<KitsuNativeResponse<T>> {
    try {
      const method = config.method?.toUpperCase() || 'GET'
      const relationship = config.relationship ?? config.url.includes('/relationships/')
      const document =
        method === 'GET' || (method === 'DELETE' && !relationship)
          ? undefined
          : serialise(config.type, config.body, method, {
              camelCaseTypes: this.camel,
              attributeCase: this.#attributeCase,
              pluralTypes: this.plural,
              document: config.document,
              relationship,
            })
      return this.#send(config, document, method)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  #model(model: string): [string, string] {
    return model.includes('/')
      ? splitModel(model)
      : splitModel(model, { resourceCase: this.resCase, pluralModel: this.plural })
  }

  async #send<T>(
    config: ArbitraryRequest,
    document?: JsonObject,
    method = config.method,
  ): Promise<KitsuNativeResponse<T>> {
    let url = /^(?:[a-z][a-z\d+.-]*:)?\/\//i.test(config.url)
      ? config.url
      : `${this.#baseURL.replace(/\/$/, '')}/${config.url.replace(/^\//, '')}`
    if (config.params) {
      const parameters = this.query(config.params)
      if (parameters) url += `${url.includes('?') ? '&' : '?'}${parameters}`
    }
    // Fetch snapshots Headers when creating its Request. Copy only when merging overrides.
    const headers = config.headers ? new Headers(this.headers) : this.headers
    if (config.headers)
      new Headers(config.headers).forEach((value, name) => headers.set(name, value))
    const options: RequestInit = {
      ...this.#fetchOptions,
      ...config.fetchOptions,
      method,
      headers,
      body: document === undefined ? undefined : JSON.stringify(document),
    }
    const callerSignal = options.signal
    const controller = this.#timeout > 0 ? new AbortController() : undefined
    const signal = controller
      ? callerSignal
        ? AbortSignal.any([callerSignal, controller.signal])
        : controller.signal
      : callerSignal
    const timer = controller
      ? setTimeout(
          () => controller.abort(new DOMException('Request timed out', 'TimeoutError')),
          this.#timeout,
        )
      : undefined
    options.signal = signal
    try {
      const response = await this.#transport(url, options)
      let body: any
      try {
        if (response.status !== 204 && response.status !== 205 && response.body !== null) {
          if (response.status === 202) {
            const text = await response.text()
            if (text) body = JSON.parse(text)
          } else body = await response.json()
        }
      } catch (cause) {
        if (!(cause instanceof SyntaxError)) throw cause
        throw new KitsuNativeError('Invalid JSON response', response, undefined, { cause })
      }
      if (!response.ok)
        throw new KitsuNativeError(
          `HTTP ${response.status}${response.statusText ? ` ${response.statusText}` : ''}`,
          response,
          body,
        )
      const decoded = deserialise(body, {
        hoistData: this.hoistData,
        attributeCase: this.#attributeCase ? camel : undefined,
      })
      return {
        ...(decoded === null || Array.isArray(decoded) ? { data: decoded } : decoded),
        status: response.status,
        ...(response.headers.keys().next().done ? {} : { headers: response.headers }),
      }
    } finally {
      if (timer !== undefined) clearTimeout(timer)
    }
  }
}

export type * from './types.js'
export { KitsuNativeError } from './types.js'
