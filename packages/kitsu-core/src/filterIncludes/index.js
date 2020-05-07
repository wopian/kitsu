import { error } from '../error'

/**
 * Filters includes for the specific relationship requested
 *
 * @param {Object} included The response included object
 * @param {Object} relationship
 * @param {string} relationship.id The relationship ID
 * @param {string} relationship.type The relationship type
 * @returns {Array} The matched includes
 *
 * @example
 * const includes = [
 *   {
 *     id: '1',
 *     type: 'users',
 *     attributes: { name: 'Emma' }
 *   },
 *   {
 *     id: '2',
 *     type: 'users',
 *     attributes: { name: 'Josh' }
 *   }
 * ]
 * const relationship = { id: '1', type: 'users' }
 * const response = filterIncludes(includes, relationship)
 * // {
 * //   id: '1',
 * //   type: 'users',
 * //   attributes: { name: 'Emma' }
 * // }
 */
export function filterIncludes (included, { id, type }) {
  try {
    if (id && type) {
      const filtered = included.filter(el => {
        return el.id === id && el.type === type
      })[0] || { id, type }
      return Object.assign({}, filtered)
    } else {
      return {}
    }
  } catch (E) {
    error(E)
  }
}
