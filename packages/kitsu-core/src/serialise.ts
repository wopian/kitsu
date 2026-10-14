import { encode } from './internal/encode.js'
import type { FlatResource, JsonObject, SerialiseOptions } from './types.js'
/**
 * Serialises flat resources and direct relationships into a JSON:API document.
 * Put resource metadata under `$` and explicit attribute overrides under `$.attributes`.
 *
 * @param {string} type Resource type
 * @param {Object|Object[]} [data={}] Flat primary data
 * @param {string} [method=POST] Request method
 * @param {Object} [options={}] Serialization options
 * @param {Function} [options.camelCaseTypes] Transform inferred resource types
 * @param {Function} [options.pluralTypes] Pluralize inferred resource types
 * @param {Object} [options.document] Additional top-level document members
 * @param {boolean} [options.relationship=false] Serialize primary data as identifiers
 * @returns {Object} JSON:API document with deduplicated included resources
 * @example
 * serialise('articles', { title: 'Hello', author: { type: 'people', id: '9' } })
 * // { data: { type: 'articles', attributes: { title: 'Hello' }, relationships: { author: { data: { type: 'people', id: '9' } } } } }
 */
export function serialise(
  type?: string,
  data: FlatResource | FlatResource[] | null = {},
  method = 'POST',
  options: SerialiseOptions = {},
): JsonObject {
  return encode(type, data, method.toUpperCase(), options)
}
