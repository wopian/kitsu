import { decodeGraph } from './internal/graph.js'
import type { DeserialiseOptions, JsonObject } from './types.js'

/**
 * Resolves relationships into direct resources using document-local identity.
 *
 * @param {(JsonApiResource|Array<JsonApiResource>|null)} data Primary wire resources
 * @param {Array<JsonApiResource>} [included=[]] Included wire resources, matched by type plus id or lid
 * @param {DeserialiseOptions} [options] Attribute naming options
 * @param {function(string): string} [options.attributeCase] Convert attribute names. Default: unchanged. Nested JSON and extension attributes keep their names; invalid names or collisions throw TypeError.
 * @param {boolean} [options.hoistData=false] Accepted through the shared type, but unused by this resource helper
 * @returns {(FlatResource|Array<FlatResource>|null)} Independent flat graph, preserving shared references, cycles and unresolved identifiers
 * @example
 * linkRelationships({ type: 'articles', id: '1', relationships: { author: { data: null } } })
 * // { type: 'articles', id: '1', author: null }
 * @example
 * import { camel, linkRelationships } from 'kitsu-core'
 * const result = linkRelationships({ type: 'articles', id: '42', relationships: {
 *   author: { data: { type: 'people', id: '9' } }
 * } }, [{ type: 'people', id: '9', attributes: { 'first-name': 'Mina' } }], { attributeCase: camel })
 * result.author.firstName // 'Mina'
 */
export function linkRelationships(
  data: any,
  included: JsonObject[] = [],
  options?: DeserialiseOptions,
): any {
  return decodeGraph(data, included, options).data
}
