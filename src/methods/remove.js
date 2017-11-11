import kebab from 'decamelize'
import { error, serialise } from '../util'

/**
 * Remove a resource
 * Aliases: `destroy`
 * @memberof Kitsu
 * @param {String} model Model to remove data from
 * @param {String|Number} id Resource ID to remove
 * @param {Object} headers Additional headers to send with request
 * @returns {Object} JSON-parsed response
 *
 * @example
 * // Delete a user's post
 * api.remove('posts', 123)
 */
export default async function (model, id, headers = {}) {
  try {
    headers = Object.assign(this.headers, headers)
    if (!headers.Authorization) throw new Error('Not logged in')
    let { data } = await this.axios.delete(`${kebab(model)}/${id}`, {
      data: await serialise(model, { id }, 'DELETE'),
      headers
    })
    return data
  } catch (E) {
    return error(E)
  }
}
