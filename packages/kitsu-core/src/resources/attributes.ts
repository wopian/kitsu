import { JsonKey, JsonValue } from './json.js'

// https://jsonapi.org/format/#document-resource-object-attributes
//
// The value of the attributes key MUST be an object (an “attributes object”). Members of the attributes object (“attributes”) represent information about the resource object in which it’s defined.
// Attributes may contain any valid JSON value, including complex data structures involving JSON objects and arrays.
// Keys that reference related resources (e.g. author_id) SHOULD NOT appear as attributes. Instead, relationships SHOULD be used.

export interface Attributes {
  [name: JsonKey]: JsonValue
}

export function isAttributes(attributes: unknown): attributes is Attributes {
  return (
    typeof attributes === 'object' &&
    attributes !== null &&
    !Array.isArray(attributes)
  )
}
