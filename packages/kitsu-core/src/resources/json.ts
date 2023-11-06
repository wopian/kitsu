// Valid JSON values
// https://datatracker.ietf.org/doc/html/rfc8259#section-3
export type JsonValue =
  | object
  | number
  | string
  | false
  | null
  | true
  | Array<JsonValue>

// https://datatracker.ietf.org/doc/html/rfc8259#section-4
// "A name is a string"
export type JsonKey = string
