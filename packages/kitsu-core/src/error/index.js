/**
 * Uniform error handling for Axios, JSON:API and internal package errors. Mutated Error object is rethrown to the caller.
 *
 * @param {Object} E The Error
 * @throws {Object} The mutated Error
 */
export function error (E) {
  if (E.response) {
    const e = E.response.data
    if (e && e.errors) E.errors = e.errors
  }
  throw E
}
