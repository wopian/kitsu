/**
 * Formats a single URL query
 *
 * @param {string} value Right-hand side of the query
 * @param {string} key Left-hand side of the query
 * @returns {string} URL query string
 * @private
 */
function queryFormat(value, key) {
  if (value !== null && Array.isArray(value))
    return value.map(v => queryFormat(v, key)).join('&')
  else if (value !== null && typeof value === 'object') return query(value, key)
  else return encodeURIComponent(key) + '=' + encodeURIComponent(value)
}

/**
 * Constructs a URL query string for JSON:API parameters
 *
 * @param {Object} [params] Parameters to parse
 * @param {string} [prefix] Prefix for nested parameters - used internally
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
export function query(parameters, prefix = null) {
  const string_ = []

  for (const parameter in parameters) {
    string_.push(
      queryFormat(
        parameters[parameter],
        prefix ? `${prefix}[${parameter}]` : parameter
      )
    )
  }
  return string_.join('&')
}
