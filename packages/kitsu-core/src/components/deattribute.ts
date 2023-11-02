import { Attributes, isAttributes } from "../resources/attributes.js";
import { ResourceIdentifier } from "../resources/resource-identifier.js";
import { ResourceObject } from "../resources/resource-object.js";

export type DeattributedResourceObject = ResourceIdentifier & Attributes;

// Write a function that hoists the attributes of a given object to the top level
export function deattribute(data: ResourceObject): DeattributedResourceObject;
export function deattribute(data: ResourceObject[]): DeattributedResourceObject[];
export function deattribute(data: ResourceObject | ResourceObject[]): DeattributedResourceObject | DeattributedResourceObject[] {
  return isResourceObjectArray(data) ? data.map(_deattribute) : _deattribute(data);
}

function _deattribute(data: ResourceObject): DeattributedResourceObject {
  const output = {
    ...data,
    ...data.attributes
  }

  if (output.attributes === data.attributes) delete output.attributes
  return output;
}

function isResourceObjectArray(obj: ResourceObject | ResourceObject[]): obj is ResourceObject[] {
  return Array.isArray(obj)
}
