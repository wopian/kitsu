import kebab from 'decamelize'
import plural from 'pluralize'
import { deserialise, query } from '../util'

export default async function (model, params) {
  try {
    let { data } = await this.axios.get(plural(kebab(model)), {
      params,
      paramsSerializer: a => query(a)
    })
    return deserialise(data)
  } catch (error) {
    const e = error.response.data
    return e.errors ? e.errors : e
  }
}
