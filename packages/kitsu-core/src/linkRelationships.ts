import { decodeGraph } from './internal/graph.js'
import type { DeserialiseOptions, JsonObject } from './types.js'

/**
 * Resolves relationships into direct resources using document-local identity.
 *
 * @param {Object|Object[]} data Primary resource data
 * @param {Object[]} [included=[]] Included resources
 * @param {Object} [options] Attribute naming options
 * @param {Function} [options.attributeCase] Convert attribute names; nested JSON keys stay unchanged
 * @returns {Object|Object[]} Flat resource graph without mutating input
 * @example
 * linkRelationships({ type: 'articles', id: '1', relationships: { author: { data: null } } })
 * // { type: 'articles', id: '1', author: null }
 */
export function linkRelationships(
  data: any,
  included: JsonObject[] = [],
  options?: DeserialiseOptions,
): any {
  return decodeGraph(data, included, options).data
}
