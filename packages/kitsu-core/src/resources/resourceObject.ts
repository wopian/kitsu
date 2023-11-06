import { Attributes } from './attributes.js'
import { Meta } from './meta.js'
import { Relationships } from './relationships.js'
import { ResourceIdentifier } from './resourceIdentifier.js'

type Links = void

export interface ResourceObjectFields {
  attributes?: Attributes
  relationships?: Relationships
  links?: Links
  meta?: Meta
}

export type ResourceObject = ResourceObjectFields & ResourceIdentifier
