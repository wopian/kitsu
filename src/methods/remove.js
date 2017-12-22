import kebab from 'decamelize'
import plural from 'pluralize'
import { error, serialise } from '../util'

/**
 * Remove a resource
 * Aliases: `destroy`
 * @memberof Kitsu
 * @param {string} model Model to remove data from
 * @param {string|number} id Resource ID to remove
 * @param {Object} headers Additional headers to send with request
 * @returns {Object} JSON-parsed response
 *
 * @example
 * // Delete a user's post
 * api.remove('posts', 123)
 */
export async function remove (model, id, headers = {}) {
  try {
    headers = Object.assign(this.headers, headers)
    if (!headers.Authorization) throw new Error('Not logged in')
    let { data } = await this.axios.delete(`${plural(kebab(model))}/${id}`, {
      data: (await serialise(model, { id }, 'DELETE')).data,
      headers
    })
    return data
  } catch (E) {
    return error(E)
  }
}
