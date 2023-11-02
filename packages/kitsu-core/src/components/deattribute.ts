import { Attributes, isAttributes } from '../resources/attributes.js'
import { ResourceIdentifier } from '../resources/resourceIdentifier.js'
import { ResourceObject } from '../resources/resourceObject.js'

export type DeattributedResourceObject = ResourceIdentifier & Attributes

// Write a function that hoists the attributes of a given object to the top level
export function deattribute(data: ResourceObject): DeattributedResourceObject
export function deattribute(
  data: ResourceObject[]
): DeattributedResourceObject[]
export function deattribute(
  data: ResourceObject | ResourceObject[]
): DeattributedResourceObject | DeattributedResourceObject[] {
  return isResourceObjectArray(data)
    ? data.map(_deattribute)
    : _deattribute(data)
}

function _deattribute(data: ResourceObject): DeattributedResourceObject {
  // FIXME: what is the best behaviour when given an invalid attributes key?
  // 1. (Current) the same invalid object is returned.
  //   a. This results in deattribute returning potentially invalid DeattributedResourceObjects
  // 2. the object is modified, and has the invalid key removed
  //   a. This would guarantee valid returns, but will also change the current default behaviour.
  // 3. the object is not touched, and an error is thrown
  //   a. this would function closer to how JSON.parse does, throwing errors when unexpected input is given
  //
  // This should not be an issue for projects using typescript natively, since the compiler will warn when passing
  // objects with mismatched types to deattribute
  if (!isAttributes(data.attributes)) return data as DeattributedResourceObject

  const output = {
    ...data,
    ...data.attributes
  }

  if (output.attributes === data.attributes) delete output.attributes
  return output
}

function isResourceObjectArray(
  object: ResourceObject | ResourceObject[]
): object is ResourceObject[] {
  return Array.isArray(object)
}
