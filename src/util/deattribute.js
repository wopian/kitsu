export async function deattribute (data) {
  try {
    if (data.attributes.constructor === Object) {
      for (let attribute in await data.attributes) {
        data[attribute] = data.attributes[attribute]
      }
      delete data.attributes
      return data
    }
  } catch (e) {
    throw e
  }
}
