import { JsonKey, JsonValue } from './json.js'

// https://jsonapi.org/format/#document-meta
//
// Meta Information
// Where specified, a meta member can be used to include non-standard meta-information. The value of each meta member MUST be an object (a “meta object”).
//
// Any members MAY be specified within meta objects.

export interface Meta {
  [name: JsonKey]: JsonValue
}
