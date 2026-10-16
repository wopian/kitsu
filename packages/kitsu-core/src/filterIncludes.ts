import type { JsonObject, ResourceIdentifier } from './types.js'

/**
 * Finds included resources by type and id, or type and lid.
 *
 * @param {Array<JsonApiResource>} included Wire resources to search, in document order
 * @param {Partial<ResourceIdentifier>} relationship Identifier with type and id or lid; comparisons are case-sensitive
 * @returns {Object} Independent copy of the first match, unresolved identifier, or {} when type/identity is missing
 * @example
 * filterIncludes([{ type: 'people', lid: 'mina', attributes: { name: 'Mina' } }], { type: 'people', lid: 'mina' })
 * // { type: 'people', lid: 'mina', attributes: { name: 'Mina' } }
 */
export function filterIncludes(
  included: JsonObject[],
  relationship: Partial<ResourceIdentifier>,
): JsonObject {
  const { type, id, lid } = relationship
  if (type === undefined || (id === undefined && lid === undefined)) return {}
  const resource = included.find(
    (item) =>
      item.type === type &&
      ((id !== undefined && item.id === id) || (lid !== undefined && item.lid === lid)),
  )
  return structuredClone(resource || relationship)
}
