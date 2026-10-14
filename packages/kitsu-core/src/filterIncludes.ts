import type { JsonObject, ResourceIdentifier } from './types.js'

/**
 * Finds included resources by type and id, or type and lid.
 *
 * @param {Object[]} included Included resources
 * @param {Object} relationship Resource identifier
 * @returns {Object} Independent resource copy, or unresolved identifier
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
