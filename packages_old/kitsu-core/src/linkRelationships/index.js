import { deattribute } from '../deattribute'
import { isDeepEqual } from '../deepEqual'
import { filterIncludes } from '../filterIncludes'

/**
 * Core function to link relationships to included data
 *
 * @param {Object} resource The included resource
 * @param {string} resource.id Resource ID
 * @param {string} resource.type Resource type
 * @param {Object} [resource.meta] Meta information
 * @param {Object[]} included The response included object
 * @param {Object} previouslyLinked A mapping of already visited resources
 * @param {Object} relationshipCache A cache object for relationship meta and links
 * @private
 */
function link(
  { id, type, meta },
  included,
  previouslyLinked,
  relationshipCache
) {
  const filtered = filterIncludes(included, { id, type })
  previouslyLinked[`${type}#${id}`] = filtered

  if (filtered.relationships) {
    linkRelationships(filtered, included, previouslyLinked, relationshipCache)
  }
  if (meta) filtered.meta = meta

  return deattribute(filtered)
}

/**
 * Helper function for multiple relationships
 *
 * @param {Object} data The response data object
 * @param {Object[]} included The response included object
 * @param {string} key Name of the relationship item
 * @param {Object} previouslyLinked A mapping of already visited resources
 * @param {Object} relationshipCache A cache object for relationship meta and links
 * @private
 */
function linkArray(data, included, key, previouslyLinked, relationshipCache) {
  data[key] = {}

  if (data.relationships[key].links)
    data[key].links = data.relationships[key].links
  if (data.relationships[key].meta)
    data[key].meta = data.relationships[key].meta

  data[key].data = []

  for (const resource of data.relationships[key].data) {
    const cache = previouslyLinked[`${resource.type}#${resource.id}`]
    let relationship =
      cache || link(resource, included, previouslyLinked, relationshipCache)
    if (resource.meta !== relationship.meta)
      relationship = { ...relationship, meta: resource.meta }
    data[key].data.push(relationship)
  }

  delete data.relationships[key]
}

/**
 * Helper function for single relationships
 *
 * @param {Object} data The response data object
 * @param {Object[]} included The response included object
 * @param {string} key Name of the relationship item
 * @param {Object} previouslyLinked A mapping of already visited resources
 * @param {Object} relationshipCache A cache object for relationship meta and links
 * @private
 */
function linkObject(data, included, key, previouslyLinked, relationshipCache) {
  data[key] = {}
  const resource = data.relationships[key].data
  const cache = previouslyLinked[`${resource.type}#${resource.id}`]

  if (cache) {
    let resourceCache = null
    // Comparing for cache entity meta and resource entity meta object.
    resourceCache = isDeepEqual(cache.meta, resource.meta)
      ? cache
      : {
          ...cache,
          meta: resource.meta
        }

    data[key].data = resourceCache
  } else {
    data[key].data = link(
      resource,
      included,
      previouslyLinked,
      relationshipCache
    )
  }

  const cacheKey = `${data.type}#${data.id}#${key}`
  const relationships = relationshipCache[cacheKey] || data.relationships[key]
  if (!relationshipCache[cacheKey]) relationshipCache[cacheKey] = relationships

  if (relationships?.links) data[key].links = relationships.links
  if (relationships?.meta) data[key].meta = relationships.meta

  delete data.relationships[key]
}

/**
 * Helper function for relationships with no data
 *
 * @param {Object} data The response data object
 * @param {string} key Name of the relationship item
 * @private
 */
function linkAttribute(data, key) {
  data[key] = {}
  if (data.relationships[key].links)
    data[key].links = data.relationships[key].links
  if (data.relationships[key].meta)
    data[key].meta = data.relationships[key].meta
  delete data.relationships[key]
}

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
  data,
  included = [],
  previouslyLinked = {},
  relationshipCache = {}
) {
  const { relationships } = data

  for (const key in relationships) {
    // Relationship contains collection of resources
    if (Array.isArray(relationships[key]?.data)) {
      linkArray(data, included, key, previouslyLinked, relationshipCache)
      // Relationship contains a single resource
    } else if (relationships[key].data) {
      linkObject(data, included, key, previouslyLinked, relationshipCache)
    } else {
      linkAttribute(data, key)
    }
  }

  if (
    Object.keys(relationships || []).length === 0 &&
    typeof relationships === 'object' &&
    !Array.isArray(relationships) &&
    relationships !== null
  ) {
    delete data.relationships
  }

  return data
}
