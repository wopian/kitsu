/**
 * Constructs a URL query string for JSON:API parameters
 *
 * @param {Object} params Parameters to parse
 * @param {string} prefix Prefix for nested parameters - used internally (default `null`)
 * @returns {string} URL query string
 */

export function query (params, prefix = null) {
  const str = []

  for (const p in params) {
    if (params.hasOwnProperty(p)) {
      const k = prefix ? `${prefix}[${p}]` : p
      const v = params[p]
      str.push((v !== null && typeof v === 'object')
        ? query(v, k)
        : encodeURIComponent(k) + '=' + encodeURIComponent(v)
      )
    }
  }
  return str.join('&')
}
