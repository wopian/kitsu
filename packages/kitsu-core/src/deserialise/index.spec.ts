import { describe, expect, it } from 'bun:test'
import { deserialise } from '../deserialise.js'

describe('kitsu-core deserialise', () => {
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
