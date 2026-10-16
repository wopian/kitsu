import type { AxiosRequestConfig } from 'axios'
import type { JsonApiDocument, JsonObject } from 'kitsu-core'

/** Per-request options. headers and transport options also configure constructor defaults. params and document apply only per request.
 * @example
 * const config: RequestConfig = { params: { include: 'author' }, axiosOptions: { withCredentials: true } }
 */
export interface RequestConfig {
  /** Extra top-level members for writes: meta, links, jsonapi, included and extensions. Default: none. included contains wire resources. Generated data cannot be replaced; data and errors throw. Ignored by GET and bodyless resource DELETE. Constructor document is not applied.
   * @example
   * { meta: { requestId: 'demo-42' }, jsonapi: { version: '1.1' } }
   */
  document?: Omit<JsonApiDocument, 'data'>
  /** Header name/value object. Default: client headers. Request values merge over client headers. Accept and Content-Type initially use application/vnd.api+json; media parameters and Accept alternatives are retained.
   * @example
   * { Authorization: 'Bearer bakery-demo-token' }
   */
  headers?: JsonObject
  /** Query parameters, including include, fields, sort, page, filter and extension families. Default: none. Encoded by the selected query serializer. Empty include and field strings are retained. Constructor params are not applied.
   * @example
   * { include: 'author', fields: { articles: 'title,author' }, sort: '-createdAt', page: { number: 2, size: 10 }, filter: { title: 'Bread' } }
   */
  params?: JsonObject
  /** AxiosRequestConfig passed to Axios. Default: none. Constructor options override generated Axios defaults; request options override generated headers and params, and request() method, url and data. Use signal for cancellation or timeout: 0 to disable Axios timeout. Legacy self() forwards this object as outer get configuration; use get() for transport overrides.
   * @example
   * { withCredentials: true, timeout: 10000, signal: new AbortController().signal }
   */
  axiosOptions?: AxiosRequestConfig
}
/** Client defaults, including inherited headers and transport options from RequestConfig. Inherited params and document are accepted by the type but ignored by the constructor; pass them per request.
 * @example
 * const options: KitsuOptions = { baseURL: 'https://bakery.example/api', attributeCase: 'kebab', timeout: 10000 }
 */
export interface KitsuOptions extends RequestConfig {
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
  /** Axios timeout in milliseconds. Default: 30000. A top-level 0 also selects the default; set axiosOptions.timeout to 0 to disable. Request axiosOptions.timeout overrides this default.
   * @example
   * 10000
   */
  timeout?: number
  /** Unwrap a single-resource document containing only data. Default: false. Resource metadata stays in $. Document meta, links, jsonapi or included keep the wrapper. HTTP arrays and null stay under data.
   * @example
   * true
   */
  hoistData?: boolean
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
 * const result: KitsuResponse<{ title: string }> = { status: 200, data: { title: 'Moonlight Bread' } }
 */
export interface KitsuResponse<T = any> {
  /** Decoded primary data with flat attributes and direct relationships. Absent after single-resource hoisting or for empty responses.
   * @example
   * { type: 'articles', id: '42', title: 'Moonlight Bread' }
   */
  data?: T
  /** HTTP response status from resource methods and request(). Legacy self() returns only data and headers.
   * @example
   * 200
   */
  status?: number
  /** Axios response headers, omitted when empty.
   * @example
   * { 'content-type': 'application/vnd.api+json' }
   */
  headers?: JsonObject
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
