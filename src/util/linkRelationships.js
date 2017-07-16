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
    const { attributes, relationships } = data
    for (let key in relationships) {
      if (relationships[key].data && relationships[key].data.constructor === Array) {
        for (let { id, type } of relationships[key].data) {
          if (!attributes[key]) attributes[key] = []
          attributes[key].push((await filterIncludes(included, { id, type }))[0])
        }
      } else if (relationships[key].data) {
        const { id, type } = relationships[key].data
        if (!attributes[key]) attributes[key] = (await filterIncludes(included, { id, type }))[0]
        delete attributes[key].relationships
      }
    }
    delete data.relationships
  } catch (e) {
    throw e
  }
}
