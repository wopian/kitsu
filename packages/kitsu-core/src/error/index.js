/**
 * Uniform error handling for Axios, JSON:API and internal package errors. Mutated Error object is rethrown to the caller.
 *
 * @param {Object} E The Error
 * @throws {Object} The mutated Error
 *
 * @example
 * error('Hello')
 *
 * @example
 * error({errors: [ { code: 400 } ]})
 *
 * @example
 * error({
 *   response: {
 *     data: {
 *       errors: [ {
 *         title: 'Filter is not allowed',
 *         detail: 'x is not allowed',
 *         code: '102',
 *         status: '400'
 *       } ]
 *     }
 *   }
 * })
 */
export function error (E) {
  if (E.response) {
    const e = E.response.data
    if (e && e.errors) E.errors = e.errors
  }
  throw E
}
