import kebab from 'decamelize'
import plural from 'pluralize'
import { error, serialise } from '../util'

/**
 * Update a resource
 * Aliases: `patch`
 * @memberof Kitsu
 * @param {string} model Model to update data in
 * @param {Object} body Data to send in the request
 * @param {Object} headers Additional headers to send with request
 * @returns {Object} JSON-parsed response
 *
 * @example
 * // Update a user's post (Note: For Kitsu.io, posts cannot be edited 30 minutes after creation)
 * api.update('posts', {
 *   id: '12345678',
 *   content: 'Goodbye World'
 * })
 */
export default async function (model, body, headers = {}) {
  try {
    headers = Object.assign(this.headers, headers)
    if (!headers.Authorization) throw new Error('Not logged in')
    if (typeof body.id === 'undefined') throw new Error('Updating a resource requires an ID')
    let { data } = await this.axios.patch(`${plural(kebab(model))}/${body.id}`, {
      data: (await serialise(model, body, 'PATCH')).data,
      headers
    })
    return data
  } catch (E) {
    return error(E)
  }
}
