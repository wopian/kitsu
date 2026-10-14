import type { JsonObject, SerialiseOptions } from '../types.js'
import { Copies } from './copies.js'
import { copy } from './copy.js'
import { fail } from './members.js'

export const member =
  /^[a-z\d\u0080-\u{10ffff}](?:[\w\u0080-\u{10ffff} -]*[a-z\d\u0080-\u{10ffff}])?$/iu
const asciiMember = /^[a-z\d](?:[\w -]*[a-z\d])?$/i
// Bounded syntax cache contains names only. Resource data and outputs are never cached.
const validNames = new Set<string>()
interface Encoder {
  type: string | undefined
  method: string
  options: SerialiseOptions
  copies?: Copies
}
function valid(value: any): boolean {
  if (typeof value !== 'string') return false
  if (validNames.has(value)) return true
  if (!asciiMember.test(value) && !member.test(value)) return false
  if (validNames.size === 512) validNames.clear()
  validNames.add(value)
  return true
}
function clone(value: any, state: Encoder): any {
  if (
    value === null ||
    (typeof value !== 'object' && typeof value !== 'function' && typeof value !== 'symbol')
  )
    return value
  state.copies ??= new Copies()
  return copy(value, state.copies)
}
function transform(value: string, options: SerialiseOptions): string {
  value = options.camelCaseTypes?.(value) ?? value
  return options.pluralTypes?.(value) ?? value
}
function identifier(input: any, fallback: string, method: string): any {
  if (!input || typeof input !== 'object' || Array.isArray(input))
    fail(`${method} requires an object or array body`)
  if (Object.getPrototypeOf(input) !== Object.prototype) return
  for (const key in input) if (key !== 'id' && key !== 'type') return
  const type = input.type ?? fallback
  if (!valid(type)) fail('Invalid resource type')
  const id = input.id
  if (id === undefined || id === null) fail('Relationship requires id or lid')
  if (typeof id !== 'string' && typeof id !== 'number') fail('Invalid resource id')
  return { type, id: typeof id === 'string' ? id : String(id) }
}
function linkage(value: any, fallback: string, method: string): any {
  if (value == null) return value
  if (!Array.isArray(value)) return identifier(value, fallback, method)
  const output = new Array(value.length)
  for (let index = 0; index < value.length; index++) {
    const target = identifier(value[index], fallback, method)
    if (!target) return
    output[index] = target
  }
  return output
}
function resource(input: any, state: Encoder): any {
  const { method, options } = state
  if (!input || typeof input !== 'object' || Array.isArray(input))
    fail(`${method} requires an object or array body`)
  if (Object.getPrototypeOf(input) !== Object.prototype) return
  if (state.type === undefined) fail(`${method} requires a resource type`)
  const type = transform(state.type, options)
  if (!valid(type)) fail('Invalid resource type')
  const id = input.id
  const result: JsonObject = { type }
  if (id !== undefined && id !== null) {
    if (typeof id !== 'string' && typeof id !== 'number') fail('Invalid resource id')
    result.id = typeof id === 'string' ? id : String(id)
  } else if (method !== 'POST') fail(`${method} requires an ID for the ${type} type`)
  const envelope = input.$
  if (envelope)
    for (const key in envelope) if (key !== 'attributes' && key !== 'relationships') return
  const explicit = envelope?.attributes
  const saved = envelope?.relationships
  let attributes: JsonObject | undefined
  let relationships: JsonObject | undefined
  for (const key in input) {
    if (key === 'id' || key === 'type' || key === '$') continue
    if (explicit && Object.hasOwn(explicit, key)) continue
    if (!valid(key) && !key.startsWith('@')) fail(`Invalid field: ${key}`)
    const value = input[key]
    let related = false
    if (!key.startsWith('@')) {
      if (saved && Object.hasOwn(saved, key)) related = true
      else if (Array.isArray(value)) {
        related = value.length === 0
        for (let index = 0; !related && index < value.length; index++) {
          const item = value[index]
          related =
            !!item &&
            typeof item === 'object' &&
            ('id' in item || 'type' in item || item.$?.lid !== undefined)
        }
      } else
        related =
          !!value &&
          typeof value === 'object' &&
          ('id' in value || 'type' in value || value.$?.lid !== undefined)
    }
    if (related) {
      const targets = linkage(value, transform(key, options), method)
      if (targets === undefined && value !== undefined) return
      relationships ??= {}
      relationships[key] = { data: targets }
    } else {
      attributes ??= {}
      attributes[key] = clone(value, state)
    }
  }
  if (explicit)
    for (const key in explicit) {
      if (key === 'id' || key === 'type' || key === '$' || (!valid(key) && !key.startsWith('@')))
        fail(`Invalid field: ${key}`)
      if (saved && Object.hasOwn(saved, key)) fail(`Field conflict: ${key}`)
      attributes ??= {}
      attributes[key] = clone(explicit[key], state)
    }
  if (saved)
    for (const key in saved) {
      if (!valid(key) || key === 'id' || key === 'type') return
      const relationship = saved[key]
      for (const extra in relationship) if (extra !== 'data') return
      if (!Object.hasOwn(input, key)) {
        if (!('data' in relationship)) return
        const targets = linkage(relationship.data, transform(key, options), method)
        if (targets === undefined && relationship.data !== undefined) return
        relationships ??= {}
        relationships[key] = { data: targets }
      } else {
        const values = Array.isArray(relationship.data)
          ? relationship.data
          : relationship.data
            ? [relationship.data]
            : []
        for (let index = 0; index < values.length; index++)
          for (const extra in values[index]) if (extra !== 'type' && extra !== 'id') return
      }
    }
  if (attributes) result.attributes = attributes
  if (relationships) result.relationships = relationships
  return result
}

/** Encode identifier-only relationships without allocating full resource graph entries.
 * @private
 */
export function encodeIdentifiers(
  type: string | undefined,
  data: any,
  method: string,
  options: SerialiseOptions,
): JsonObject | undefined {
  if (options.relationship || options.document?.included) return
  const state: Encoder = { type, method, options }
  let output: any
  if (data == null) output = data
  else if (Array.isArray(data)) {
    output = new Array(data.length)
    const identities = new Set<any>()
    for (let index = 0; index < data.length; index++) {
      const item = resource(data[index], state)
      if (!item) return
      if (item.id !== undefined && identities.has(item.id)) return
      identities.add(item.id)
      output[index] = item
    }
  } else {
    output = resource(data, state)
    if (!output) return
  }
  const document = options.document
  if (document && ('data' in document || 'errors' in document))
    fail('document cannot override data/errors')
  return document ? { ...clone(document, state), data: output } : { data: output }
}
