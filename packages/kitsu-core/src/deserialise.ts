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
 * @returns {Object} Deserialised document without mutating input
 * @example
 * deserialise({ data: { type: 'people', id: '1', attributes: { name: 'Ada' } } })
 * // { data: { type: 'people', id: '1', name: 'Ada' } }
 */
export function deserialise(response: any, options: DeserialiseOptions = {}): any {
  if (!response) return
  const result: JsonObject = {}
  for (const [key, value] of Object.entries(response)) {
    if (['errors', 'links', 'meta', 'jsonapi'].includes(key) || extensionMember(key))
      result[key] = structuredClone(value)
  }
  if ('data' in response) {
    const graph = decodeGraph(response.data, response.included)
    result.data = graph.data
    if ('included' in response) result.included = graph.included
  }
  if (options.hoistData && memberCount(result) === 1 && 'data' in result) return result.data
  return result
}
