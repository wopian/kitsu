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
    if (typeof params[param] === 'object') {
      Object.keys(params[param]).forEach(value => {
        query += `&${param}[${value}]=${params[param][value]}`
      })
    } else query += `&${param}=${params[param]}`
  }
  return params ? (prefix ? query : query.slice(1)) : ''
}
