import r from 'got'
import kebab from 'decamelize'
import { serialise } from '../util'

/**
 * Create a new resource - aliases: `create`
 * @memberof Kitsu
 * @param {String} model Model to create a resource under
 * @param {Object} data Data to send in request
 *
 * @example
 * // Post a comment to a user's own profile feed
 * kitsu.post('posts', {
 *   content: 'Hello world',
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
export default async function (model, data) {
  try {
    if (!this.isAuth) throw new Error('Not authenticated')
    // Handle request
    const opts = Object.assign({
      body: JSON.stringify(serialise(model, data))
    }, this._opts)
    await r.post(`${this._apiUrl}/${this._apiVersion}/${kebab(model, '-')}`, opts)
      .catch(e => { throw JSON.parse(e.response.body) || e.response.body })
  } catch (e) {
    throw e
  }
}
