import { describe, expect, it } from 'bun:test'
import plural from 'pluralize'
import { camel } from '../camel.js'
import { serialise } from '../serialise.js'

describe('kitsu-core serialise', () => {
  it('transforms root and inferred types but keeps explicit relationship types', () => {
    expect(
      serialise(
        'library-entry',
        { user: { id: '2' }, author: { type: 'people', id: '9' } },
        'POST',
        { camelCaseTypes: camel, pluralTypes: plural },
      ),
    ).toEqual({
      data: {
        type: 'libraryEntries',
        relationships: {
          user: { data: { type: 'users', id: '2' } },
          author: { data: { type: 'people', id: '9' } },
        },
      },
    })
    expect(serialise('anime', {}, 'POST', { pluralTypes: plural })).toEqual({
      data: { type: 'anime' },
    })
  })
  it('preserves options without installing defaults onto caller objects', () => {
    const options = Object.freeze({})
    expect(serialise('articles', {}, undefined, options)).toEqual({ data: { type: 'articles' } })
    expect(options).toEqual({})
  })
  it('supports legacy bulk arrays separately from base JSON:API', () => {
    expect(serialise('articles', [{ id: 1 }, { id: 2 }], 'PATCH')).toEqual({
      data: [
        { type: 'articles', id: '1' },
        { type: 'articles', id: '2' },
      ],
    })
    expect(() => serialise('articles', [{ id: 1 }, {}], 'PATCH')).toThrow('PATCH requires an ID')
  })
  it('requires object bodies and valid identifier values', () => {
    for (const value of [0, 'text', true])
      expect(() => serialise('articles', value as any)).toThrow('requires an object or array body')
    expect(() => serialise('articles', undefined, 'PATCH')).toThrow('PATCH requires an ID')
    expect(() => serialise('articles', { id: {} } as any)).toThrow('Invalid resource id')
    expect(() => serialise('articles', { $: { lid: 1 } } as any)).toThrow('Invalid resource lid')
    expect(() =>
      serialise('articles', { $: { relationships: { 'bad.name': { data: null } } } }),
    ).toThrow('Invalid field')
    expect(() => serialise('articles', { 'bad.name': 1 })).toThrow('Invalid field')
  })
  it('writes arbitrary JSON values and ordinary objects containing data', () => {
    expect(
      serialise('articles', {
        n: 0,
        yes: false,
        nothing: null,
        object: { data: { id: '9' } },
        array: ['one'],
      }),
    ).toEqual({
      data: {
        type: 'articles',
        attributes: {
          n: 0,
          yes: false,
          nothing: null,
          object: { data: { id: '9' } },
          array: ['one'],
        },
      },
    })
  })
  it('checks conflicts with primary and explicit included representations', () => {
    expect(() =>
      serialise('articles', { id: '1', title: 'Hello' }, 'PATCH', {
        document: { included: [{ type: 'articles', id: '1', attributes: { title: 'Changed' } }] },
      }),
    ).toThrow('Conflicting resources')
    expect(() =>
      serialise('articles', { author: { type: 'people', id: '9', name: 'Ada' } }, 'POST', {
        document: { included: [{ type: 'people', id: '9', attributes: { name: 'Changed' } }] },
      }),
    ).toThrow('Conflicting resources')
  })
})
