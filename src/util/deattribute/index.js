import { error } from '../'

export async function deattribute (data) {
  try {
    if (typeof data !== 'undefined') {
      // Check if relationship has many includes
      if (Array.isArray(data)) {
        await data.forEach(async (el, index) => {
          data[index] = await deattribute(el)
        })
      } else if (data.attributes && data.attributes.constructor === Object) {
        for (let attribute in await data.attributes) {
          data[attribute] = data.attributes[attribute]
        }
        delete data.attributes
      }
    }
    return data
  } catch (E) {
    error(E)
  }
}
