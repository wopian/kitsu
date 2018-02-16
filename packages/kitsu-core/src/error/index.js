/**
 * Mutates an error and rethrows it
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
