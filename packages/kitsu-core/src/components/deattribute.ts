interface Data {
  id: string
  type: string
  attributes?: {
    [key: string]:
      | string
      | number
      | boolean
      | null
      | undefined
      | object
      | object[]
      | string[]
      | number[]
      | boolean[]
  }
}

// Write a function that hoists the attributes of a given object to the top level
export const deattribute = (data: Data | Data[]): Data | Data[] => {
  let output = data
  if (Array.isArray(data)) output = data.map(deattribute) as Data[]
  else if (
    typeof data.attributes === 'object' &&
    data.attributes !== null &&
    !Array.isArray(data.attributes)
  ) {
    output = {
      ...data,
      ...data.attributes
    } as Data

    if (output.attributes === data.attributes) delete output.attributes
  }

  return output
}
