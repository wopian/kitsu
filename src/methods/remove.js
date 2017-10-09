import kebab from 'decamelize'
import plural from 'pluralize'
import { serialise } from '../util'

/**
 * Remove a resource
 * Aliases: `destroy`
 * @memberof Kitsu
 * @param {String} model Model to remove data from
 * @param {String|Number} id Resource ID to remove
 * @returns {Object} JSON-parsed response
 *
 * @example
 * // Delete a user's post
 * api.remove('posts', 123)
 */
export default async function (model, id) {
  try {
    console.log(await serialise(model, { id }, 'DELETE'))
    if (!this.axios.defaults.headers.Authorization) throw new Error('Not logged in')
    let { data } = await this.axios.delete(`${plural(kebab(model))}/${id}`, {
      data: (await serialise(model, { id }, 'DELETE')).data,
      headers: this.headers
    })
    return data
  } catch (error) {
    const e = error.response.data
    return e.errors ? e.errors : e
  }
}
