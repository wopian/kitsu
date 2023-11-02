// https://jsonapi.org/format/#document-resource-object-attributes
//
// The value of the attributes key MUST be an object (an “attributes object”). Members of the attributes object (“attributes”) represent information about the resource object in which it’s defined.
// Attributes may contain any valid JSON value, including complex data structures involving JSON objects and arrays.
// Keys that reference related resources (e.g. author_id) SHOULD NOT appear as attributes. Instead, relationships SHOULD be used.

// Valid JSON values
// https://datatracker.ietf.org/doc/html/rfc8259#section-3
export type JsonValues =
  | object
  | number
  | string
  | false
  | null
  | true
  | Array<JsonValues>

// https://datatracker.ietf.org/doc/html/rfc8259#section-4
// "A name is a string"
export interface Attributes {
  [name: string]: JsonValues
}

export function isAttributes(attributes: unknown): attributes is Attributes {
  return (
    typeof attributes === 'object' &&
    attributes !== null &&
    !Array.isArray(attributes)
  )
}
