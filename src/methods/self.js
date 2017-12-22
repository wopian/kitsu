import { get } from './'

/**
 * Get the authenticated user's data
 * Note: Requires the JSON:API server to support `filter[self]=true`
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
export async function self (params = {}, headers = {}) {
  try {
    const { data } = await get.bind(this)('users', Object.assign({ filter: { self: true } }, params), headers)
    return data[0]
  } catch (error) {
    return error
  }
}
