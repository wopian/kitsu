import { deattribute } from '../deattribute'
import { filterIncludes } from '../filterIncludes'

/**
 * Core function to link relationships to included data
 *
 * @param {Object} resource The included resource
 * @param {string} resource.id Resource ID
 * @param {string} resource.type Resource type
 * @param {Object} [resource.meta] Meta information
 * @param {Object[]} included The response included object
 * @private
 */
function link ({ id, type, meta }, included) {
  const filtered = filterIncludes(included, { id, type })
  if (filtered.relationships) linkRelationships(filtered, included)
  if (meta) filtered.meta = meta

  return deattribute(filtered)
}

/**
 * Helper function for multiple relationships
 *
 * @param {Object} data The response data object
 * @param {Object[]} included The response included object
 * @param {string} key Name of the relationship item
 * @private
 */
function linkArray (data, included, key) {
  data[key] = {}
  if (data.relationships[key].links) data[key].links = data.relationships[key].links
  data[key].data = []
  for (const resource of data.relationships[key].data) {
    data[key].data.push(link(resource, included))
  }
  delete data.relationships[key]
}

/**
 * Helper function for single relationships
 *
 * @param {Object} data The response data object
 * @param {Object[]} included The response included object
 * @param {string} key Name of the relationship item
 * @private
 */
function linkObject (data, included, key) {
  data[key] = {}
  data[key].data = link(data.relationships[key].data, included)
  if (data.relationships[key].links) data[key].links = data.relationships[key].links
  delete data.relationships[key]
}

/**
 * Helper function for relationships with no data
 *
 * @param {Object} data The response data object
 * @param {string} key Name of the relationship item
 * @private
 */
function linkAttr (data, key) {
  data[key] = {}
  if (data.relationships[key].links) data[key].links = data.relationships[key].links
  delete data.relationships[key]
}

/**
 * Links relationships to included data
 *
 * @param {Object} data The response data object
 * @param {Object[]} [included] The response included object
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
export function linkRelationships (data, included = []) {
  const { relationships } = data

  for (const key in relationships) {
    // Relationship contains collection of resources
    if (Array.isArray(relationships[key]?.data)) {
      linkArray(data, included, key)
    // Relationship contains a single resource
    } else if (relationships[key].data) {
      linkObject(data, included, key)
    } else {
      linkAttr(data, key)
    }
  }

  if (Object.keys(relationships || []).length === 0 && typeof relationships === 'object') {
    delete data.relationships
  }

  return data
}
