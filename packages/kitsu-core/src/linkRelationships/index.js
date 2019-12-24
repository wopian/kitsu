import { deattribute } from '../deattribute'
import { filterIncludes } from '../filterIncludes'

/**
 * Core function to link relationships to included data
 *
 * @param {Object} resource The included resource
 * @param {string} resource.id Resource ID
 * @param {string} resource.type Resource type
 * @param {Object} resource.meta Meta information
 * @param {Object} included The response included object
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
 * @param {Object} included The response included object
 * @param {string} key Name of the relationship item
 * @private
 */
function linkArray (data, included, key) {
  data[key] = []
  for (const resource of data.relationships[key].data) {
    data[key].push(link(resource, included))
  }
}

/**
 * Helper function for single relationships
 *
 * @param {Object} data The response data object
 * @param {Object} included The response included object
 * @param {string} key Name of the relationship item
 * @private
 */
function linkObject (data, included, key) {
  data[key] = link(data.relationships[key].data, included)
  delete data[key].relationships
}

/**
 * Links relationships to included data
 *
 * @param {Object} data The response data object
 * @param {Object} included The response included object
 */
export function linkRelationships (data, included) {
  const { relationships } = data
  let removeRelationships = false

  for (const key in relationships) {
    // Relationship contains collection of resources
    if (relationships[key].data && Array.isArray(relationships[key].data)) {
      linkArray(data, included, key)
      removeRelationships = true
    // Relationship contains a single resource
    } else if (relationships[key].data) {
      linkObject(data, included, key)
      removeRelationships = true
    }
  }

  if (removeRelationships) delete data.relationships

  return data
}
