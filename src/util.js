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
export const query = options => {
  let query = ''

  for (let param in options) {
    if (typeof options[param] === 'object') {
      Object.keys(options[param]).forEach(value => {
        query += `&${param}[${value}]=${options[param][value]}`
      })
    } else if (typeof options[param] === 'string') {
      query += `&${param}=${options[param]}`
    }
  }
  return options ? '?' + query.slice(1) : ''
}
