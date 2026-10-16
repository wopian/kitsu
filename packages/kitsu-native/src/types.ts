import type { JsonApiDocument, JsonApiError, JsonObject } from 'kitsu-core'

/** Native RequestInit excluding method, headers and body. Includes credentials (omit, same-origin, include), cache (default, no-store, reload, no-cache, force-cache, only-if-cached), redirect (follow, error, manual), mode (cors, no-cors, same-origin, navigate), signal, integrity, keepalive, referrer, referrerPolicy and other platform RequestInit fields. Omitted fields use Fetch defaults. Request fields shallowly override constructor fields.
 * @example
 * const options: FetchOptions = { credentials: 'include', cache: 'no-store', redirect: 'error', signal: new AbortController().signal }
 */
export type FetchOptions = Omit<RequestInit, 'method' | 'headers' | 'body'>
/** Per-request options. headers and transport options also configure constructor defaults. params and document apply only per request.
 * @example
 * const config: RequestConfig = { params: { include: 'author' }, fetchOptions: { cache: 'no-store' } }
 */
export interface RequestConfig {
  /** Extra top-level members for writes: meta, links, jsonapi, included and extensions. Default: none. included contains wire resources. Generated data cannot be replaced; data and errors throw. Ignored by GET and bodyless resource DELETE. Constructor document is not applied.
   * @example
   * { meta: { requestId: 'demo-42' }, jsonapi: { version: '1.1' } }
   */
  document?: Omit<JsonApiDocument, 'data'>
  /** Request headers as Headers, a name/value object, or pairs. Default: client headers. Request values override matching defaults without changing client defaults. Accept and Content-Type initially use application/vnd.api+json; media parameters and Accept alternatives are retained.
   * @example
   * { Authorization: 'Bearer bakery-demo-token' }
   */
  headers?: RequestInit['headers']
  /** Query parameters, including include, fields, sort, page, filter and extension families. Default: none. Encoded by the selected query serializer. Empty include and field strings are retained. Constructor params are not applied.
   * @example
   * { include: 'author', fields: { articles: 'title,author' }, sort: '-createdAt', page: { number: 2, size: 10 }, filter: { title: 'Bread' } }
   */
  params?: JsonObject
  /** Native RequestInit defaults or per-request overrides. Default: none. Request options shallowly override constructor options. method, headers and body are generated afterward and cannot be supplied here. A request signal replaces the default signal and combines with the timeout.
   * @example
   * { credentials: 'include', cache: 'no-store', signal: new AbortController().signal }
   */
  fetchOptions?: FetchOptions
}
/** Client defaults, including inherited headers and transport options from RequestConfig. Inherited params and document are accepted by the type but ignored by the constructor; pass them per request.
 * @example
 * const options: KitsuNativeOptions = { baseURL: 'https://bakery.example/api', attributeCase: 'kebab', timeout: 10000 }
 */
export interface KitsuNativeOptions extends RequestConfig {
  /** API base URL for relative paths. Default: https://kitsu.app/api/edge.
   * @example
   * 'https://bakery.example/api'
   */
  baseURL?: string
  /** Query serializer. Default: 'traditional' repeats array keys. 'modern' uses bracketed keys (tag[]). A callback receives parameters and returns an encoded query string without ?. No parameter casing conversion.
   * @example
   * (params) => new URLSearchParams({ title: String(params?.title ?? '') }).toString()
   */
  query?: 'traditional' | 'modern' | ((params?: JsonObject) => string)
  /** Convert inferred outgoing resource types from kebab-case or snake_case to camelCase. Default: true. Does not change decoded types.
   * @example
   * false
   */
  camelCaseTypes?: boolean
  /** Generated resource URL case. Default: 'kebab' (library-entries). 'snake' gives library_entries; 'none' keeps libraryEntries. Explicit request() URLs are unchanged.
   * @example
   * 'snake'
   */
  resourceCase?: 'kebab' | 'snake' | 'none'
  /** Attribute wire case. Default: 'none' keeps names unchanged. 'kebab' or 'snake' encodes that case and decodes camelCase. Nested JSON, relationships, metadata, extension attributes and queries stay unchanged. Converted name collisions throw TypeError.
   * @example
   * 'kebab'
   */
  attributeCase?: 'kebab' | 'snake' | 'none'
  /** Pluralize generated resource URLs and inferred outgoing types. Default: true. Disable for APIs using singular names.
   * @example
   * false
   */
  pluralize?: boolean
  /** Request timeout in milliseconds. Default: 30000. Set 0 to disable. Caller cancellation and timeout both cancel the request; timer is cleared after completion.
   * @example
   * 10000
   */
  timeout?: number
  /** Unwrap a single-resource document containing only data. Default: false. Resource metadata stays in $. Document meta, links, jsonapi or included keep the wrapper. HTTP arrays and null stay under data.
   * @example
   * true
   */
  hoistData?: boolean
  /** Injected Fetch-compatible transport. Default: globalThis.fetch. Keep the Fetch signature and return a Promise<Response>. Does not replace api.fetch, which remains a get alias.
   * @example
   * (input, init) => globalThis.fetch(input, init)
   */
  fetch?: typeof globalThis.fetch
}
/** Arbitrary request options plus all RequestConfig fields. Generated JSON:API bodies use flat resources and direct relationship values.
 * @example
 * const request: ArbitraryRequest = { method: 'PATCH', url: 'articles/42', type: 'articles', body: { id: '42', title: 'Moonlight Bread' } }
 */
