import { deattribute, filterIncludes } from '../'

/**
 * Core function to link relationships to included data
 *
 * @param {string} id The included data's ID
 * @param {type} type The included data's type
 * @param {Object} included The response included object
 * @private
 */
async function link (id, type, included) {
  const filtered = await filterIncludes(included, { id, type })
  if (filtered.relationships) await linkRelationships(filtered, included)
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
async function linkArray (data, included, key) {
  data[key] = []
  for (let { id, type } of await data.relationships[key].data) {
    data[key].push(await link(id, type, included))
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
async function linkObject (data, included, key) {
  const { id, type } = data.relationships[key].data
  data[key] = await link(id, type, included)
  delete data[key].relationships
}

/**
 * Links relationships to included data
 *
 * @param {Object} data The response data object
 * @param {Object} included The response included object
 * @private
 */
export async function linkRelationships (data, included) {
  const { relationships } = data
  let removeRelationships = false

  for (let key in await relationships) {
    // Relationship contains collection of resources
    if (relationships[key].data && Array.isArray(relationships[key].data)) {
      await linkArray(data, included, key)
      removeRelationships = true
    // Relationship contains a single resource
    } else if (relationships[key].data) {
      await linkObject(data, included, key)
      removeRelationships = true
    }
  }

  if (removeRelationships) delete data.relationships

  return data
}
