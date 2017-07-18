import r from 'got'
import kebab from 'decamelize'
import { serialise } from '../util'

/**
 * Delete an existing resource - aliases: `destroy`
 * @memberof Kitsu
 * @param {String} model Model to update a resource under
 * @param {String|Number} id ID of the resource to delete
 *
 * @example
 * // Delete a user's post
 * kitsu.remove('posts', 123)
 */
export default async function (model, id) {
  try {
    if (!this.isAuth) throw new Error('Not authenticated')
    if (typeof id === 'undefined') throw new Error('PATCH request is missing a model ID')
    // Handle request
    const opts = Object.assign({
      body: JSON.stringify(serialise(model, { id }, 'DELETE'))
    }, this._opts)
    await r.delete(`${this._apiUrl}/${this._apiVer}/${kebab(model, '-')}/${id}`, opts)
      .then(({ status }) => console.log(status))
      .catch(e => { throw e.response.body })
  } catch (e) {
    throw e
  }
}
