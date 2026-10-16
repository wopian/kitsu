/** Dynamic JSON attributes and extension members. Keys remain case-sensitive.
 * @example
 * const attributes: JsonObject = { title: 'Moonlight Bread', tags: ['bread'] }
 */
export type JsonObject = Record<string, any>
/** Application-defined JSON:API metadata. Values may contain arbitrary JSON.
 * @example
 * const meta: JsonApiMeta = { total: 42 }
 */
export type JsonApiMeta = JsonObject
/** Rich JSON:API link. A link may also be a URL string or null; see JsonApiLinks.
 * @example
 * const link: JsonApiLink = { href: '/articles/42', title: 'Moonlight Bread', hreflang: 'en' }
 */
export interface JsonApiLink {
  /** Link target, absolute or relative.
   * @example '/articles/42'
   */
  href: string
  /** Link relation, such as a registered relation name or extension URI.
   * @example 'next'
   */
  rel?: string
  /** Link to a description of the target resource.
   * @example { href: '/schemas/article' }
   */
  describedby?: JsonApiLink | string | null
  /** Human-readable link title.
   * @example 'Next articles'
   */
  title?: string
  /** Media type expected at the target.
   * @example 'application/vnd.api+json'
   */
  type?: string
  /** One language tag or an array of language tags.
   * @example ['en', 'fr']
   */
  hreflang?: string | string[]
  /** Metadata belonging to this link.
   * @example { count: 10 }
   */
  meta?: JsonApiMeta
}
/** Named links. Each value supports a URL string, rich link, or null.
 * @example
 * const links: JsonApiLinks = { self: '/articles/42', next: null }
 */
export type JsonApiLinks = Record<string, string | JsonApiLink | null>
/** Wire identifier. Supply type and id, or type and lid for a new local resource.
 * @example
 * const identifier: ResourceIdentifier = { type: 'people', id: '9', meta: { role: 'author' } }
 */
export interface ResourceIdentifier {
  /** Case-sensitive resource type.
   * @example 'people'
   */
  type: string
  /** Server identifier. Wire identifiers are strings, including numeric-looking IDs.
   * @example '0'
   */
  id?: string
  /** Local identifier for matching resources within one document.
   * @example 'new-person'
   */
  lid?: string
  /** Metadata for this identifier edge. Never merged into shared resource metadata.
   * @example { role: 'author' }
   */
  meta?: JsonApiMeta
  /** Extension members; namespaced members are preserved without interpretation.
   * @example { 'version:id': '7' }
   */
  [member: string]: any
}
/** JSON:API resource before decoding. Inherits type, id, lid and meta from ResourceIdentifier.
 * @example
 * const resource: JsonApiResource = { type: 'articles', id: '42', attributes: { title: 'Moonlight Bread' } }
 */
export interface JsonApiResource extends ResourceIdentifier {
  /** Resource attributes. Nested JSON is copied without changing nested key names.
   * @example { title: 'Moonlight Bread', settings: { dark_mode: true } }
   */
  attributes?: JsonObject
  /** Named relationship objects with linkage, links and metadata.
   * @example { author: { data: { type: 'people', id: '9' } } }
   */
  relationships?: Record<string, JsonApiRelationship>
  /** Resource links, decoded into resource.$.links.
   * @example { self: '/articles/42' }
   */
  links?: JsonApiLinks
  /** Extension members. Unknown ordinary members are ignored on decode.
   * @example { 'version:id': '7' }
   */
  [member: string]: any
}
/** Wire relationship or saved relationship extras under resource.$.relationships[name].
 * @example
 * const relationship: JsonApiRelationship = { data: null, meta: { editable: true } }
 */
export interface JsonApiRelationship {
  /** To-one identifier, to-many identifiers, or null. Empty arrays clear to-many linkage.
   * Saved data applies on writes only when the direct relationship value is absent.
   * @example [{ type: 'people', id: '9' }]
   */
  data?: ResourceIdentifier | ResourceIdentifier[] | null
  /** Links for this relationship, separate from links on the related resource.
   * @example { related: '/articles/42/author' }
   */
  links?: JsonApiLinks
  /** Metadata describing this relationship.
   * @example { editable: true }
   */
  meta?: JsonApiMeta
  /** Relationship extension members.
   * @example { 'audit:changed': true }
   */
  [member: string]: any
}
/** Top-level jsonapi object. Declares version, extensions and profiles without enabling extension processing.
 * @example
 * const jsonapi: JsonApiObject = { version: '1.1', profile: ['https://bakery.example/profiles/dates'] }
 */
