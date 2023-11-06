import { JsonKey, JsonValue } from '../resources/json.js'
import {
  isRelationshipObject,
  RelationshipObject
} from '../resources/relationships.js'
import {
  isRemoteResource,
  ResourceIdentifier
} from '../resources/resourceIdentifier.js'
import { ResourceObject } from '../resources/resourceObject.js'
import { hasOwnProperty } from '../utilities/hasOwnProperty.js'
import { error } from './error.js'

// TODO: rename nodes to something more JSON:API like ResourceObject
type Node = any // eslint-disable-line @typescript-eslint/no-explicit-any
type NodeType = ResourceIdentifier['type']
type Method = 'POST' | 'PATCH' | 'DELETE'

interface DeprecatedSerialiseOptions {
  pluralTypes?: (type: string) => string
  camelCaseTypes?: (type: string) => string
}

interface SerialiseOptions {
  typeTransform: (nodeType: NodeType) => NodeType
}

type SerialisableObject = {
  [key: JsonKey]: JsonValue
}

type Serialisable = SerialisableObject | SerialisableObject[]

interface JsonapiDocument {
  data: ResourceObject | ResourceObject[] | null
  // errors: ErrorObjects
  // meta: Meta
  //
  // jsonapi?: unknown
  // links?: Links
  // included?: ResourceObject[]
}

function validateArrayPayload(
  type: NodeType,
  payload: SerialisableObject[],
  method: Method
): void {
  const requireID = new Error(`${method} requires an ID for the ${type} type`)

  if (type === undefined) {
    throw new Error(`${method} requires a resource type`)
  }

  // A POST request is the only request to not require an ID in spec
  if (method !== 'POST' && payload.length > 0)
    for (const resource of payload) {
      if (!hasOwnProperty(resource, 'id')) throw requireID
    }
}

function validateObjectPayload(
  type: NodeType,
  payload: SerialisableObject,
  method: Method
): void {
  const requireID = new Error(`${method} requires an ID for the ${type} type`)

  if (type === undefined) {
    throw new Error(`${method} requires a resource type`)
  }

  if (typeof payload !== 'object' || Object.keys(payload).length === 0) {
    throw new Error(`${method} requires an object or array body`)
  }
  // A POST request is the only request to not require an ID in spec
  if (method !== 'POST' && !hasOwnProperty(payload, 'id')) {
    throw requireID
  }
}

function serialiseRelationOne(node: Node, nodeType?: NodeType) {
  // Handle empty to-one relationship
  if (node === null) return node
  let relation: Partial<RelationshipObject> = {}
  for (const property of Object.keys(node)) {
    if (['id', 'type'].includes(property)) relation[property] = node[property]
    else relation = serialiseAttribute(node[property], property, relation)
  }
  // Guess relationship type if not provided
  if (!relation.type) relation.type = nodeType
  return relation
}

function serialiseRelationMany(node: Node, nodeType: NodeType) {
  const relation = []
  for (const property of node) {
    const serialised = serialiseRelationOne(property)
    // Guess relationship type if not provided
    if (!serialised.type) serialised.type = nodeType
    relation.push(serialised)
  }
  return relation
}

function serialiseRelation(
  node: Node,
  nodeType: NodeType,
  key: keyof SerialisableObject,
  data: Partial<ResourceObject>
) {
  if (!data.relationships) data.relationships = {}

  data.relationships[key] = {} as RelationshipObject // TODO: investigate impact of pre-initializing

  if (node.data !== undefined)
    data.relationships[key].data = Array.isArray(node.data)
      ? serialiseRelationMany(node.data, nodeType)
      : serialiseRelationOne(node.data, nodeType)
  if (node?.links?.self || node?.links?.related)
    data.relationships[key].links = node.links
  if (node?.meta) data.relationships[key].meta = node.meta

  for (const k of Object.keys(node)) {
    if (k.includes(':')) data.relationships[key][k] = node[k]
  }

  return data
}

