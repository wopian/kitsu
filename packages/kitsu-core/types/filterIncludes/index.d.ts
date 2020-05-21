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
export function filterIncludes(included: any[], { id, type }: {
    id: string;
    type: string;
}): any[];
