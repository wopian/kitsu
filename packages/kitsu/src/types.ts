import type { AxiosRequestConfig } from 'axios'
import type { JsonObject } from 'kitsu-core'

export interface RequestConfig {
  headers?: JsonObject
  params?: JsonObject
  axiosOptions?: AxiosRequestConfig
}
export interface KitsuOptions extends RequestConfig {
  baseURL?: string
  query?: 'traditional' | 'modern' | ((params?: JsonObject) => string)
  camelCaseTypes?: boolean
  resourceCase?: 'kebab' | 'snake' | 'none'
  pluralize?: boolean
  timeout?: number
  hoistData?: boolean
}
export interface ArbitraryRequest extends RequestConfig {
  url: string
  type?: string
  body?: JsonObject | JsonObject[] | null
  method?: string
}
export interface KitsuResponse<T = any> {
  data?: T
  status?: number
  headers?: JsonObject
  links?: JsonObject
  meta?: JsonObject
  [attribute: string]: any
}
