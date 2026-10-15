import { deattribute } from './deattribute.js'
import { copy } from './internal/copy.js'
import { decodeGraph } from './internal/graph.js'
import { extensionMember, memberCount } from './internal/members.js'
import type { DeserialiseOptions, JsonObject } from './types.js'

/**
 * Deserialises JSON:API documents into flat resources and direct relationships.
 * Resource metadata lives under `$`; document metadata remains at document level.
 *
 * @param {Object} response JSON:API response document
 * @param {Object} [options={}] Deserialisation options
 * @param {boolean} [options.hoistData=false] Unwrap documents containing only `data`
 * @param {Function} [options.attributeCase] Convert attribute names; nested JSON keys stay unchanged
 * @returns {Object} Deserialised document without mutating input
 * @example
 * deserialise({ data: { type: 'people', id: '1', attributes: { name: 'Ada' } } })
 * // { data: { type: 'people', id: '1', name: 'Ada' } }
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
