/**
 * Error handler
 *
 * @param {*} err Error message
 * @returns {Object} An object containing the error details
 * @private
 */
export const errorHandler = err => {
  if (err.constructor === Object) {
    return {
      errors: [
        {
          title: err.statusMessage,
          detail: err.statusMessage,
          code: err.statusCode,
          status: err.statusCode
        }
      ]
    }
  } else console.error(err)
}

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
 * @param {Object} opts Query parameters
 * @returns {String} A query parameter chain
 * @private
 */
export const query = opts => {
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
}
