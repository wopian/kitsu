/**
 * Links relationships to included data
 *
 * @param {Object} data The response data object
 * @param {Object[]} [included] The response included object
 * @param {Object} [previouslyLinked] A mapping of already visited resources (internal use only)
 * @param {Object} [relationshipCache] A cache object for relationship meta and links
 * @returns Parsed data
 *
 * @example
 * const data = {
 *   attributes: { author: 'Joe' },
 *   relationships: {
 *     author: {
 *       data: { id: '1', type: 'people' }
 *     }
 *   }
 * }
 * const included = [ {
 *   id: '1',
 *   type: 'people',
 *   attributes: { name: 'Joe' }
 * } ]
 * const output = linkRelationships(data, included)
 * // {
 * //   attributes: { author: 'Joe' },
 * //   author: {
 * //     data: { id: '1', name: 'Joe', type: 'people' }
 * //   }
 * // }
 */
export function linkRelationships(
  data: any,
  included?: any[],
  previouslyLinked?: any,
  relationshipCache?: any
): any
