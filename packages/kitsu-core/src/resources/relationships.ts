import { JsonKey, JsonValue } from './json.js'
import { Meta } from './meta.js'

// https://jsonapi.org/format/#document-resource-object-relationships
//
// Relationships
// The value of the relationships key MUST be an object (a “relationships object”). Each member of a relationships object represents a “relationship” from the resource object in which it has been defined to other resource objects.
// Relationships may be to-one or to-many.
// A relationship’s name is given by its key. The value at that key MUST be an object (“relationship object”).

type Links = void
type Data = void

export interface Relationships {
  [name: JsonKey]: RelationshipObject
}

// A “relationship object” MUST contain at least one of the following:
//
// - links: a links object containing at least one of the following:
// - data: resource linkage
// - meta: a meta object that contains non-standard meta-information about the relationship.
// - a member defined by an applied extension.
export type _Relationship = {
  links: Links
  data: Data
  meta: Meta
}

type RelationshipKeys = keyof _Relationship
// "at least one of" type circus
export type RelationshipObject = {
  [Key in RelationshipKeys]-?: Required<Pick<_Relationship, Key>> &
    Partial<Pick<_Relationship, Exclude<RelationshipKeys, Key>>>
}[RelationshipKeys] & {
  [extensionKey: string]: JsonValue
}

// https://jsonapi.org/format/#document-resource-object-relationships
// A “relationship object” MUST contain at least one of the following: 'links', 'data', 'meta', a member defined by an applied extension.
export function isRelationshipObject(
  object: unknown
): object is RelationshipObject {
  if (object === null || typeof object !== 'object') return false

  const keys = Object.keys(object)
  for (const key of keys) {
    if (['links', 'data', 'meta'].includes(key)) return true
    // https://jsonapi.org/format/#extension-members
    // The name of every new member introduced by an extension MUST be prefixed with the extension’s namespace followed by a colon (:).
    if (key.includes(':')) return true
  }

  return false
}
