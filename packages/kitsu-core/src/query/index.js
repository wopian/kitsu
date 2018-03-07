function deObject (obj, param) {
  let query = ''
  for (let key in obj) {
    let value = obj[key]
    if (param) query += `&${param}`
    if (typeof value === 'object') query += `[${key}]${deObject(value)}`
    else query += `[${key}]=${value}`
  }
  return query
}

/**
 * Constructs a URL query string for JSON:API parameters
 *
 * @param {Object} params Parameters to parse
 * @param {boolean} prefix Prefix returned string with `?` (default `false`)
 * @returns {string} URL query string
 */
export function query (params, prefix = false) {
  let query = ''
  for (let param in params) {
    let value = params[param]
    if (typeof value === 'object') query += deObject(value, param)
    else query += `&${param}=${value}`
  }
  query = query.slice(1)
  return params ? (prefix ? `?${query}` : query) : ''
}
