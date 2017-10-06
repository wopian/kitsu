import kebab from 'decamelize'
import { serialise } from '../util'

export default async function (model, data) {
  try {
    console.log(this.axios)
    if (!this.axios.defaults.headers.Authorization) throw new Error('Not logged in')

    let result = await this.axios.get(kebab(model), {
      data: serialise(model, data)
    })

    return result
  } catch (error) {
    return error
  }
}
