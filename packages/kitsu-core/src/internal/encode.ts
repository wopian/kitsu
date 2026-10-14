import { isDeepEqual } from '../deepEqual.js'
import type { JsonObject, SerialiseOptions } from '../types.js'
import { Copies } from './copies.js'
import { copy } from './copy.js'
import { extensionMember, extraMember, fail, identity } from './members.js'

const member = /^[a-z\d\u0080-\u{10ffff}](?:[\w\u0080-\u{10ffff} -]*[a-z\d\u0080-\u{10ffff}])?$/iu
const asciiMember = /^[a-z\d](?:[\w -]*[a-z\d])?$/i
// Syntax only: never retain resource values or results between calls.
const validNames = new Set<string>()
function valid(value: any): boolean {
  if (typeof value !== 'string') return false
  if (validNames.has(value)) return true
  if (!asciiMember.test(value) && !member.test(value)) return false
  if (validNames.size === 512) validNames.clear()
  validNames.add(value)
  return true
}
interface Entry {
  type: string
  id?: string
  lid?: string
  wire: JsonObject
  parent?: Entry
  representations?: JsonObject[]
  order: number
  root: boolean
  supplied: boolean
  emitted?: boolean
}
interface MetadataMatch {
  type: string
  id?: string
  lid?: string
  value: JsonObject
}
type Metadata = MetadataMatch[] | Map<string, { value: JsonObject; position: number }>
interface Frame {
  input: JsonObject
  wire: JsonObject
  keys: string[]
  position: number
  phase: number // Input fields, explicit attributes, then saved relationships.
  root: boolean
  explicit?: JsonObject
  saved?: JsonObject
  attributes?: JsonObject
  relationships?: JsonObject
  edge?: {
    input: any[]
    output: any
    position: number
    type: string
    saved?: Metadata
    scalar?: boolean
    raw?: boolean
  }
}
interface Edge {
  output: JsonObject
  entry: Entry
  saved?: Metadata
}
function canonical(entry: Entry): Entry {
  if (entry.parent) entry.parent = canonical(entry.parent)
  return entry.parent || entry
}
function put(output: JsonObject, key: string, value: any): void {
  if (key === '__proto__')
    Object.defineProperty(output, key, {
      value,
      enumerable: true,
      writable: true,
      configurable: true,
    })
  else output[key] = value
}

