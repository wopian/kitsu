import kebab from 'decamelize'
import plural from 'pluralize'
import { serialise } from '../util'

export default async function (model, id) {
  try {
    console.log(await serialise(model, { id }, 'DELETE'))
    if (!this.axios.defaults.headers.Authorization) throw new Error('Not logged in')
    let { data } = await this.axios.delete(`${plural(kebab(model))}/${id}`, {
      data: (await serialise(model, { id }, 'DELETE')).data
    })
    return data
  } catch (error) {
    const e = error.response.data
    return e.errors ? e.errors : e
  }
}
