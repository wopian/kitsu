import kebab from 'decamelize'
import plural from 'pluralize'
import { serialise } from '../util'

export default async function (model, body) {
  try {
    if (!this.axios.defaults.headers.Authorization) throw new Error('Not logged in')
    if (typeof body.id === 'undefined') throw new Error('Updating a resource requires an ID')
    let { data } = await this.axios.patch(`${plural(kebab(model))}/${body.id}`, {
      data: await serialise(model, body, 'PATCH')
    })
    return data
  } catch (error) {
    const e = error.response.data
    return e.errors ? e.errors : e
  }
}
