import kebab from 'decamelize'
import plural from 'pluralize'
import { serialise } from '../util'

/**
 * Create a new resource
 * Aliases: `post`
 * @memberof Kitsu
 * @param {String} model Model to create a resource under
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
export default async function (model, body, headers = {}) {
  try {
    if (!this.axios.defaults.headers.Authorization) throw new Error('Not logged in')
    let { data } = await this.axios.post(plural(kebab(model)), {
      data: (await serialise(model, body)).data,
      headers: Object.assign(this.headers, headers)
    })
    return data
  } catch (error) {
    const e = error.response.data
    return e.errors ? e.errors : e
  }
}
