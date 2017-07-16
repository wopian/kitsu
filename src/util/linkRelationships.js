import { deattribute } from './deattribute'
import { filterIncludes } from './filterIncludes'

/**
 * Links relationships to included data
 *
 * @param {Object} data The response data object
 * @param {Object} included The response included object
 * @private
 */
export async function linkRelationships (data, included) {
  try {
    const { relationships } = data
    for (let key in await relationships) {
      // Relationship contains collection of resources
      if (relationships[key].data && relationships[key].data.constructor === Array) {
        for (let { id, type } of await relationships[key].data) {
          data[key] = await deattribute(await filterIncludes(included, { id, type }))
        }
      // Relationship contains a single resource
      } else if (relationships[key].data) {
        const { id, type } = relationships[key].data
        if (!data[key]) data[key] = await deattribute((await filterIncludes(included, { id, type }))[0])
        delete data[key].relationships
      }
    }

    delete data.relationships

    return data
  } catch (e) {
    throw e
  }
}
