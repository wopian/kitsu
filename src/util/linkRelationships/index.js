import { deattribute, error, filterIncludes } from '../'

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
      if (relationships[key].data && Array.isArray(relationships[key].data)) {
        for (let { id, type } of await relationships[key].data) {
          const deattributed = await deattribute(await filterIncludes(included, { id, type }))
          if (typeof deattributed !== 'undefined') {
            if (!data[key]) data[key] = []
            data[key].push(deattributed)
          }
        }
      // Relationship contains a single resource
      } else if (relationships[key].data) {
        const { id, type } = relationships[key].data
        const deattributed = await deattribute(await filterIncludes(included, { id, type }))
        if (typeof deattributed !== 'undefined' && !data[key]) data[key] = deattributed
        delete data[key].relationships
      }
    }

    delete data.relationships

    return data
  } catch (E) {
    error(E)
  }
}
