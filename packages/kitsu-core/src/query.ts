import type { JsonObject } from './types.js'

/**
 * Formats a single URL query
 *
 * @param {string} value Right-hand side of the query
 * @param {string} key Left-hand side of the query
 * @param {boolean} traditional use traditional array key serializer
 *
 * @returns {string} URL query string
 * @private
 */
function queryFormat(value: any, key: string, traditional: boolean): string {
  if (traditional && value !== null && Array.isArray(value))
    return value.map((v) => queryFormat(v, key, traditional)).join('&')
  if (!traditional && value !== null && Array.isArray(value))
    return value.map((v) => queryFormat(v, `${key}[]`, traditional)).join('&')
  else if (value !== null && typeof value === 'object') return query(value, key, traditional)
  else return new URLSearchParams([[key, String(value)]]).toString()
}

/**
 * Formats key names to correct array syntax
 *
 * @param {(string|null)} [param] Nested parameter name; null or undefined produces an empty string
 *
 * @returns {string} Key name in nested query-param format with optional array style suffix
 * @example
 * paramKeyName('title') // '[title]'
 * paramKeyName('tags[]') // '[tags][]'
 */
export function paramKeyName(param?: string | null): string {
  if (param === null || param === undefined) return ''

  if (['[]', ']['].includes(param.slice(-2))) {
    return `[${param.slice(0, -2)}][]`
  }

  return `[${param}]`
}

/**
 * Constructs a URL query string for JSON:API parameters
 *
 * @param {(JsonObject|null)} [params] Parameters, including nested include, fields, sort, page, filter and extension families
 * @param {string} [prefix] Prefix for nested parameters - used internally
 * @param {boolean} [traditional=true] true repeats array keys; false appends [] to array keys. Choose the convention accepted by your server.
 * @returns {string} URL query string
 *
 * @example
 * query({
 *   filter: {
 *     slug: 'cowboy-bebop',
 *     title: {
 *       value: 'foo'
 *     }
 *   },
 *  sort: '-id'
 * })
 * // filter%5Bslug%5D=cowboy-bebop&filter%5Btitle%5D%5Bvalue%5D=foo&sort=-id
 * @example <caption>Array modes and nested prefix</caption>
 * query({ tag: ['bread', 'cake'] }) // 'tag=bread&tag=cake'
 * query({ tag: ['bread', 'cake'] }, undefined, false) // 'tag%5B%5D=bread&tag%5B%5D=cake'
 * query({ title: 'Bread' }, 'filter') // 'filter%5Btitle%5D=Bread'
 * query({ include: '', fields: { articles: '' } }) // 'include=&fields%5Barticles%5D='
 */

export function query(
  params?: JsonObject | null,
  prefix: string | undefined = undefined,
  traditional = true,
): string {
  const str: string[] = []

  for (const param in params) {
    str.push(
      queryFormat(params[param], prefix ? `${prefix}${paramKeyName(param)}` : param, traditional),
    )
  }
  return str.join('&')
}
