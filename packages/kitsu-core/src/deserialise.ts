import { deattribute } from './deattribute.js'
import { copy } from './internal/copy.js'
import { decodeGraph } from './internal/graph.js'
import { extensionMember, memberCount } from './internal/members.js'
import type { DeserialiseOptions, JsonObject } from './types.js'

/**
 * Deserialises JSON:API documents into flat resources and direct relationships.
 * Resource metadata lives under `$`; document metadata remains at document level.
 *
 * @param {JsonApiDocument} response JSON:API document, including collection, null, meta-only or error-only documents
 * @param {DeserialiseOptions} [options={}] Decoding options
 * @param {boolean} [options.hoistData=false] Unwrap only documents containing solely data; never recursively unwrap JSON attributes
 * @param {function(string): string} [options.attributeCase] Convert attribute names. Default: unchanged. Nested JSON keys and extension attributes stay unchanged. Invalid names or collisions throw Error.
 * @returns {(Object|Array<FlatResource>|FlatResource|null|undefined)} Independent decoded document, or primary data when hoisted; undefined for missing input
 * @example
 * deserialise({ data: { type: 'people', id: '1', attributes: { name: 'Ada' } } })
 * // { data: { type: 'people', id: '1', name: 'Ada' } }
 * @example <caption>Casing enabled and disabled</caption>
 * import { camel, deserialise } from 'kitsu-core'
 * const document = { data: { type: 'people', id: '9', attributes: { 'first-name': 'Mina' } } }
 * deserialise(document).data['first-name'] // 'Mina'
 * deserialise(document, { attributeCase: camel }).data.firstName // 'Mina'
 * @example <caption>Resource metadata and document metadata</caption>
 * const document = { data: { type: 'people', id: '9', meta: { editable: true } } }
 * deserialise(document).data.$.meta.editable // true
 * deserialise(document, { hoistData: true }).$.meta.editable // true
 * const withMeta = { ...document, meta: { total: 1 } }
 * const result = deserialise(withMeta, { hoistData: true })
 * result.meta.total // 1; document metadata keeps the wrapper
 * result.data.$.meta.editable // true
 */
export function deserialise(response: any, options: DeserialiseOptions = {}): any {
  if (!response) return
  const result: JsonObject = {}
  for (const key in response) {
    if (!Object.hasOwn(response, key)) continue
    if (
      key === 'errors' ||
      key === 'links' ||
      key === 'meta' ||
      key === 'jsonapi' ||
      extensionMember(key)
    )
      result[key] = copy(response[key])
  }
  if ('data' in response) {
    const data = response.data
    if (
      !('included' in response) &&
      (data == null || (Object.getPrototypeOf(data) === Object.prototype && !data.relationships))
    )
      result.data = deattribute(data, options)
    else {
      const graph = decodeGraph(data, response.included, options)
      result.data = graph.data
      if ('included' in response) result.included = graph.included
    }
  }
  if (options.hoistData && memberCount(result) === 1 && 'data' in result) return result.data
  return result
}
