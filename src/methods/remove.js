import r from 'got'
import kebab from 'decamelize'
import { serialise } from '../util'

/**
 * Delete an existing resource - aliases: `destroy`
 * @memberof Kitsu
 * @param {String} model Model to update a resource under
 * @param {Object} data Data to send in a request
 *
 * @example
 * // Delete a user's post
 * kitsu.remove('posts', {
 *   id: '12345678',
 * })
 */
export default async function (model, data) {
  try {
    if (!this.isAuth) throw new Error('Not authenticated')
    if (typeof data.id === 'undefined') throw new Error('PATCH request is missing a model ID')
    // Handle request
    const opts = Object.assign({
      body: JSON.stringify(serialise(model, data, 'DELETE'))
    }, this._opts)
    await r.patch(`${this._apiUrl}/${this._apiVersion}/${kebab(model, '-')}/${data.id}`, opts)
      .catch(e => { throw e.response.body })
  } catch (e) {
    throw JSON.parse(e) || e
  }
}
