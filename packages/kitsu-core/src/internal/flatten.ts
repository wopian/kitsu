import type { DeserialiseOptions } from '../types.js'
import { attributeName } from './attributes.js'
import { Copies } from './copies.js'
import { copy } from './copy.js'
import { extensionMember } from './members.js'
/** Flatten a resource already checked by the decoder.
 * @private
 */
export function flatten(data: any, options?: DeserialiseOptions): any {
  const attributes = data.attributes
  const convert = options?.attributeCase
  const result: any = {}
  let seen: Copies | undefined
  for (const key in attributes) {
    if (!Object.hasOwn(attributes, key) || key === 'id' || key === 'type' || key === '$') continue
    const name = convert ? attributeName(key, convert, result, data.relationships) : key
    const value = attributes[key]
    let output = value
    if (
      value !== null &&
      (typeof value === 'object' || typeof value === 'function' || typeof value === 'symbol')
    ) {
      seen ??= new Copies(attributes, result)
      output = copy(value, seen)
    }
    if (name === '__proto__')
      Object.defineProperty(result, name, {
        value: output,
        enumerable: true,
        writable: true,
        configurable: true,
      })
    else result[name] = output
  }
  let envelope: any
  for (const key in data) {
    if (key === 'attributes' || key === 'relationships' || !Object.hasOwn(data, key)) continue
    if (key === 'id') result.id = data.id
    else if (key === 'type') result.type = data.type
    else if (key === 'lid' || key === 'links' || key === 'meta' || extensionMember(key)) {
      envelope ??= {}
      envelope[key] = copy(data[key])
    }
  }
  if (envelope) result.$ = envelope
  return result
}
