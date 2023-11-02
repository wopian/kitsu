import { Attributes } from "./attributes.js";
import { ResourceIdentifier } from "./resource-identifier.js";

type Relationships = void;
type Links = void;
type Meta = void;

export interface _ResourceObject {
  attributes?: Attributes;
  relationships?: Relationships;
  links?: Links;
  meta?: Meta;
}

export type ResourceObject = _ResourceObject & ResourceIdentifier;
