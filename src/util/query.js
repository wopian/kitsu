/*
{
  page: {
    limit: 20,
    offset: 500
  },
  fields: {
    anime: 'canonicalTitle'
  }
  filter: {
    canonicalTitle: 'Cowboy Bebop'
  }
  sort: '-id',
  include: 'media'
}
*/
/**
 * Query builder for requests
 *
 * @param {Object} options Query parameters
 * @returns {String} A query parameter chain
 * @private
 */
export function query (opts) {
  try {
    let query = ''

    for (let param in opts) {
      if (typeof opts[param] === 'object') {
        Object.keys(opts[param]).forEach(value => {
          query += `&${param}[${value}]=${opts[param][value]}`
        })
      } else if (typeof opts[param] === 'string') {
        query += `&${param}=${opts[param]}`
      }
    }
    return opts ? '?' + query.slice(1) : ''
  } catch (e) {
    throw e
  }
}
