/** Dynamic JSON:API attributes and extension members remain open-ended. */
export type JsonObject = Record<string, any>

export interface ResourceIdentifier {
  id?: string | number
  type?: string
  meta?: JsonObject
}
export interface JsonApiResource extends ResourceIdentifier {
  attributes?: JsonObject
  relationships?: Record<string, JsonApiRelationship>
  links?: JsonObject
  [member: string]: any
}
export interface JsonApiRelationship {
  data?: ResourceIdentifier | ResourceIdentifier[] | null
  links?: JsonObject
  meta?: JsonObject
}
export interface JsonApiDocument {
  data?: JsonApiResource | JsonApiResource[] | null
  included?: JsonApiResource[]
  errors?: JsonObject[]
  links?: JsonObject
  meta?: JsonObject
  [member: string]: any
}
export interface SerialiseOptions {
  camelCaseTypes?: (value: string) => string
  pluralTypes?: (value: string) => string
}
export interface SplitModelOptions {
  resourceCase?: (value: string) => string
  pluralModel?: (value: string) => string
}
export interface DeserialiseOptions {
  hoistData?: boolean
}
