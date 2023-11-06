import {
  isRemoteResource,
  RemoteResourceIdentifier
} from '../resources/resourceIdentifier.js'
import { ResourceObject } from '../resources/resourceObject.js'
import { error } from './error.js'

export function filterIncludes(
  included: ResourceObject[],
  { id, type }: RemoteResourceIdentifier
) {
  try {
    if (id && type) {
      const filtered = included.find(element => {
        return (
          isRemoteResource(element) &&
          element.id === id &&
          element.type === type
        )
      }) || { id, type }
      return Object.assign({}, filtered)
    } else {
      return {}
    }
  } catch (error_: unknown) {
    error(error_)
  }
}
