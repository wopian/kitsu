import kebab from 'decamelize'
import plural from 'pluralize'
import { error, serialise } from '../util'

/**
 * Create a new resource
 * Aliases: `post`
 * @memberof Kitsu
 * @param {string} model Model to create a resource under
 * @param {Object} body Data to send in the request
 * @param {Object} headers Additional headers to send with request
 * @returns {Object} JSON-parsed response
 *
 * @example
 * // Post a comment to a user's own profile
 * api.post('posts', {
 *   content: 'Hello World',
 *   targetUser: {
 *     id: '42603',
 *     type: 'users'
 *   },
 *   user: {
 *     id: '42603',
 *     type: 'users'
 *   }
 * })
 */
export async function post (model, body, headers = {}) {
  try {
    headers = Object.assign(this.headers, headers)
    if (!headers.Authorization) throw new Error('Not logged in')
    let { data } = await this.axios.post(plural(kebab(model)), {
      data: (await serialise(model, body)).data,
      headers
    })
    return data
  } catch (E) {
    return error(E)
  }
}
