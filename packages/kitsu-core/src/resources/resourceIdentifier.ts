// https://jsonapi.org/format/#document-resource-object-identification
//
// > As noted above, every resource object MUST contain a type member.
// > Every resource object MUST also contain an id member, except when the resource object originates at the client and represents a new resource to be created on the server.
// > If id is omitted due to this exception, a lid member MAY be included to uniquely identify the resource by type locally within the document.
// > The value of the lid member MUST be identical for every representation of the resource in the document, including resource identifier objects.

import { hasOwnProperty } from '../utilities/hasOwnProperty.js'

export interface LocalResourceIdentifier {
  lid?: string
  type: string
}

export interface RemoteResourceIdentifier {
  id: string
  type: string
}

export type ResourceIdentifier =
  | LocalResourceIdentifier
  | RemoteResourceIdentifier

export function isLocalResource<T extends object>(
  object: T
): object is T & LocalResourceIdentifier {
  return !hasOwnProperty(object, 'id') || hasOwnProperty(object, 'lid')
}

export function isRemoteResource<T extends object>(
  object: T
): object is T & RemoteResourceIdentifier {
  return hasOwnProperty(object, 'id') && !hasOwnProperty(object, 'lid')
}
