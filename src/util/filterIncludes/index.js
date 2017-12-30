import { error } from '../'

/**
 * Filters includes for the specific relationship
 *
 * @param {Object} included The response included object
 * @param {Object} opts
 * @param {string} opts.id The relationship ID
 * @param {string} opts.type The relationship type
 * @returns {Array} The matched includes
 * @private
 */
export async function filterIncludes (included, { id, type }) {
  try {
    return included.filter(el => {
      return el.id === id && el.type === type
    })[0] || { id, type }
  } catch (E) {
    error(E)
  }
}