export interface JsonApiObject {
  /** JSON:API version supported by the server.
   * @example '1.1'
   */
  version?: string
  /** Applied extension URIs. Configure matching media parameters through HTTP headers separately.
   * @example ['https://bakery.example/extensions/version']
   */
  ext?: string[]
  /** Applied profile URIs. Values are preserved without profile-specific processing.
   * @example ['https://bakery.example/profiles/dates']
   */
  profile?: string[]
  /** Metadata about this JSON:API implementation.
   * @example { implementation: 'bakery' }
   */
  meta?: JsonApiMeta
}
/** JSON:API error object. Members are optional and preserved in error documents.
 * @example
 * const error: JsonApiError = { status: '422', title: 'Title required', source: { pointer: '/data/attributes/title' } }
 */
export interface JsonApiError {
  /** Identifier for this error occurrence.
   * @example 'failure-42'
   */
  id?: string
  /** Error links, commonly about or type.
   * @example { about: '/errors/failure-42' }
   */
  links?: JsonApiLinks
  /** HTTP status expressed as a string.
   * @example '422'
   */
  status?: string
  /** Application-specific error code.
   * @example 'title_required'
   */
  code?: string
  /** Short summary shared by errors of this kind.
   * @example 'Title required'
   */
  title?: string
  /** Explanation specific to this occurrence.
   * @example 'Enter a title for Moonlight Bread.'
   */
  detail?: string
  /** Request location responsible for this error. Supply the applicable location member.
   * @example { header: 'Accept' }
   */
  source?: {
    /** JSON Pointer into the request document.
     * @example '/data/attributes/title'
     */
    pointer?: string
    /** Query parameter name.
     * @example 'filter[title]'
     */
    parameter?: string
    /** Request header name.
     * @example 'Accept'
     */
    header?: string
  }
  /** Additional error context.
   * @example { retryable: false }
   */
  meta?: JsonApiMeta
  /** Error extension members.
   * @example { 'audit:trace': 'trace-42' }
   */
  [member: string]: any
}
/** JSON:API wire document. Resource metadata is separate from document metadata.
 * data and errors must not coexist. Serialization document options reject both data and errors.
 * @example
 * const document: JsonApiDocument = { data: { type: 'articles', id: '42' }, meta: { total: 1 } }
 */
export interface JsonApiDocument {
  /** Primary resource, collection, or null. Decoding retains the document wrapper by default.
   * @example { type: 'articles', id: '42' }
   */
  data?: JsonApiResource | JsonApiResource[] | null
  /** Included wire resources. Decoding keeps canonical flat resources accessible under included.
   * @example [{ type: 'people', id: '9', attributes: { name: 'Mina Reed' } }]
   */
  included?: JsonApiResource[]
  /** JSON:API errors. Error-only documents can be decoded but are not generated by serialise.
   * @example [{ status: '422', title: 'Title required' }]
   */
  errors?: JsonApiError[]
  /** JSON:API version, extensions and profiles.
   * @example { version: '1.1' }
   */
  jsonapi?: JsonApiObject
  /** Document links, retained beside data.
   * @example { next: '/articles?page[number]=2' }
   */
  links?: JsonApiLinks
  /** Document metadata, retained beside data rather than inside a resource's $ envelope.
   * @example { total: 42 }
   */
  meta?: JsonApiMeta
  /** Document extension members. Namespaced members are preserved without extension processing.
   * @example { 'audit:trace': 'trace-42' }
   */
  [member: string]: any
}
/** Resource members stored under $. Attributes named meta, links and lid remain ordinary attributes.
 * Empty envelopes are omitted on decode. Document metadata stays beside data.
 * @example
 * const envelope: ResourceEnvelope = { meta: { editable: true }, relationships: { author: { data: null } } }
 */
