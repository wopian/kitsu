import r from 'got'
import kebab from 'decamelize'
import { deserialise } from '../serialise'
import { query } from '../util'

/**
 * Get resources - aliases: `fetch` & `find`
 * @memberof Kitsu
 * @param {String} model Model to get data from
 * @param {Object} opts Request queries
 * @param {Object} opts.page
 * @param {Number} opts.page.limit Number of resources to return in request (Max 20 for all methods other than `libraryEntries` (500))
 * @param {Number} opts.page.offset Number of resources to offset the dataset by
 * @param {Object} opts.fields Return a sparse fieldset with only the included attributes
 * @param {Object} opts.filter Filter dataset by attribute values
 * @param {String} opts.sort Sort dataset by one or more attributes (prepend `-` for descending order)
 * @param {String} opts.include Include relationships
 * @returns {Object} JSON parsed response
 *
 * @example
 * // Get only a specific user's name and birthday
 * kitsu.get('users', {
 *   fields: {
 *     users: 'name,birthday'
 *   },
 *   filter: {
 *     name: 'wopian'
 *   }
 * })
 */
export default async function (model, opts) {
  try {
    // Handle response
    let { body } = await r(`${this._apiUrl}/${this._apiVersion}/${kebab(model, '-')}${query(opts)}`, this._opts)
      .catch(e => { throw JSON.parse(e.response.body) || e.response.body })
    return deserialise(JSON.parse(body))
  } catch (e) {
    throw e
  }
}
