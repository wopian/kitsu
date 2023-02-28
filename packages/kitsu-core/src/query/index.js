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
function queryFormat (value, key, traditional) {
  if (traditional && value !== null && Array.isArray(value)) return value.map(v => queryFormat(v, key, traditional)).join('&')
  if (!traditional && value !== null && Array.isArray(value)) return value.map(v => queryFormat(v, `${key}[]`, traditional)).join('&')
  else if (value !== null && typeof value === 'object') return query(value, key, traditional)
  else return encodeURIComponent(key) + '=' + encodeURIComponent(value)
}

/**
 * Formats key names to correct array syntax
 *
 * @param {string} [param] Parameter name to parse
 *
 * @returns {string} Key name in nested query-param format with optional array style suffix
 * @private
 */
export function paramKeyName (param) {
  if ([ '[]', '][' ].includes(param.slice(-2))) {
    return `[${param.slice(0, -2)}][]`
  }

  return `[${param}]`
}

/**
 * Constructs a URL query string for JSON:API parameters
 *
 * @param {Object} [params] Parameters to parse
 * @param {string} [prefix] Prefix for nested parameters - used internally
 * @param {boolean} [traditional=true] Use the traditional (default) or modern param serializer. Set to false if your server is running Ruby on Rails or other modern web frameworks
 * @returns {string} URL query string
 *
 * @example
 * query({
 *   filter: {
 *     slug: 'cowboy-bebop',
 *     title: {
 *       value: 'foo'
 *     }
 *   }
 *  sort: '-id'
 * })
 * // filter%5Bslug%5D=cowboy-bebop&filter%5Btitle%5D%5Bvalue%5D=foo&sort=-id
 */

export function query (params, prefix = null, traditional = true) {
  const str = []

  for (const param in params) {
    str.push(
      queryFormat(params[param], prefix ? `${prefix}${paramKeyName(param)}` : param, traditional)
    )
  }
  return str.join('&')
}
