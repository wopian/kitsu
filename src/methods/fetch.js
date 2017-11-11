import kebab from 'decamelize'
import { deserialise, query } from '../util'

/**
 * Fetch resources
 * Aliases: `get`, `find`, `findAll`
 * @memberof Kitsu
 * @param {String} model Model to fetch data from
 * @param {Object} params JSON-API request queries
 * @param {Object} params.page jsonapi.org/format/#fetching-pagination
 * @param {Number} params.page.limit Number of resources to return in request (Max `20` for Kitsu.io except on `libraryEntries` which has a max of `500`)
 * @param {Number} params.page.offset Number of resources to offset the dataset by
 * @param {Object} params.fields Return a sparse fieldset with only the included attributes/relationships jsonapi.org/format/#fetching-sparse-fieldsets
 * @param {Object} params.filter Filter dataset by attribute values jsonapi.org/format/#fetching-filtering
 * @param {String} params.sort Sort dataset by one or more comma separated attributes (prepend `-` for descending order) jsonapi.org/format/#fetching-sorting
 * @param {String} params.include Include relationship data jsonapi.org/format/#fetching-includes
 * @param {Object} headers Additional headers to send with request
 * @returns {Object} JSON-parsed response
 *
 * @example
 * // Get a specific user's name & birthday
 * api.get('users', {
 *   fields: {
 *     users: 'name,birthday'
 *   },
 *   filter: {
 *     name: 'wopian'
 *   }
 * })
 *
 * @example
 * // Get a collection of anime resources and their categories
 * api.get('anime', {
 *   include: 'categories'
 * })
 *
 * @example
 * // Get a single resource and its relationships by ID (method one)
 * api.get('anime', {
 *   include: 'categories',
 *   filter: { id: '2' }
 * })
 *
 * @example
 * // Get a single resource and its relationships by ID (method two)
 * api.get('anime/2', {
 *   include: 'categories'
 * })
 *
 * @example
 * // Get a resource's relationship data only
 * api.get('anime/2/categories')
 */
export default async function (model, params = {}, headers = {}) {
  try {
    let { data } = await this.axios.get(kebab(model), {
      params,
      paramsSerializer: a => query(a),
      headers: Object.assign(this.headers, headers)
    })
    return deserialise(data)
  } catch (error) {
    const e = error.response.data
    return e.errors ? e.errors : e
  }
}