function serialiseAttribute(
  node: Node,
  key: keyof SerialisableObject,
  data: Partial<ResourceObject>
) {
  if (!data.attributes) data.attributes = {}
  if (
    key === 'links' &&
    (typeof node.self === 'string' || typeof node.related === 'string')
  )
    data.links = node
  else if (
    key === 'meta' &&
    typeof node === 'object' &&
    !Array.isArray(node) &&
    node !== null
  )
    data.meta = node
  else data.attributes[key] = node
  return data
}

function hasID(node: Node) {
  // Handle empty to-one and to-many relationships
  if (
    node?.data === null ||
    (Array.isArray(node?.data) && node?.data?.length === 0)
  )
    return true
  if (!node?.data) return false
  // Check if relationship is to-many
  const nodeData = Array.isArray(node.data) ? node.data[0] : node.data
  return Object.prototype.hasOwnProperty.call(nodeData, 'id')
}

function serialiseRootArray(
  type: NodeType,
  payload: SerialisableObject[],
  method: Method,
  options: SerialiseOptions
) {
  validateArrayPayload(type, payload, method)

  const data: ResourceObject[] = []
  for (const resource of payload) {
    data.push(serialiseRootObject(type, resource, method, options).data)
  }
  return { data }
}

function serialiseRootObject(
  type: NodeType,
  payload: SerialisableObject,
  method: Method,
  options: SerialiseOptions
) {
  validateObjectPayload(type, payload, method)

  type = options.typeTransform(type)
  // ID not required for POST requests
  let data: Partial<ResourceObject> = isRemoteResource(payload)
    ? { type, id: String(payload.id) }
    : { type }

  for (const key in payload) {
    const node = payload[key]
    const nodeType = options.typeTransform(key)
    // 1. Only grab objects, 2. Filter to only serialise relationable objects
    if (hasID(node) || isRelationshipObject(node)) {
      data = serialiseRelation(node, nodeType, key, data)
      // 1. Don't place id/key inside attributes object
    } else if (key !== 'id' && key !== 'type') {
      data = serialiseAttribute(node, key, data)
    }
  }
  return { data: data as ResourceObject }
}

export function serialise(
  type: NodeType,
  data: Serialisable,
  method?: Method,
  options?: SerialiseOptions
): JsonapiDocument
/** @deprecated
 * pluralTypes and camelCaseTypes are deprecated. Use typeTransform instead.
 **/
export function serialise(
  type: NodeType,
  data: Serialisable,
  method?: Method,
  options?: DeprecatedSerialiseOptions
): JsonapiDocument
export function serialise(
  type: NodeType,
  data: Serialisable,
  method: Method = 'POST',
  options: Partial<SerialiseOptions> & DeprecatedSerialiseOptions = {}
): JsonapiDocument {
  try {
    // Delete relationship to-one (data: null) or to-many (data: [])
    if (data === null) return { data: null } // eslint-disable-line unicorn/no-null
    if (Array.isArray(data) && data.length === 0) return { data: [] }

    const options_ = applyDefaultOptions(options)

    return Array.isArray(data)
      ? serialiseRootArray(type, data, method, options_)
      : serialiseRootObject(type, data, method, options_)
  } catch (error_: unknown) {
    throw error(error_)
  }
}

const noop = (type: string) => type

function applyDefaultOptions(
  options: Partial<SerialiseOptions> & DeprecatedSerialiseOptions
): SerialiseOptions {
  if (isSerialiseOptions(options)) {
    return options
  }

  if (options.camelCaseTypes || options.pluralTypes) {
    const camel = options.camelCaseTypes || noop
    const plural = options.pluralTypes || noop
    return { typeTransform: (type: string) => plural(camel(type)) }
  }

  return { typeTransform: noop }
}

function isSerialiseOptions(
  options: Partial<SerialiseOptions> & DeprecatedSerialiseOptions = {}
): options is SerialiseOptions {
  return !!options.typeTransform
}
