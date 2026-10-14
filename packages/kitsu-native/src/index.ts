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

/** JSON:API client using native fetch, with kitsu resource methods and aliases.
 *
 * @param {Object} [options] Client options; fetch defaults to globalThis.fetch
 * @example
 * const api = new KitsuNative({ baseURL: 'https://kitsu.app/api/edge' })
 * const response = await api.get('anime')
 */
export default class KitsuNative {
  query: (params?: JsonObject) => string
  camel: (value: string) => string
  resCase: (value: string) => string
  plural: typeof pluralise
  headers: Headers
  hoistData: boolean
  fetch: KitsuNative['get']
  update: KitsuNative['patch']
  create: KitsuNative['post']
  remove: KitsuNative['delete']
  #transport: typeof globalThis.fetch
  #baseURL: string
  #timeout: number
  #fetchOptions?: FetchOptions
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
    this.#fetchOptions = options.fetchOptions
    this.#transport = options.fetch ?? globalThis.fetch
    this.fetch = this.get
    this.update = this.patch
    this.create = this.post
    this.remove = this.delete
  }

  /** Fetch resources.
   * @param {string} model Resource path
   * @param {Object} [config] Request options
   * @returns {Promise<Object>} Decoded document with HTTP status and headers */
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

  /** Update resources or relationship linkage.
   * @param {string} model Resource path
   * @param {Object|Object[]|null} body Flat resources or identifiers
   * @param {Object} [config] Request options
   * @returns {Promise<Object>} Decoded response */
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

  /** Create resources or add relationship linkage.
   * @param {string} model Resource path
   * @param {Object|Object[]|null} body Flat resources or identifiers
   * @param {Object} [config] Request options
   * @returns {Promise<Object>} Decoded response */
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

  /** Delete resources or remove relationship identifiers.
   * @param {string} model Resource path
   * @param {string|number|Array} id Resource identifiers
   * @param {Object} [config] Request options
   * @returns {Promise<Object>} Decoded response */
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
            { camelCaseTypes: this.camel, pluralTypes: this.plural, document: config.document },
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

  /** Fetch authenticated user.
   * @param {Object} [config] Request options
   * @returns {Promise<Object>} First user with HTTP metadata */
  async self<T = any>(config: RequestConfig = {}): Promise<KitsuNativeResponse<T>> {
    const response = await this.get<any[]>('users', {
      ...config,
      params: { ...config.params, filter: { self: true } },
    })
    return { ...response, data: response.data?.[0] }
  }

  /** Send an arbitrary JSON:API request.
   * @param {Object} config Request, document and fetch options
   * @returns {Promise<Object>} Decoded document with HTTP status and headers */
  request<T = any>(config: ArbitraryRequest): Promise<KitsuNativeResponse<T>> {
    try {
      const method = config.method?.toUpperCase() || 'GET'
      const relationship = config.relationship ?? config.url.includes('/relationships/')
      const document =
        method === 'GET' || (method === 'DELETE' && !relationship)
          ? undefined
          : serialise(config.type, config.body, method, {
              camelCaseTypes: this.camel,
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
      const decoded = deserialise(body, { hoistData: this.hoistData })
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
