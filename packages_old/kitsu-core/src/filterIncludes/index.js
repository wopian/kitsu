import { error } from '../error'

/**
 * Filters includes for the specific relationship requested
 *
 * @param {Object[]} included The response included object
 * @param {Object} relationship
 * @param {string} relationship.id The relationship ID
 * @param {string} relationship.type The relationship type
 * @returns {Object[]} The matched includes
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
export function filterIncludes(included, { id, type }) {
  try {
    if (id && type) {
      const filtered = included.find(element => {
        return element.id === id && element.type === type
      }) || { id, type }
      return Object.assign({}, filtered)
    } else {
      return {}
    }
  } catch (error_) {
    error(error_)
  }
}
