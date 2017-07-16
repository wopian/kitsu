export async function deattribute (data) {
  try {
    // Check if relationship has many includes
    if (data.constructor === Array) {
      await data.forEach(async (el, index) => {
        data[index] = await deattribute(el)
      })
    } else if (data.attributes && data.attributes.constructor === Object) {
      for (let attribute in await data.attributes) {
        data[attribute] = data.attributes[attribute]
      }
      delete data.attributes
    }
    return data
  } catch (e) {
    throw e
  }
}
