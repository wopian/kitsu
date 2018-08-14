/**
 * Formats a single URL query
 *
 * @param {string} value Right-hand side of the query
 * @param {string} key Left-hand side of the query
 * @returns {string} URL query string
 */
function queryFormat (value, key) {
  if (value !== null && typeof value === 'object') return query(value, key)
  else return encodeURIComponent(key) + '=' + encodeURIComponent(value)
}

/**
 * Constructs a URL query string for JSON:API parameters
 *
 * @param {Object} params Parameters to parse
 * @param {string} prefix Prefix for nested parameters - used internally (default `null`)
 * @returns {string} URL query string
 */
export function query (params, prefix = null) {
  const str = []

  for (const param in params) {
    if (params.hasOwnProperty(param)) {
      str.push(
        queryFormat(params[param], prefix ? `${prefix}[${param}]` : param)
      )
    }
  }
  return str.join('&')
}