interface State {
  method: string
  options: SerialiseOptions
  copies?: Copies | WeakMap<object, any>
  pending?: [JsonObject, Metadata][]
}
function clone(value: any, state: State): any {
  if (
    value === null ||
    (typeof value !== 'object' && typeof value !== 'function' && typeof value !== 'symbol')
  )
    return value
  state.copies ??= new Copies()
  return copy(value, state.copies)
}
function copyMetadata(
  input: JsonObject | undefined,
  output: JsonObject,
  state: State,
  links = false,
): void {
  for (const key in input) {
    if (key === 'attributes' || key === 'relationships') continue
    if (
      (key === 'meta' || (links && key === 'links') || extensionMember(key)) &&
      Object.hasOwn(input, key)
    )
      put(output, key, clone(input?.[key], state))
  }
}
function relationshipExtras(source: JsonObject, output: JsonObject, state: State): void {
  for (const key in source)
    if (key !== 'data' && Object.hasOwn(source, key)) put(output, key, clone(source[key], state))
}
function transform(type: string, state: State): string {
  type = state.options.camelCaseTypes?.(type) ?? type
  return state.options.pluralTypes?.(type) ?? type
}
function identifierOnly(input: JsonObject): boolean {
  for (const key in input) {
    if (key === 'id' || key === 'type') continue
    if (key !== '$' || !input.$) return false
    for (const member in input.$) if (member !== 'lid') return false
  }
  return true
}
function plainObject(input: any): boolean {
  return (
    !!input &&
    typeof input === 'object' &&
    !Array.isArray(input) &&
    Object.getPrototypeOf(input) === Object.prototype
  )
}
function simple(input: any, options: SerialiseOptions): number {
  if (
    options.relationship ||
    options.document?.included ||
    !input ||
    typeof input !== 'object' ||
    Array.isArray(input) ||
    Object.getPrototypeOf(input) !== Object.prototype
  )
    return 0
  const envelope = input.$
  if (envelope) {
    if ('lid' in Object(envelope)) return 0
    for (const key in envelope) if (key !== 'attributes' && key !== 'relationships') return 2
  }
  return 1
}
function plainIdentifier(input: JsonObject, fallback: string): JsonObject {
  const type = input.type ?? fallback
  if (!valid(type)) fail('Invalid resource type')
  const id = input.id
  if (id === undefined || id === null) fail('Relationship requires id or lid')
  if (typeof id !== 'string' && typeof id !== 'number') fail('Invalid resource id')
  return { type, id: typeof id === 'string' ? id : String(id) }
}
function plainReference(input: any, fallback: string): JsonObject | undefined {
  if (
    !input ||
    typeof input !== 'object' ||
    Array.isArray(input) ||
    Object.getPrototypeOf(input) !== Object.prototype
  )
    return
  for (const key in input) if (key !== 'id' && key !== 'type') return
  const type = input.type ?? fallback
  if (!valid(type)) fail('Invalid resource type')
  const id = input.id
  if (id === undefined || id === null) fail('Relationship requires id or lid')
  if (typeof id !== 'string' && typeof id !== 'number') fail('Invalid resource id')
  return { type, id: typeof id === 'string' ? id : String(id) }
}
function linkage(value: any, type: string): any {
  if (value == null) return value
  if (!Array.isArray(value))
    return (
      plainReference(value, type) ?? {
        input: [value],
        position: 0,
        type,
        scalar: true,
      }
    )
  const output = new Array(value.length)
  for (let position = 0; position < value.length; position++) {
    const target = plainReference(value[position], type)
    if (!target) return { input: value, output, position, type }
    output[position] = target
  }
  return output
}
function metadata(data: any): Metadata | undefined {
  if (data == null) return
  const values = Array.isArray(data) ? data : [data]
  for (let position = 0; position < values.length; position++) {
    const value = values[position]
    for (const key in value)
      if (
        key !== 'id' &&
        key !== 'type' &&
        key !== 'lid' &&
        (key === 'meta' || extensionMember(key)) &&
        Object.hasOwn(value, key)
      )
        return metadataIndex(values)
  }
}
function metadataIndex(values: JsonObject[]): Metadata {
  if (values.length <= 4) {
    const matches: MetadataMatch[] = []
    for (const value of values) {
      const { type, id, lid } = value
      if (
        typeof type !== 'string' ||
        (id !== undefined && typeof id !== 'string') ||
        (lid !== undefined && typeof lid !== 'string')
      )
        break
      matches.push({ type, id, lid, value })
    }
    if (matches.length === values.length) return matches
  }
  const index: Metadata = new Map()
  for (let position = values.length; position--; ) {
    const value = values[position]
    const match = { value, position }
    if (value.id !== undefined) index.set(identity(value), match)
    if (value.lid !== undefined) index.set(identity(value, 'lid'), match)
  }
  return index
}
function attachMetadata(
  output: JsonObject,
  target: JsonObject,
  saved: Metadata,
  state: State,
): void {
  if (Array.isArray(saved)) {
    for (const match of saved)
      if (
        match.type === target.type &&
        ((match.id !== undefined && match.id === target.id) ||
          (match.lid !== undefined && match.lid === target.lid))
      ) {
        copyMetadata(match.value, output, state)
        return
      }
    return
  }
  const byId = target.id === undefined ? undefined : saved.get(identity(target))
  const byLid = target.lid === undefined ? undefined : saved.get(identity(target, 'lid'))
  const previous = !byId ? byLid : !byLid || byId.position < byLid.position ? byId : byLid
  if (previous) copyMetadata(previous.value, output, state)
}
function finishFlat(state: State): void {
  if (state.pending)
    for (const [relationship, saved] of state.pending) {
      const data = relationship.data
      if (Array.isArray(data))
        for (const output of data) attachMetadata(output, output, saved, state)
      else if (data != null) attachMetadata(data, data, saved, state)
    }
}
function identifierValue(value: any): boolean {
  return (
    !!value &&
    typeof value === 'object' &&
    ('id' in value || 'type' in value || value.$?.lid !== undefined)
  )
}
function relationshipValue(value: any, name: string, saved?: JsonObject): boolean {
  if (name.startsWith('@')) return false
  if (saved && Object.hasOwn(saved, name)) return true
  if (!Array.isArray(value)) return identifierValue(value)
  if (!value.length) return true
  for (let position = 0; position < value.length; position++)
    if (identifierValue(value[position])) return true
  return false
}
function richRelationships(
  input: JsonObject,
  wire: JsonObject,
  state: State,
  explicit: JsonObject | undefined,
  saved: JsonObject,
  relationships: JsonObject | undefined,
  attributes: JsonObject | undefined,
  start: number,
): JsonObject | Frame {
  if (saved) {
    const names = Object.keys(saved)
    for (let savedPosition = start; savedPosition < names.length; savedPosition++) {
      const name = names[savedPosition]
      const source = saved[name]
      relationships ??= {}
      if (extensionMember(name)) {
        relationships[name] = clone(source, state)
        continue
      }
      if (!valid(name) || name === 'id' || name === 'type') fail(`Invalid field: ${name}`)
      const direct = Object.hasOwn(input, name)
      if (!Object.hasOwn(relationships, name)) relationships[name] = {}
      const relationship = relationships[name]
      relationshipExtras(source, relationship, state)
      const data = source.data
      if (!direct && 'data' in source) {
        const value = linkage(data, transform(name, state))
        if (value && !Array.isArray(value) && 'input' in value) {
          if (value.scalar) value.output = relationship
          else relationship.data = value.output
          value.raw = true
          if (attributes) wire.attributes = attributes
          wire.relationships = relationships
          const keys = Object.keys(saved)
          return {
            input,
            wire,
            keys,
            position: keys.indexOf(name) + 1,
            phase: 2,
            edge: value,
            root: true,
            explicit,
            saved,
            attributes,
            relationships,
          }
        }
        relationship.data = value
      } else if (direct) {
        const savedMetadata = metadata(data)
        if (savedMetadata) {
          state.pending ??= []
          state.pending.push([relationship, savedMetadata])
        }
      }
      if (!('data' in relationship)) {
        if (!Object.keys(relationship).length) fail(`Empty relationship: ${name}`)
        if (state.method === 'POST') fail(`POST requires data: ${name}`)
      }
    }
  }
  if (relationships) wire.relationships = relationships
  return wire
}
function flat(input: JsonObject, type: string, state: State, rich: boolean): JsonObject | Frame {
  if (!valid(type)) fail('Invalid resource type')
  const wire: JsonObject = { type }
  const id = input.id
  if (id !== undefined && id !== null) {
    if (typeof id !== 'string' && typeof id !== 'number') fail('Invalid resource id')
    wire.id = typeof id === 'string' ? id : String(id)
  } else if (state.method !== 'POST') fail(`${state.method} requires an ID for the ${type} type`)
  const envelope = input.$
  if (rich) copyMetadata(envelope, wire, state, true)
  const explicit = envelope?.attributes
  const saved = envelope?.relationships
  let attributes: JsonObject | undefined
  let relationships: JsonObject | undefined
  for (const name in input) {
    if (name === 'id' || name === 'type' || name === '$') continue
    if (explicit && Object.hasOwn(explicit, name)) continue
    if (!Object.hasOwn(input, name)) continue
    if (!valid(name) && !name.startsWith('@')) fail(`Invalid field: ${name}`)
    const value = input[name]
    let related = false
    if (!name.startsWith('@')) {
      if (saved && Object.hasOwn(saved, name)) related = true
      else if (Array.isArray(value)) {
        related = value.length === 0
        for (let position = 0; !related && position < value.length; position++) {
          const item = value[position]
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
      const targets = linkage(value, transform(name, state))
      relationships ??= {}
      if (targets && !Array.isArray(targets) && 'input' in targets) {
        const relationship: JsonObject = {}
        relationships[name] = relationship
        if (targets.scalar) targets.output = relationship
        else relationship.data = targets.output
        if (attributes) wire.attributes = attributes
        wire.relationships = relationships
        const keys = Object.keys(input)
        return {
          input,
          wire,
          keys,
          position: keys.indexOf(name) + 1,
          phase: 0,
          root: true,
          explicit,
          saved,
          attributes,
          relationships,
          edge: targets,
        }
      }
      relationships[name] = { data: targets }
    } else {
      attributes ??= {}
      attributes[name] = clone(value, state)
    }
  }
  if (explicit)
    for (const name in explicit) {
      if (!Object.hasOwn(explicit, name)) continue
      if (
        name === 'id' ||
        name === 'type' ||
        name === '$' ||
        (!valid(name) && !name.startsWith('@'))
      )
        fail(`Invalid field: ${name}`)
      if (saved && Object.hasOwn(saved, name)) fail(`Field conflict: ${name}`)
      attributes ??= {}
      attributes[name] = clone(explicit[name], state)
    }
  if (saved)
    for (const name in saved) {
      if (!Object.hasOwn(saved, name)) continue
      let complex = extensionMember(name)
      const source = saved[name]
      for (const key in source) if (key !== 'data') complex = true
      const data = source.data
      const values = Array.isArray(data) ? data : data == null ? [] : [data]
      for (let position = 0; !complex && position < values.length; position++)
        for (const key in values[position]) if (key !== 'id' && key !== 'type') complex = true
      if (!Object.hasOwn(input, name))
        for (const value of values) if (value && 'lid' in Object(value)) complex = true
      if (complex) {
        if (attributes) wire.attributes = attributes
        const keys = Object.keys(saved)
        return richRelationships(
          input,
          wire,
          state,
          explicit,
          saved,
          relationships,
          attributes,
          keys.indexOf(name),
        )
      }
      if (!valid(name) || name === 'id' || name === 'type') fail(`Invalid field: ${name}`)
      if (!Object.hasOwn(input, name)) {
        if (!('data' in source)) fail(`Empty relationship: ${name}`)
        const type = transform(name, state)
        const value =
          data == null
            ? data
            : Array.isArray(data)
              ? data.map((input) => plainIdentifier(input, type))
              : plainIdentifier(data, type)
        relationships ??= {}
        relationships[name] = { data: value }
      }
    }
  if (attributes) wire.attributes = attributes
  if (relationships) wire.relationships = relationships
  return wire
}
/** Encode plain values directly and promote completed output when graph state becomes necessary.
 * @private
 */
export function encode(
  type: string | undefined,
  data: any,
  method: string,
  options: SerialiseOptions,
): JsonObject {
  const document = options.document
  if (document && ('data' in document || 'errors' in document))
    fail('document cannot override data/errors')
  const state: State = { method, options }
  if (Array.isArray(data) && data.length > 16) state.copies = new WeakMap()
  const plain = !Array.isArray(data) && simple(data, options)
  if (plain) {
    if (type === undefined) fail(`${method} requires a resource type`)
    const output = flat(data, transform(type, state), state, plain === 2)
    if (!('wire' in output)) {
      if (state.pending) finishFlat(state)
      return document ? { ...clone(document, state), data: output } : { data: output }
    }
    const graph = new Encoder(state)
    graph.activate([data], [output.wire], 1, output as Frame)
    graph.resume(output as Frame)
    return graph.finish(data)
  }
  const inputs = Array.isArray(data) ? data : data == null ? [] : [data]
  const wires: JsonObject[] = new Array(inputs.length)
  let graph: Encoder | undefined
  let identities: Map<string, Set<string>> | undefined
  for (let position = 0; position < inputs.length; position++) {
    const input = inputs[position]
    if (type === undefined) fail(`${method} requires a resource type`)
    const resourceType = transform(type, state)
    const plain = !graph && simple(input, options)
    if (plain) {
      const output = flat(input, resourceType, state, plain === 2)
      const frame = 'wire' in output ? (output as Frame) : undefined
      const wire: JsonObject = frame ? frame.wire : (output as JsonObject)
      wires[position] = wire
      let ids = identities?.get(wire.type)
      if (frame || (wire.id !== undefined && ids?.has(wire.id))) {
        graph = new Encoder(state)
        graph.activate(inputs, wires, position + 1, frame)
        if (frame) graph.resume(frame)
      } else if (wire.id !== undefined) {
        identities ??= new Map()
        if (!ids) {
          ids = new Set()
          identities.set(wire.type, ids)
        }
        ids.add(wire.id)
      }
    } else {
      if (!graph) {
        graph = new Encoder(state)
        graph.activate(inputs, wires, position)
      }
      graph.addRoot(input, resourceType)
    }
  }
  if (!graph && document?.included) {
    graph = new Encoder(state)
    graph.activate(inputs, wires)
  }
  if (graph) return graph.finish(data)
  if (state.pending) finishFlat(state)
  const result = document ? clone(document, state) : {}
  result.data = Array.isArray(data) ? wires : data == null ? data : wires[0]
  return result
}
class Encoder {
  #firstSource?: object
  #firstEntry?: Entry
  #visited?: WeakMap<object, Entry>
  #types?: Map<string, { ids: Map<string, Entry>; lids?: Map<string, Entry> }>
  #ordered: Entry[] = []
  #edges: Edge[] = []
  #stack: Frame[] = []
  #roots: Entry[] = []
  #state: State
  #pending?: Map<JsonObject, Metadata>
  constructor(state: State) {
    this.#state = state
    if (state.pending) this.#pending = new Map(state.pending)
  }
  #remember(input: object, entry: Entry): void {
    if (!this.#firstSource) {
      this.#firstSource = input
      this.#firstEntry = entry
    } else {
      this.#visited ??= new WeakMap([[this.#firstSource, this.#firstEntry as Entry]])
      this.#visited.set(input, entry)
    }
  }
  activate(inputs: any[], wires: JsonObject[], length = wires.length, frame?: Frame): void {
    for (let position = 0; position < length; position++) {
      const wire = wires[position]
      const entry = this.#register(wire)
      entry.root = true
      this.#remember(inputs[position], entry)
      this.#roots.push(entry)
      const incomplete = position === length - 1 ? frame : undefined
      if (incomplete?.saved) {
        const savedPhase = incomplete.phase === 2
        const names = savedPhase ? incomplete.keys : Object.keys(incomplete.saved)
        for (let index = savedPhase ? incomplete.position : 0; index < names.length; index++) {
          const name = names[index]
          const source = incomplete.saved[name]
          wire.relationships ??= {}
          if (extensionMember(name)) wire.relationships[name] = clone(source, this.#state)
          else {
            if (!Object.hasOwn(wire.relationships, name)) wire.relationships[name] = {}
            relationshipExtras(source, wire.relationships[name], this.#state)
          }
        }
      }
      for (const name of Object.keys(wire.relationships || {})) {
        if (extensionMember(name)) continue
        const relationship = wire.relationships[name]
        const raw = !Object.hasOwn(inputs[position], name)
        const saved = incomplete && !raw ? metadata(incomplete.saved?.[name]?.data) : undefined
        const data = relationship.data
        const values = Array.isArray(data) ? data : data ? [data] : []
        for (const output of values) {
          if (!output) continue
          const pending = this.#pending?.get(relationship)
          const target = this.#register(
            pending || saved ? { type: output.type, id: output.id } : output,
            false,
            !raw,
            false,
          )
          this.#edges.push({
            output,
            entry: target,
            saved: pending || saved,
          })
        }
      }
    }
  }
  addRoot(input: JsonObject, type: string): void {
    this.#roots.push(this.#enter(input, type, true))
    this.#drain()
  }
  resume(frame: Frame): void {
    if (frame.edge && !frame.edge.raw)
      frame.edge.saved = metadata(frame.saved?.[frame.keys[frame.position - 1]]?.data)
    this.#stack.push(frame)
    this.#drain()
  }
  #merge(left: Entry, right: Entry): Entry {
    left = canonical(left)
    right = canonical(right)
    if (left === right) return left
    if (right.order < left.order) [left, right] = [right, left]
    for (const key of ['id', 'lid'] as const) {
      if (left[key] !== undefined && right[key] !== undefined && left[key] !== right[key])
        fail('Conflicting resources')
      left[key] ??= right[key]
    }
    left.representations ??= [left.wire]
    left.representations.push(...(right.representations || [right.wire]))
    left.root ||= right.root
    left.supplied ||= right.supplied
    right.parent = left
    return left
  }
  #register(wire: JsonObject, supplied = false, ordered = true, representation = true): Entry {
    const { type, id, lid } = wire
    let entry: Entry | undefined
    let index: { ids: Map<string, Entry>; lids?: Map<string, Entry> } | undefined
    if (id !== undefined || lid !== undefined) {
      this.#types ??= new Map()
      index = this.#types.get(type)
      if (!index) {
        index = { ids: new Map() }
        this.#types.set(type, index)
      }
      const byId = id !== undefined ? index.ids.get(id) : undefined
      const byLid = lid !== undefined ? index.lids?.get(lid) : undefined
      entry = byId ? canonical(byId) : byLid ? canonical(byLid) : undefined
      if (byId && byLid) entry = this.#merge(byId, byLid)
    }
    if (entry) {
      for (const key of ['id', 'lid'] as const) {
        if (entry[key] !== undefined && wire[key] !== undefined && entry[key] !== wire[key])
          fail('Conflicting resources')
        entry[key] ??= wire[key]
      }
      if (representation) {
        entry.representations ??= [entry.wire]
        entry.representations.push(wire)
      }
      entry.supplied ||= supplied
      if (ordered && entry.order === Infinity) {
        entry.order = this.#ordered.length
        this.#ordered.push(entry)
      }
    } else {
      entry = {
        type,
        id,
        lid,
        wire,
        order: ordered ? this.#ordered.length : Infinity,
        root: false,
        supplied,
      }
      if (ordered) this.#ordered.push(entry)
    }
    if (index) {
      if (entry.id !== undefined) index.ids.set(entry.id, entry)
      if (entry.lid !== undefined) {
        index.lids ??= new Map()
        index.lids.set(entry.lid, entry)
      }
    }
    return entry
  }
  #identifier(input: JsonObject, fallback: string, root: boolean, raw = false): JsonObject {
    const type = root && !this.#state.options.relationship ? fallback : (input.type ?? fallback)
    if (!valid(type)) fail('Invalid resource type')
    const output: JsonObject = { type }
    const id = input.id
    const lid = raw ? input.lid : input.$?.lid
    if (id !== undefined && id !== null) {
      if (typeof id !== 'string' && typeof id !== 'number') fail('Invalid resource id')
      output.id = typeof id === 'string' ? id : String(id)
    }
    if (lid !== undefined) {
      if (typeof lid !== 'string') fail('Invalid resource lid')
      output.lid = lid
    }
    if (
      root &&
      this.#state.method !== 'POST' &&
      output.id === undefined &&
      !this.#state.options.relationship
    )
      fail(`${this.#state.method} requires an ID for the ${fallback} type`)
    if (!root && output.id === undefined && output.lid === undefined)
      fail('Relationship requires id or lid')
    return output
  }
  #enter(input: JsonObject, type: string, root = false): Entry {
    if (!input || typeof input !== 'object' || Array.isArray(input))
      fail(`${this.#state.method} requires an object or array body`)
    if (input === this.#firstSource) {
      const entry = canonical(this.#firstEntry as Entry)
      entry.root ||= root
      return entry
    }
    const seen = this.#visited?.get(input)
    if (seen) {
      const entry = canonical(seen)
      entry.root ||= root
      return entry
    }
    const original = input
    if (Object.getPrototypeOf(input) !== Object.prototype) input = { ...input }
    const wire = this.#identifier(input, type, root)
    const entry = this.#register(wire)
    entry.root ||= root
    this.#remember(original, entry)
    const envelope = input.$
    copyMetadata(envelope, wire, this.#state, true)
    const frame: Frame = {
      input,
      wire,
      keys: Object.keys(input),
      position: 0,
      phase: 0,
      root,
      explicit: envelope?.attributes,
      saved: envelope?.relationships,
    }
    if (frame.saved) {
      frame.relationships = {}
      for (const name of Object.keys(frame.saved)) {
        const source = frame.saved[name]
        if (extensionMember(name)) frame.relationships[name] = clone(source, this.#state)
        else {
          const relationship: JsonObject = {}
          relationshipExtras(source, relationship, this.#state)
          frame.relationships[name] = relationship
        }
      }
    }
    this.#stack.push(frame)
    return entry
  }
  #reference(input: JsonObject, type: string, saved?: Metadata, raw = false): JsonObject {
    let entry: Entry
    let output: JsonObject
    if (raw) {
      const wire = this.#identifier(input, type, false, true)
      entry = this.#register(wire, false, false, false)
      output = { ...wire }
      copyMetadata(input, output, this.#state)
    } else if (plainObject(input) && identifierOnly(input)) {
      output = this.#identifier(input, type, false)
      entry = this.#register(saved ? { ...output } : output, false, true, false)
    } else {
      entry = this.#enter(input, type)
      const target = canonical(entry)
      output = { type: target.type }
      if (target.id !== undefined) output.id = target.id
      if (target.lid !== undefined) output.lid = target.lid
    }
    this.#edges.push({ output, entry, saved })
    return output
  }
  #relationship(frame: Frame, name: string, value: any, raw: boolean): void {
    frame.relationships ??= {}
    if (!Object.hasOwn(frame.relationships, name)) frame.relationships[name] = {}
    const relationship = frame.relationships[name]
    const type = transform(name, this.#state)
    const saved = raw ? undefined : metadata(frame.saved?.[name]?.data)
    if (Array.isArray(value)) {
      const output = new Array(value.length)
      relationship.data = output
      if (value.length) frame.edge = { input: value, output, position: 0, type, saved, raw }
    } else relationship.data = value == null ? value : this.#reference(value, type, saved, raw)
  }
  #drain(): void {
    while (this.#stack.length) {
      const frame = this.#stack[this.#stack.length - 1]
      if (frame.edge) {
        const edge = frame.edge
        const position = edge.position++
        const output = this.#reference(edge.input[position], edge.type, edge.saved, edge.raw)
        if (edge.scalar) edge.output.data = output
        else edge.output[position] = output
        if (edge.position === edge.input.length) frame.edge = undefined
        continue
      }
      if (frame.position === frame.keys.length) {
        frame.position = 0
        frame.phase++
        if (frame.phase === 1) frame.keys = frame.explicit ? Object.keys(frame.explicit) : []
        else if (frame.phase === 2) frame.keys = frame.saved ? Object.keys(frame.saved) : []
        else {
          if (frame.attributes) frame.wire.attributes = frame.attributes
          if (frame.relationships && Object.keys(frame.relationships).length)
            frame.wire.relationships = frame.relationships
          this.#stack.pop()
        }
        continue
      }
      const name = frame.keys[frame.position++]
      if (frame.phase === 2) {
        if (extensionMember(name)) continue
        if (!valid(name) || name === 'id' || name === 'type') fail(`Invalid field: ${name}`)
        const relationship = frame.relationships?.[name] as JsonObject
        const source = frame.saved?.[name]
        if (!Object.hasOwn(frame.input, name) && 'data' in source)
          this.#relationship(frame, name, source.data, true)
        if (!Object.keys(relationship).length) fail(`Empty relationship: ${name}`)
        if (frame.root && this.#state.method === 'POST' && !('data' in relationship))
          fail(`POST requires data: ${name}`)
        continue
      }
      if (frame.phase === 1) {
        if (
          name === 'id' ||
          name === 'type' ||
          name === '$' ||
          (!valid(name) && !name.startsWith('@'))
        )
          fail(`Invalid field: ${name}`)
        if (frame.saved && Object.hasOwn(frame.saved, name)) fail(`Field conflict: ${name}`)
        frame.attributes ??= {}
        frame.attributes[name] = clone(frame.explicit?.[name], this.#state)
        continue
      }
      if (name === 'id' || name === 'type' || name === '$') continue
      if (!valid(name) && !name.startsWith('@')) fail(`Invalid field: ${name}`)
      if (frame.explicit && Object.hasOwn(frame.explicit, name)) continue
      const value = frame.input[name]
      const related = relationshipValue(value, name, frame.saved)
      if (related) this.#relationship(frame, name, value, false)
      else {
        frame.attributes ??= {}
        frame.attributes[name] = clone(value, this.#state)
      }
    }
  }
  finish(data: any): JsonObject {
    const document = this.#state.options.document
    const supplied = document?.included
    if (supplied) {
      const resources: JsonObject[] = []
      for (const input of supplied) {
        const wire = clone(input, this.#state)
        this.#register(wire, true)
        resources.push(wire)
      }
      for (const wire of resources)
        for (const name of Object.keys(wire.relationships || {})) {
          const relationship = wire.relationships[name]
          if (
            extensionMember(name) ||
            !relationship ||
            typeof relationship !== 'object' ||
            !('data' in relationship)
          )
            continue
          const data = relationship.data
          if (Array.isArray(data))
            for (let position = 0; position < data.length; position++)
              data[position] = this.#reference(data[position], data[position].type, undefined, true)
          else if (data != null)
            relationship.data = this.#reference(data, data.type, undefined, true)
        }
    }
    for (const edge of this.#edges) {
      const entry = canonical(edge.entry)
      if (entry.id !== undefined) edge.output.id = entry.id
      if (entry.lid !== undefined) edge.output.lid = entry.lid
      if (edge.saved) attachMetadata(edge.output, entry, edge.saved, this.#state)
    }
    for (const candidate of this.#ordered) {
      const entry = canonical(candidate)
      if (entry !== candidate) continue
      const representations = entry.representations || [entry.wire]
      let full: JsonObject | undefined
      for (const wire of representations) {
        if (entry.id !== undefined) wire.id = entry.id
        if (entry.lid !== undefined) wire.lid = entry.lid
        if (Object.keys(wire).some(extraMember)) {
          if (full && !isDeepEqual(full, wire)) fail('Conflicting resources')
          full ??= wire
        }
      }
      entry.wire = full || entry.wire
    }
    const output = this.#roots.map((value) => {
      const entry = canonical(value)
      if (!this.#state.options.relationship) return entry.wire
      const output = this.#identifier(entry.wire, entry.type, false, true)
      copyMetadata(entry.wire, output, this.#state)
      return output
    })
    const included: JsonObject[] = []
    for (const value of this.#ordered) {
      const entry = canonical(value)
      if (entry.emitted) continue
      entry.emitted = true
      if (!entry.root && (entry.supplied || Object.keys(entry.wire).some(extraMember)))
        included.push(entry.wire)
    }
    const result: JsonObject = {}
    if (document)
      for (const key of Object.keys(document))
        if (key !== 'included') put(result, key, clone(document[key], this.#state))
    result.data = Array.isArray(data) ? output : data == null ? data : output[0]
    if (included.length || (document && 'included' in document)) result.included = included
    return result
  }
}
