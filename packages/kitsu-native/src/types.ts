import type { JsonApiDocument, JsonApiError, JsonObject } from 'kitsu-core'

export type FetchOptions = Omit<RequestInit, 'method' | 'headers' | 'body'>
export interface RequestConfig {
  document?: Omit<JsonApiDocument, 'data'>
  headers?: RequestInit['headers']
  params?: JsonObject
  fetchOptions?: FetchOptions
}
export interface KitsuNativeOptions extends RequestConfig {
  baseURL?: string
  query?: 'traditional' | 'modern' | ((params?: JsonObject) => string)
  camelCaseTypes?: boolean
  resourceCase?: 'kebab' | 'snake' | 'none'
  /** Attribute wire case; enabled modes decode camelCase. Default: none. */
  attributeCase?: 'kebab' | 'snake' | 'none'
  pluralize?: boolean
  timeout?: number
  hoistData?: boolean
  fetch?: typeof globalThis.fetch
}
export interface ArbitraryRequest extends RequestConfig {
  relationship?: boolean
  url: string
  type?: string
  body?: JsonObject | JsonObject[] | null
  method?: string
}
export interface KitsuNativeResponse<T = any> {
  data?: T
  status: number
  headers?: Headers
  links?: JsonObject
  meta?: JsonObject
  [attribute: string]: any
}

/** HTTP and JSON parsing failures retain the original fetch response and JSON:API document. */
export class KitsuNativeError extends Error {
  readonly status: number
  readonly headers: Headers
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
