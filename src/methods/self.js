import fetch from './fetch'

/**
 * Fetch user data of the authenticated user
 * Note: Requires the JSON-API server to support `filter[self]=true`
 * Aliases: `whoAmI`
 * @memberof Kitsu
 * @param {Object} params JSON-API request queries
 * @param {Object} params.fields Return a sparse fieldset with only the included attributes/relationships jsonapi.org/format/#fetching-sparse-fieldsets
 * @param {string} params.include Include relationship data jsonapi.org/format/#fetching-includes
 * @param {Object} headers Additional headers to send with request
 * @returns {Object} JSON-parsed response
 *
 * @example
 * // Receive all attributes
 * api.self()
 *
 * @example
 * // Receive a sparse fieldset
 * api.self({
 *   fields: 'name,birthday'
 * })
 */
export default async function (params = {}, headers = {}) {
  try {
    const { data } = await fetch.bind(this)('users', Object.assign({ filter: { self: true } }, params), headers)
    return data[0]
  } catch (error) {
    return error
  }
}
