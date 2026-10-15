/** Dynamic JSON attributes and extension members. */
export type JsonObject = Record<string, any>
export type JsonApiMeta = JsonObject
export interface JsonApiLink {
  href: string
  rel?: string
  describedby?: JsonApiLink | string | null
  title?: string
  type?: string
  hreflang?: string | string[]
  meta?: JsonApiMeta
}
export type JsonApiLinks = Record<string, string | JsonApiLink | null>
export interface ResourceIdentifier {
  type: string
  id?: string
  lid?: string
  meta?: JsonApiMeta
  [member: string]: any
}
export interface JsonApiResource extends ResourceIdentifier {
  attributes?: JsonObject
  relationships?: Record<string, JsonApiRelationship>
  links?: JsonApiLinks
  [member: string]: any
}
export interface JsonApiRelationship {
  data?: ResourceIdentifier | ResourceIdentifier[] | null
  links?: JsonApiLinks
  meta?: JsonApiMeta
  [member: string]: any
}
export interface JsonApiObject {
  version?: string
  ext?: string[]
  profile?: string[]
  meta?: JsonApiMeta
}
export interface JsonApiError {
  id?: string
  links?: JsonApiLinks
  status?: string
  code?: string
  title?: string
  detail?: string
  source?: { pointer?: string; parameter?: string; header?: string }
  meta?: JsonApiMeta
  [member: string]: any
}
export interface JsonApiDocument {
  data?: JsonApiResource | JsonApiResource[] | null
  included?: JsonApiResource[]
  errors?: JsonApiError[]
  jsonapi?: JsonApiObject
  links?: JsonApiLinks
  meta?: JsonApiMeta
  [member: string]: any
}
/** Resource members that cannot occupy the flat attribute namespace. */
export interface ResourceEnvelope {
  lid?: string
  links?: JsonApiLinks
  meta?: JsonApiMeta
  relationships?: Record<string, JsonApiRelationship>
  /** Explicit attributes override relationship inference on writes. */
  attributes?: JsonObject
  [member: string]: any
}
export interface FlatResource {
  type?: string
  id?: string | number
  $?: ResourceEnvelope
  [attribute: string]: any
}
export interface SerialiseOptions {
  /** Convert resource attribute names to wire names; nested JSON keys stay unchanged. */
  attributeCase?: (name: string) => string
  camelCaseTypes?: (value: string) => string
  pluralTypes?: (value: string) => string
  /** Top-level document members accompanying generated primary data. */
  document?: Omit<JsonApiDocument, 'data'>
  /** Serialize primary data as identifiers for a relationship endpoint. */
  relationship?: boolean
}
export interface SplitModelOptions {
  resourceCase?: (value: string) => string
  pluralModel?: (value: string) => string
}
export interface DeserialiseOptions {
  /** Convert resource attribute names to application names; nested JSON keys stay unchanged. */
  attributeCase?: (name: string) => string
  hoistData?: boolean
}
