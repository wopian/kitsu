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
type Metadata = Map<string, { value: JsonObject; position: number }>
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
  copies?: Copies
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
function transform(type: string, state: State): string {
  type = state.options.camelCaseTypes?.(type) ?? type
  return state.options.pluralTypes?.(type) ?? type
}
function plainIdentifier(input: JsonObject, fallback: string): JsonObject {
  const type = input.type ?? fallback
  if (!valid(type)) fail('Invalid resource type')
  const id = input.id
  if (id === undefined || id === null) fail('Relationship requires id or lid')
  if (typeof id !== 'string' && typeof id !== 'number') fail('Invalid resource id')
  return { type, id: typeof id === 'string' ? id : String(id) }
}
function identifierOnly(input: JsonObject): boolean {
  for (const key in input) {
    if (key === 'id' || key === 'type') continue
    if (key !== '$' || !input.$) return false
    for (const member in input.$) if (member !== 'lid') return false
  }
  return true
}
function simple(input: any, options: SerialiseOptions): boolean {
  if (
    options.relationship ||
    options.document?.included ||
    !input ||
    typeof input !== 'object' ||
    Array.isArray(input) ||
    Object.getPrototypeOf(input) !== Object.prototype
  )
    return false
  if (input.$)
    for (const key in input.$) if (key !== 'attributes' && key !== 'relationships') return false
  return true
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
    return plainReference(value, type) ?? { input: [value], position: 0, type, scalar: true }
  const output = new Array(value.length)
  for (let position = 0; position < value.length; position++) {
    const target = plainReference(value[position], type)
    if (!target) return { input: value, output, position, type }
    output[position] = target
  }
  return output
}
function flat(input: JsonObject, type: string, state: State): JsonObject | Frame {
  if (!valid(type)) fail('Invalid resource type')
  const wire: JsonObject = { type }
  const id = input.id
  if (id !== undefined && id !== null) {
    if (typeof id !== 'string' && typeof id !== 'number') fail('Invalid resource id')
    wire.id = typeof id === 'string' ? id : String(id)
  } else if (state.method !== 'POST') fail(`${state.method} requires an ID for the ${type} type`)
  const explicit = input.$?.attributes
  const saved = input.$?.relationships
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
      if (complex) {
        relationships ??= {}
        if (attributes) wire.attributes = attributes
        wire.relationships = relationships
        const keys = Object.keys(saved)
        return {
          input,
          wire,
          keys,
          position: keys.indexOf(name),
          phase: 2,
          root: true,
          explicit,
          saved,
          attributes,
          relationships,
        }
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
  if (!Array.isArray(data) && simple(data, options)) {
    if (type === undefined) fail(`${method} requires a resource type`)
    const output = flat(data, transform(type, state), state)
    if (!('wire' in output))
      return document ? { ...clone(document, state), data: output } : { data: output }
    const graph = new Encoder(method, options, state.copies)
    graph.activate([data], [output.wire])
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
    if (!graph && simple(input, options)) {
      const output = flat(input, resourceType, state)
      const frame = 'wire' in output ? (output as Frame) : undefined
      const wire: JsonObject = frame ? frame.wire : (output as JsonObject)
      wires[position] = wire
      let ids = identities?.get(wire.type)
      if (frame || (wire.id !== undefined && ids?.has(wire.id))) {
        graph = new Encoder(method, options, state.copies)
        graph.activate(inputs, wires, position + 1)
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
        graph = new Encoder(method, options, state.copies)
        graph.activate(inputs, wires, position)
      }
      graph.addRoot(input, resourceType)
    }
  }
  if (!graph && document?.included) {
    graph = new Encoder(method, options, state.copies)
    graph.activate(inputs, wires)
  }
  if (graph) return graph.finish(data)
  const result = document ? clone(document, state) : {}
  result.data = Array.isArray(data) ? wires : data == null ? data : wires[0]
  return result
}
class Encoder {
  #firstSource?: object
  #firstEntry?: Entry
  #visited?: WeakMap<object, Entry>
  #types?: Map<string, { ids: Map<string, Entry>; lids?: Map<string, Entry> }>
  #entries!: Entry[]
  #ordered!: Entry[]
  #edges!: Edge[]
  #stack!: Frame[]
  #roots!: Entry[]
  #method: string
  #options: SerialiseOptions
  #copies?: Copies
  constructor(method: string, options: SerialiseOptions, copies?: Copies) {
    this.#method = method
    this.#options = options
    this.#copies = copies
  }
  #clone(value: any): any {
    if (
      value === null ||
      (typeof value !== 'object' && typeof value !== 'function' && typeof value !== 'symbol')
    )
      return value
    this.#copies ??= new Copies()
    return copy(value, this.#copies)
  }
  #transform(type: string): string {
    type = this.#options.camelCaseTypes?.(type) ?? type
    return this.#options.pluralTypes?.(type) ?? type
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
  activate(inputs: any[], wires: JsonObject[], length = wires.length): void {
    this.#roots = []
    this.#entries = []
    this.#ordered = []
    this.#edges = []
    this.#stack = []
    // Promote completed output in place. Never rebuild attributes or linkage.
    for (let position = 0; position < length; position++) {
      const wire = wires[position]
      const entry = this.#register(wire)
      entry.root = true
      this.#remember(inputs[position], entry)
      this.#roots.push(entry)
      const saved = inputs[position].$?.relationships
      if (saved)
        for (const name of Object.keys(saved)) {
          wire.relationships ??= {}
          if (extensionMember(name)) wire.relationships[name] = this.#clone(saved[name])
          else {
            if (!Object.hasOwn(wire.relationships, name)) wire.relationships[name] = {}
            for (const key of Object.keys(saved[name]))
              if (key !== 'data') put(wire.relationships[name], key, this.#clone(saved[name][key]))
          }
        }
      for (const name of Object.keys(wire.relationships || {})) {
        if (extensionMember(name)) continue
        const metadata = this.#metadata(saved?.[name]?.data)
        const data = wire.relationships[name].data
        const values = Array.isArray(data) ? data : data ? [data] : []
        for (let index = 0; index < values.length; index++) {
          const output = values[index]
          if (!output) continue
          const target = this.#register(metadata ? { ...output } : output, false, true, false)
          this.#edges.push({ output, entry: target, saved: metadata })
        }
      }
    }
  }
  addRoot(input: JsonObject, type: string): void {
    this.#roots.push(this.#enter(input, type, true))
    this.#drain()
  }
  resume(frame: Frame): void {
    if (frame.edge)
      frame.edge.saved = this.#metadata(frame.saved?.[frame.keys[frame.position - 1]]?.data)
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
      this.#entries.push(entry)
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
    const type = root && !this.#options.relationship ? fallback : (input.type ?? fallback)
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
    if (root && this.#method !== 'POST' && output.id === undefined && !this.#options.relationship)
      fail(`${this.#method} requires an ID for the ${fallback} type`)
    if (!root && output.id === undefined && output.lid === undefined)
      fail('Relationship requires id or lid')
    return output
  }
  #enter(input: JsonObject, type: string, root = false): Entry {
    if (!input || typeof input !== 'object' || Array.isArray(input))
      fail(`${this.#method} requires an object or array body`)
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
    if (envelope)
      for (const key of Object.keys(envelope))
        if (key === 'links' || key === 'meta' || extensionMember(key))
          wire[key] = this.#clone(envelope[key])
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
        if (extensionMember(name)) frame.relationships[name] = this.#clone(source)
        else {
          const relationship: JsonObject = {}
          for (const key of Object.keys(source))
            if (key !== 'data') put(relationship, key, this.#clone(source[key]))
          frame.relationships[name] = relationship
        }
      }
    }
    this.#stack.push(frame)
    return entry
  }
  #metadata(data: any): Metadata | undefined {
    if (data == null) return
    const values = Array.isArray(data) ? data : [data]
    let extra = false
    for (let position = 0; !extra && position < values.length; position++)
      for (const key of Object.keys(values[position]))
        if (key === 'meta' || extensionMember(key)) extra = true
    if (!extra) return
    const index: Metadata = new Map()
    // Index all identifiers: an earlier identifier without metadata still wins.
    for (let position = values.length; position--; ) {
      const value = values[position]
      const match = { value, position }
      if (value.id !== undefined) index.set(identity(value), match)
      if (value.lid !== undefined) index.set(identity(value, 'lid'), match)
    }
    return index
  }
  #reference(input: JsonObject, type: string, saved?: Metadata, raw = false): JsonObject {
    let entry: Entry
    let output: JsonObject
    if (raw) {
      const wire = this.#identifier(input, type, false, true)
      entry = this.#register(wire, false, false, false)
      output = { ...wire }
      for (const key of Object.keys(input))
        if (key === 'meta' || extensionMember(key)) output[key] = this.#clone(input[key])
    } else if (
      input &&
      typeof input === 'object' &&
      !Array.isArray(input) &&
      Object.getPrototypeOf(input) === Object.prototype &&
      identifierOnly(input)
    ) {
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
    const type = this.#transform(name)
    const saved = raw ? undefined : this.#metadata(frame.saved?.[name]?.data)
    if (Array.isArray(value)) {
      const output = new Array(value.length)
      relationship.data = output
      if (raw) {
        for (let position = 0; position < value.length; position++)
          output[position] = this.#reference(value[position], type, undefined, true)
      } else if (value.length) frame.edge = { input: value, output, position: 0, type, saved }
    } else relationship.data = value == null ? value : this.#reference(value, type, saved, raw)
  }
  #drain(): void {
    while (this.#stack.length) {
      const frame = this.#stack[this.#stack.length - 1]
      if (frame.edge) {
        const edge = frame.edge
        const position = edge.position++
        const output = this.#reference(edge.input[position], edge.type, edge.saved)
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
        if (frame.root && this.#method === 'POST' && !('data' in relationship))
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
        frame.attributes[name] = this.#clone(frame.explicit?.[name])
        continue
      }
      if (name === 'id' || name === 'type' || name === '$') continue
      if (!valid(name) && !name.startsWith('@')) fail(`Invalid field: ${name}`)
      if (frame.explicit && Object.hasOwn(frame.explicit, name)) continue
      const value = frame.input[name]
      let related = false
      if (!name.startsWith('@')) {
        if (frame.saved && Object.hasOwn(frame.saved, name)) related = true
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
      if (related) this.#relationship(frame, name, value, false)
      else {
        frame.attributes ??= {}
        frame.attributes[name] = this.#clone(value)
      }
    }
  }
  finish(data: any): JsonObject {
    const document = this.#options.document
    const supplied = document?.included
    if (supplied) {
      const resources: JsonObject[] = []
      for (const input of supplied) {
        const wire = this.#clone(input)
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
      if (edge.saved) {
        const byId = entry.id === undefined ? undefined : edge.saved.get(identity(entry))
        const byLid = entry.lid === undefined ? undefined : edge.saved.get(identity(entry, 'lid'))
        const previous = !byId ? byLid : !byLid || byId.position < byLid.position ? byId : byLid
        if (previous)
          for (const key of Object.keys(previous.value))
            if (key === 'meta' || extensionMember(key))
              edge.output[key] = this.#clone(previous.value[key])
      }
    }
    for (const candidate of this.#entries) {
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
      if (!this.#options.relationship) return entry.wire
      const output = this.#identifier(entry.wire, entry.type, false, true)
      for (const key of Object.keys(entry.wire))
        if (key === 'meta' || extensionMember(key)) output[key] = this.#clone(entry.wire[key])
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
        if (key !== 'included') put(result, key, this.#clone(document[key]))
    result.data = Array.isArray(data) ? output : data == null ? data : output[0]
    if (included.length || (document && 'included' in document)) result.included = included
    return result
  }
}
