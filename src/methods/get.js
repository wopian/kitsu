import r from 'got'
import kebab from 'decamelize'
import { deserialise } from '../serialise'
import { query } from '../util'

/**
 * Get resources - aliases: `fetch` & `find`
 * @memberof Kitsu
 * @param {String} model Model to get data from
 * @param {Object} options Request queries
 * @param {Object} options.page
 * @param {Number} options.page.limit Number of resources to return in request (Max 20 for all methods other than `libraryEntries` (500))
 * @param {Number} options.page.offset Number of resources to offset the dataset by
 * @param {Object} options.fields Return a sparse fieldset with only the included attributes
 * @param {Object} options.filter Filter dataset by attribute values
 * @param {String} options.sort Sort dataset by one or more attributes (prepend `-` for descending order)
 * @param {String} options.include Include relationships
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
 *
 * @example
 * // Get collection of anime resources and their categories
 * kitsu.get('anime', {
 *   include: 'categories'
 * })
 *
 * @example
 * // Get a specific resource and its relationships by ID (method one)
 * kitsu.get('anime', {
 *   include: 'categories',
 *   filter: { id: '2' }
 * })
 *
 * @example
 * // Get a specific resource and its relationships by ID (method two)
 * kitsu.get('anime/2', {
 *   include: 'categories'
 * })
 *
 * @example
 * // Get a specific resource's relationship data only
 * kitsu.get('anime/2/categories')
 */
export default async function (model, options) {
  try {
    // Handle response
    let { body } = await r(`${this._apiUrl}/${this._apiVersion}/${kebab(model, '-')}${query(options)}`, this._options)
      .catch(e => { throw JSON.parse(e.response.body) || e.response.body })
    return deserialise(JSON.parse(body))
  } catch (e) {
    throw e
  }
}
