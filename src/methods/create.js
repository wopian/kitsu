import kebab from 'decamelize'
import plural from 'pluralize'
import { serialise } from '../util'

export default async function (model, body) {
  try {
    if (!this.axios.defaults.headers.Authorization) throw new Error('Not logged in')
    let { data } = await this.axios.post(plural(kebab(model)), {
      data: (await serialise(model, body)).data
    })
    return data
  } catch (error) {
    const e = error.response.data
    return e.errors ? e.errors : e
  }
}
