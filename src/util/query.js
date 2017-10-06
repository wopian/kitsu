export function query (params) {
  try {
    let query = ''

    for (let param in params) {
      if (typeof params[param] === 'object') {
        Object.keys(params[param]).forEach(value => {
          query += `&${param}[${value}]=${params[param][value]}`
        })
      } else if (typeof params[param] === 'string') {
        query += `&${param}=${params[param]}`
      }
    }

    return params ? query.slice(1) : ''
  } catch (error) {
    throw error
  }
}
