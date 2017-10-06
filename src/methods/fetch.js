import kebab from 'decamelize'
import { deserialise, query } from '../util'

export default async function (model, params) {
  try {
    let { data } = await this.axios.get(kebab(model), {
      params,
      paramsSerializer: a => query(a)
    })
    return deserialise(data)
  } catch (error) {
    const { data } = error
    if (data) return data
    else throw error
  }
}
