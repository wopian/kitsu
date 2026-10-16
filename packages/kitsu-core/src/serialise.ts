import { encode } from './internal/encode.js'
import type { FlatResource, JsonObject, SerialiseOptions } from './types.js'
/**
 * Serialises flat resources and direct relationships into a JSON:API document.
 * Put resource metadata under `$` and explicit attribute overrides under `$.attributes`.
 *
 * @param {string} [type] Resource type, required when data does not provide one
 * @param {(FlatResource|Array<FlatResource>|null)} [data={}] Flat primary data, direct relationships and optional $ metadata
 * @param {string} [method='POST'] Request method, case-insensitive; commonly POST, PATCH or DELETE
 * @param {SerialiseOptions} [options={}] Encoding options
 * @param {function(string): string} [options.camelCaseTypes] Transform inferred types before pluralTypes. Default: unchanged.
 * @param {function(string): string} [options.pluralTypes] Pluralize inferred types after camelCaseTypes. Default: unchanged.
 * @param {function(string): string} [options.attributeCase] Convert attribute names. Default: unchanged. Nested JSON keys and extension attributes stay unchanged. Invalid names or collisions throw TypeError.
 * @param {JsonApiDocument} [options.document] Additional document meta, links, jsonapi, included and extension members. included uses wire resources and merges by identity. data and errors throw TypeError.
 * @param {boolean} [options.relationship=false] Serialize primary data as identifiers
 * @returns {JsonApiDocument} Independent JSON:API document with deduplicated included resources
 * @example
 * serialise('articles', { title: 'Hello', author: { type: 'people', id: '9' } })
 * // { data: { type: 'articles', attributes: { title: 'Hello' }, relationships: { author: { data: { type: 'people', id: '9' } } } } }
 * @example <caption>Attribute casing enabled and disabled</caption>
 * import { camel, kebab, serialise } from 'kitsu-core'
 * serialise('people', { firstName: 'Mina' }).data.attributes // { firstName: 'Mina' }
 * serialise('people', { firstName: 'Mina' }, 'POST', { attributeCase: kebab }).data.attributes
 * // { 'first-name': 'Mina' }
 * @example <caption>Type callbacks and document metadata</caption>
 * serialise('library-entry', { id: 0 }, 'PATCH', {
 *   camelCaseTypes: camel,
 *   pluralTypes: (type) => type === 'libraryEntry' ? 'libraryEntries' : type,
 *   document: { meta: { requestId: 'demo-42' }, jsonapi: { version: '1.1' } }
 * })
 * // { data: { type: 'libraryEntries', id: '0' }, meta: { requestId: 'demo-42' }, jsonapi: { version: '1.1' } }
 * @example <caption>Explicit attributes and relationship clearing</caption>
 * serialise('articles', { id: '42', $: {
 *   attributes: { coordinates: [] },
 *   relationships: { author: { data: null, meta: { editable: true } } }
 * } }, 'PATCH')
 * // attributes.coordinates stays an attribute; relationships.author.data is null
 * @example <caption>Relationship endpoint</caption>
 * serialise('people', { id: '9' }, 'PATCH', { relationship: true })
 * // { data: { type: 'people', id: '9' } }
 */
export function serialise(
  type?: string,
  data: FlatResource | FlatResource[] | null = {},
  method = 'POST',
  options: SerialiseOptions = {},
): JsonObject {
  return encode(type, data, method.toUpperCase(), options)
}
