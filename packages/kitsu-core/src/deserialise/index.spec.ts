import { describe, expect, it } from 'bun:test'
import { deserialise } from '../deserialise.js'

describe('kitsu-core deserialise', () => {
  it('keeps alternating types, unresolved targets, and document-local identity separate', () => {
    const resources = ['people', 'articles', 'people', 'comments'].map((type, index) =>
      Object.freeze({
        type,
        id: String(index),
        attributes: Object.freeze({ value: index }),
        relationships: Object.freeze({
          targets: Object.freeze({
            data: Object.freeze([
              Object.freeze({ type: 'people', id: '0' }),
              Object.freeze({ type: 'missing', id: '0' }),
              Object.freeze({ type: 'articles', id: '1' }),
              Object.freeze({ type: 'people', id: '2' }),
              Object.freeze({ type: 'missing', id: '1' }),
            ]),
          }),
        }),
      }),
    )
    const input = Object.freeze({ data: Object.freeze(resources) })
    const first = deserialise(input)
    const second = deserialise(input)
    for (const resource of first.data) {
      expect(resource.targets[0]).toBe(first.data[0])
      expect(resource.targets[1]).toEqual({ type: 'missing', id: '0' })
      expect(resource.targets[2]).toBe(first.data[1])
      expect(resource.targets[3]).toBe(first.data[2])
      expect(resource.targets[4]).toEqual({ type: 'missing', id: '1' })
      expect(resource.targets[0]).not.toBe(second.data[0])
    }
    expect(first.data[0].targets[0]).toBe(first.data[0])
    expect(input.data[0].attributes).toEqual({ value: 0 })
  })
  it('preserves all identifier metadata after the first metadata member', () => {
    const linkage = [
      { type: 'people', id: '1', meta: { position: 0 }, 'audit:revision': [1] },
      { type: 'people', id: '2', meta: { position: 1 }, 'audit:revision': [2] },
    ]
    const relationships = Object.assign(Object.create({ inherited: { data: null } }), {
      people: { data: linkage },
      owner: { data: linkage[0] },
    })
    const output = deserialise({ data: { type: 'articles', id: '1', relationships } }).data
    expect(Object.hasOwn(output, 'inherited')).toBe(false)
    expect(output.people).toEqual([
      { type: 'people', id: '1' },
      { type: 'people', id: '2' },
    ])
    expect(output.$.relationships.people.data).toEqual(linkage)
    expect(output.$.relationships.owner.data).toEqual(linkage[0])
    expect(output.$.relationships.people.data).not.toBe(linkage)
    expect(output.$.relationships.people.data[1].meta).not.toBe(linkage[1].meta)
    output.$.relationships.people.data[0]['audit:revision'].push(3)
    expect(linkage[0]['audit:revision']).toEqual([1])
  })
  it('distinguishes repeated ids across types without sharing resources between documents', () => {
    const input = {
      data: [
        { type: 'people', id: '__proto__', attributes: { name: 'Ada' } },
        { type: 'articles', id: '__proto__', attributes: { title: 'Hello' } },
      ],
      included: [
        {
          type: 'comments',
          id: 'constructor',
          relationships: {
            author: { data: { type: 'people', id: '__proto__' } },
            article: { data: { type: 'articles', id: '__proto__' } },
          },
        },
      ],
    }
    const first = deserialise(input)
    const second = deserialise(input)
    expect(first.included[0].author).toBe(first.data[0])
    expect(first.included[0].article).toBe(first.data[1])
    expect(first.data[0]).not.toBe(first.data[1])
    expect(first.included[0].author).not.toBe(second.included[0].author)
  })
  it('keeps reserved attributes, inherited fields, and literal prototype keys separate', () => {
    const attributes = Object.assign(Object.create({ ignored: true }), {
      type: 'wrong',
      id: 'wrong',
      $: 'wrong',
      title: 'Hello',
    })
    Object.defineProperty(attributes, '__proto__', { value: { safe: true }, enumerable: true })
    const output = deserialise({ data: { type: 'articles', id: '1', attributes } }).data
    expect(output.type).toBe('articles')
    expect(output.id).toBe('1')
    expect(output.$).toBeUndefined()
    expect(output.ignored).toBeUndefined()
    expect(Object.getPrototypeOf(output)).toBe(Object.prototype)
    expect(Object.hasOwn(output, '__proto__')).toBe(true)
    const own = Object.getOwnPropertyDescriptor(output, '__proto__')?.value
    expect(own).toEqual({ safe: true })
    expect(own).not.toBe(Object.getOwnPropertyDescriptor(attributes, '__proto__')?.value)
  })
  it('falls back after a late duplicate while retaining canonical collection references', () => {
    const output = deserialise({
      data: [
        { type: 'articles', id: '1', attributes: { title: 'Hello' } },
        { type: 'articles', id: '2' },
      ],
      included: [{ type: 'articles', id: '1', meta: { supplied: true } }],
    })
    expect(output.data[0]).toBe(output.included[0])
    expect(output.data[0]).toEqual({
      type: 'articles',
      id: '1',
      title: 'Hello',
      $: { meta: { supplied: true } },
    })
    expect(output.data[1]).toEqual({ type: 'articles', id: '2' })
  })
  it('handles missing responses', () => {
    expect(deserialise(undefined)).toBeUndefined()
    expect(deserialise(null)).toBeUndefined()
    expect(deserialise('')).toBeUndefined()
  })
  it('flattens single resources and collections without mutation', () => {
    const input = {
      data: [
        { type: 'people', id: '1', attributes: { name: 'Ada' } },
        { type: 'people', id: '2' },
      ],
    }
    expect(deserialise(input)).toEqual({
      data: [
        { type: 'people', id: '1', name: 'Ada' },
        { type: 'people', id: '2' },
      ],
    })
    expect(input.data[0].attributes).toEqual({ name: 'Ada' })
    expect(deserialise({ data: input.data[0] })).toEqual({
      data: { type: 'people', id: '1', name: 'Ada' },
    })
  })
  it('keeps resource metadata apart from attributes with the same names', () => {
    expect(
      deserialise({
        data: {
          type: 'people',
          id: '1',
          attributes: { meta: null, links: [] },
          meta: {},
          links: { self: null },
        },
      }),
    ).toEqual({
      data: {
        type: 'people',
        id: '1',
        meta: null,
        links: [],
        $: { meta: {}, links: { self: null } },
      },
    })
  })
  it('ignores unknown document and resource members', () => {
    expect(deserialise({ data: { type: 'people', id: '1', unknown: 1 }, unknown: 2 })).toEqual({
      data: { type: 'people', id: '1' },
    })
  })
  it('copies nested JSON, metadata, and literal prototype keys without sharing input', () => {
    const payload = JSON.parse(
      '{"__proto__":{"flag":true},"constructor":{"value":1},"nested":[{"data":null}]}',
    )
    const input = {
      data: { type: 'things', id: '1', attributes: { payload }, meta: { values: [1] } },
      meta: { values: [2] },
    }
    const snapshot = structuredClone(input)
    const output = deserialise(input)
    expect(output.data.payload).toEqual(payload)
    expect(Object.hasOwn(output.data.payload, '__proto__')).toBe(true)
    expect(Object.getPrototypeOf(output.data.payload)).toBe(Object.prototype)
    const literalPrototype = Object.getOwnPropertyDescriptor(
      output.data.payload,
      '__proto__',
    )?.value
    literalPrototype.flag = false
    output.data.payload.nested[0].data = 'changed'
    output.data.$.meta.values.push(3)
    output.meta.values.push(4)
    expect(input).toEqual(snapshot)
  })
  it('retains shared attribute values, cycles, sparse arrays, and structured-clone fallback', () => {
    const shared: any = { value: 1 }
    shared.self = shared
    const date = new Date('2026-01-01T00:00:00.000Z')
    const sparse = new Array(3)
    sparse[1] = shared
    const record = Object.assign(Object.create(null), { value: [1] })
    const output = deserialise({
      data: {
        type: 'things',
        id: '1',
        attributes: {
          first: shared,
          second: shared,
          dates: [date, date],
          sparse,
          record,
        },
      },
    }).data
    expect(output.first).toBe(output.second)
    expect(output.first.self).toBe(output.first)
    expect(output.first).not.toBe(shared)
    expect(output.sparse).toHaveLength(3)
    expect(0 in output.sparse).toBe(false)
    expect(output.sparse[1]).toBe(output.first)
    expect(output.dates[0]).toEqual(date)
    expect(output.dates[0]).not.toBe(date)
    expect(output.dates[0]).toBe(output.dates[1])
    expect(output.record).toEqual({ value: [1] })
    expect(Object.getPrototypeOf(output.record)).toBe(Object.prototype)
    for (const value of [() => {}, Symbol('unsupported')])
      expect(() => deserialise({ data: { type: 'things', attributes: { value } } })).toThrow()
  })
  it('keeps distinct type/id/lid identities when concatenated names would collide', () => {
    const output = deserialise({
      data: {
        type: 'roots',
        id: '1',
        relationships: {
          first: { data: { type: 'a', id: 'bc' } },
          second: { data: { type: 'ab', id: 'c' } },
          third: { data: { type: 'a', lid: 'bc' } },
        },
      },
      included: [
        { type: 'a', id: 'bc', attributes: { value: 1 } },
        { type: 'ab', id: 'c', attributes: { value: 2 } },
        { type: 'a', lid: 'bc', attributes: { value: 3 } },
      ],
    })
    expect(output.data.first.value).toBe(1)
    expect(output.data.second.value).toBe(2)
    expect(output.data.third.value).toBe(3)
    for (const [index, name] of ['first', 'second', 'third'].entries())
      expect(output.data[name]).toBe(output.included[index])
    expect(output.data.first).not.toBe(output.data.third)
  })
  it('normalizes resource objects with null prototypes without sharing input', () => {
    const input = Object.assign(Object.create(null), {
      type: 'things',
      id: '1',
      attributes: { payload: { value: 1 } },
    })
    for (const data of [input, [input]]) {
      const output = deserialise({ data }).data
      const resource = Array.isArray(output) ? output[0] : output
      expect(resource).toEqual({ type: 'things', id: '1', payload: { value: 1 } })
      expect(resource).not.toBe(input)
      resource.payload.value = 2
      expect(input.attributes.payload.value).toBe(1)
    }
  })
  it('links deep graphs without recursive decoding and preserves a cycle back to the primary resource', () => {
    const resources = Array.from({ length: 12000 }, (_, index) => ({
      type: 'nodes',
      id: String(index),
      relationships: { next: { data: { type: 'nodes', id: String((index + 1) % 12000) } } },
    }))
    const output = deserialise({ data: resources[0], included: resources.slice(1) })
    let current = output.data
    for (let index = 0; index < resources.length; index++) {
      expect(current.id).toBe(String(index))
      current = current.next
    }
    expect(current).toBe(output.data)
    expect(output.data.next).toBe(output.included[0])
    expect(resources[0].relationships.next.data).toEqual({ type: 'nodes', id: '1' })
  })
  it('copies large nested attribute graphs without losing shared references', () => {
    const values: any[] = Array.from({ length: 100 }, (_, index) => ({ index }))
    values.push(values[0])
    const output = deserialise({ data: { type: 'things', id: '1', attributes: { values } } }).data
      .values
    expect(output).toEqual(values)
    expect(output[0]).toBe(output[100])
    expect(output[0]).not.toBe(values[0])
    output[0].index = -1
    expect(values[0].index).toBe(0)
  })
})