export interface ArbitraryRequest extends RequestConfig {
  /** Encode the body as relationship identifiers. Default: whether url contains /relationships/. Set explicitly for custom relationship endpoints. Direct values control linkage.
   * @example
   * true
   */
  relationship?: boolean
  /** Relative or absolute URL. Required. Used as supplied; resourceCase and pluralize do not rewrite this URL.
   * @example
   * 'articles/42/relationships/author'
   */
  url: string
  /** Resource type for encoding the body. May be omitted when the body supplies type. Not needed for bodyless GET or resource DELETE.
   * @example
   * 'people'
   */
  type?: string
  /** Flat resource, array of resources, or null for to-one relationship clearing. Default: empty data on body-bearing requests. GET and resource DELETE send no body. Put resource metadata under $; document metadata belongs in document.
   * @example
   * { type: 'articles', id: '42', title: 'Moonlight Bread', $: { meta: { editable: true } } }
   */
  body?: JsonObject | JsonObject[] | null
  /** HTTP method, case-insensitive. Default: GET. Common values are GET, POST, PATCH and DELETE; other method strings are passed to the transport.
   * @example
   * 'PATCH'
   */
  method?: string
}
/** Decoded JSON:API document with HTTP details. T describes primary data, not the surrounding document.
 * @example
 * const result: KitsuNativeResponse<{ title: string }> = { status: 200, data: { title: 'Moonlight Bread' } }
 */
export interface KitsuNativeResponse<T = any> {
  /** Decoded primary data with flat attributes and direct relationships. Absent after single-resource hoisting or for empty responses.
   * @example
   * { type: 'articles', id: '42', title: 'Moonlight Bread' }
   */
  data?: T
  /** HTTP response status, including empty 202/204 responses.
   * @example
   * 200
   */
  status: number
  /** Native response Headers, omitted when empty. Read values with headers.get(name).
   * @example
   * new Headers({ 'content-type': 'application/vnd.api+json' })
   */
  headers?: Headers
  /** Document links beside data. Resource links live under resource.$.links.
   * @example
   * { next: '/articles?page[number]=2' }
   */
  links?: JsonObject
  /** Document metadata beside data. Resource metadata lives under resource.$.meta.
   * @example
   * { total: 42 }
   */
  meta?: JsonObject
  /** Other decoded document members, such as included, jsonapi, errors and extension members. With hoistData enabled, single-resource fields can appear here.
   * @example
   * { jsonapi: { version: '1.1' } }
   */
  [attribute: string]: any
}

/** HTTP and JSON parsing failures retain the original fetch response and JSON:API document.
 *
 * @param {string} message Error message
 * @param {Response} response Original native Fetch response, including HTTP status and headers
 * @param {JsonApiDocument} [document] Parsed JSON:API error document, when available
 * @param {ErrorOptions} [options] Native Error constructor options
 * @param {*} [options.cause] Underlying cause, such as the SyntaxError from an invalid JSON response
 * @property {number} status HTTP status copied from response
 * @property {Headers} headers Native response headers
 * @property {Array<JsonApiError>} [errors] JSON:API errors from document.errors
 * @property {Response} response Original native Fetch response
 * @property {JsonApiDocument} [document] Parsed error document, including document metadata
 * @example <caption>Handle HTTP and response-parsing errors</caption>
 * import Kitsu, { KitsuNativeError } from 'kitsu-native'
 * const api = new Kitsu({ baseURL: 'https://bakery.example/api' })
 * try {
 *   await api.get('articles/42')
 * } catch (error) {
 *   if (error instanceof KitsuNativeError) {
 *     console.log(error.status, error.headers.get('content-type'))
 *     console.log(error.errors, error.document?.meta, error.cause)
 *   } else {
 *     throw error // Native network and abort errors propagate unchanged.
 *   }
 * }
 * @example <caption>Preserve a parsing cause</caption>
 * const response = new Response('invalid JSON', { status: 200 })
 * const error = new KitsuNativeError('Invalid JSON response', response, undefined, {
 *   cause: new SyntaxError('Invalid JSON')
 * })
 */
export class KitsuNativeError extends Error {
  /** HTTP status copied from response.
   * @example 422
   */
  readonly status: number
  /** Native Headers from response, without conversion to a plain object.
   * @example error.headers.get('content-type')
   */
  readonly headers: Headers
  /** JSON:API errors from document.errors, absent for malformed JSON.
   * @example [{ status: '422', source: { header: 'Accept' } }]
   */
  readonly errors?: JsonApiError[]
  constructor(
    message: string,
    readonly response: Response,
    readonly document?: JsonApiDocument,
    options?: ErrorOptions,
  ) {
    super(message, options)
    this.name = 'KitsuNativeError'
    this.status = response.status
    this.headers = response.headers
    this.errors = document?.errors
  }
}