export interface ResourceEnvelope {
  /** Local resource identity. Decoding moves wire lid here.
   * @example 'new-article'
   */
  lid?: string
  /** Resource links, separate from document links and relationship links.
   * @example { self: '/articles/42' }
   */
  links?: JsonApiLinks
  /** Metadata for this resource, separate from an attribute named meta.
   * @example { editable: true }
   */
  meta?: JsonApiMeta
  /** Relationship extras and saved identifier metadata. Direct values control linkage when present.
   * Use data: null here to clear a to-one relationship; a plain flat null remains an attribute.
   * @example { author: { data: null, meta: { editable: true } } }
   */
  relationships?: Record<string, JsonApiRelationship>
  /** Explicit attributes override inferred attributes and relationship inference by source name on writes.
   * @example { coordinates: [], author: { type: 'label', id: 'fictional' } }
   */
  attributes?: JsonObject
  /** Resource extension members.
   * @example { 'version:id': '7' }
   */
  [member: string]: any
}
/** Application resource with flat attributes and direct related resources, arrays, or null.
 * @example
 * const article: FlatResource = { type: 'articles', id: 0, title: 'Moonlight Bread', author: { type: 'people', id: '9' }, $: { meta: { editable: true } } }
 */
export interface FlatResource {
  /** Resource type. Supply serialise's type argument when primary data omits it.
   * @example 'articles'
   */
  type?: string
  /** String or numeric input identifier, including 0. Encoding emits strings.
   * @example 0
   */
  id?: string | number
  /** Resource metadata, local identity, relationship extras and explicit attribute overrides.
   * @example { meta: { editable: true } }
   */
  $?: ResourceEnvelope
  /** Flat attributes or direct relationships. Identifiers and empty arrays infer relationships.
   * @example { title: 'Moonlight Bread', author: { type: 'people', id: '9' } }
   */
  [attribute: string]: any
}
/** Encoding options. Callbacks are optional; omitted callbacks keep names unchanged.
 * @example
 * const options: SerialiseOptions = { attributeCase: kebab, document: { meta: { requestId: 'demo-42' } } }
 */
export interface SerialiseOptions {
  /** Convert attribute names to wire names. Default: unchanged. Nested JSON keys and extension attributes stay unchanged.
   * Colliding, empty or reserved converted names throw TypeError.
   * @example kebab
   */
  attributeCase?: (name: string) => string
  /** Transform inferred resource type names before pluralTypes. Default: unchanged.
   * @example camel
   */
  camelCaseTypes?: (value: string) => string
  /** Pluralize inferred resource type names after camelCaseTypes. Default: unchanged.
   * @example (value) => value === 'person' ? 'people' : value
   */
  pluralTypes?: (value: string) => string
  /** Extra document members: meta, links, jsonapi, included and extensions. Default: none.
   * included uses wire resources and merges by identity. data and errors are rejected at runtime.
   * @example { meta: { requestId: 'demo-42' }, jsonapi: { version: '1.1' } }
   */
  document?: Omit<JsonApiDocument, 'data'>
  /** Encode primary data as identifier linkage for a relationship endpoint. Default: false.
   * @example true
   */
  relationship?: boolean
}
/** URL model transformations. Both callbacks default to identity functions.
 * @example
 * const options: SplitModelOptions = { resourceCase: kebab, pluralModel: (value) => `${value}s` }
 */
export interface SplitModelOptions {
  /** Convert the last URL segment before pluralModel. Default: unchanged.
   * @example kebab
   */
  resourceCase?: (value: string) => string
  /** Pluralize the converted last URL segment. Default: unchanged.
   * @example (value) => value === 'person' ? 'people' : value
   */
  pluralModel?: (value: string) => string
}
/** Decoding options. No input document mutation or resource-result caching.
 * @example
 * const options: DeserialiseOptions = { attributeCase: camel, hoistData: true }
 */
export interface DeserialiseOptions {
  /** Convert attribute names to application names. Default: unchanged. Nested keys and extension attributes stay unchanged.
   * Colliding, empty or reserved converted names throw TypeError.
   * @example camel
   */
  attributeCase?: (name: string) => string
  /** Unwrap a decoded document containing only data. Default: false.
   * Document meta, links, jsonapi, errors or included keep the wrapper. Never unwrap attribute objects recursively.
   * Used only by deserialise; deattribute and linkRelationships do not unwrap documents.
   * @example true
   */
  hoistData?: boolean
}
