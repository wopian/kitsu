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
})
