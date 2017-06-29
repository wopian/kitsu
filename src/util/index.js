export const errorHandler = err => {
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

export const filterIncludes = async (included, { id, type }) => {
  return included.filter(async obj => {
    await linkRelationships([obj], included)
    return obj.id === id && obj.type === type
  })
}

export const linkRelationships = async (data, included) => {
  try {
    const { attributes, relationships } = data

    for (let key in relationships) {
      if (relationships[key].data && relationships[key].data.constructor === Array) {
        for (let { id, type } of relationships[key].data) {
          if (!attributes[type]) attributes[type] = []
          attributes[type].push((await filterIncludes(included, { id, type }))[0])
        }
      } else if (relationships[key].data) {
        const { id, type } = relationships[key].data
        if (!attributes[type]) attributes[type] = (await filterIncludes(included, { id, type }))[0]
        delete attributes[type].relationships
      }
    }

    delete data.relationships
  } catch (err) {
    console.log(err)
  }
}
