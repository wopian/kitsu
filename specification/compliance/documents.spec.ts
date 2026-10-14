import { describe, expect, it } from 'bun:test'
import { deserialise } from 'kitsu-core'
import { errorDocument, flatMetadataDocument, metadataDocument } from './fixtures.js'

describe('JSON:API 1.1 documents', () => {
  it('D01 primary cardinality and absent data', () => {
    for (const data of [null, [], { type: 'people', id: '0' }, [{ type: 'people', id: '0' }]])
      expect(deserialise({ data })).toEqual({ data })
    expect(deserialise({ meta: { count: 0 } })).toEqual({ meta: { count: 0 } })
    expect(deserialise({ 'example:result': [], jsonapi: { version: '1.1' } })).toEqual({
      'example:result': [],
      jsonapi: { version: '1.1' },
    })
    expect(deserialise({ data: null, included: [] })).toEqual({ data: null, included: [] })
    expect(deserialise({ errors: [] })).toEqual({ errors: [] })
  })
  it('D02 all resource and document metadata remain separate', () => {
    const snapshot = structuredClone(metadataDocument)
    const output = deserialise(metadataDocument)
    expect(output).toEqual(flatMetadataDocument)
    expect(output.data.author).toBe(output.included[0])
    expect(metadataDocument).toEqual(snapshot)
    output.data.meta.attribute = false
    expect(snapshot.data).toEqual(metadataDocument.data)
  })
  it('D03 error members and source.header survive', () => {
    const output = deserialise(errorDocument)
    expect(output).toEqual(errorDocument)
    expect(output.errors).not.toBe(errorDocument.errors)
  })
  it('D04 hoistData only unwraps sole document data', () => {
    expect(deserialise({ data: null }, { hoistData: true })).toBeNull()
    expect(deserialise({ data: [] }, { hoistData: true })).toEqual([])
    const document = { data: { type: 'people', id: '1', attributes: { payload: { data: [1] } } } }
    expect(deserialise(document, { hoistData: true })).toEqual({
      type: 'people',
      id: '1',
      payload: { data: [1] },
    })
    expect(deserialise({ ...document, meta: {} }, { hoistData: true })).toEqual({
      data: { type: 'people', id: '1', payload: { data: [1] } },
      meta: {},
    })
    expect(deserialise({ data: { type: 'people', id: '1' } }).data.$).toBeUndefined()
  })
  it('D05 links and arbitrary JSON values are preserved', () => {
    const values = {
      text: '',
      n: 0,
      yes: false,
      nothing: null,
      array: [],
      object: {},
      nested: [{ data: 0 }],
    }
    const output = deserialise({
      data: { type: 'things', id: '', attributes: values, links: { self: null } },
      links: { prev: null },
    })
    expect(output).toEqual({
      data: { type: 'things', id: '', ...values, $: { links: { self: null } } },
      links: { prev: null },
    })
  })
  it('D06 @-members and identifier extensions remain opaque at their own locations', () => {
    const document: any = {
      data: {
        type: 'articles',
        id: '1',
        relationships: {
          '@context': '/relationships/context',
          'version:count': 1,
          author: { data: { type: 'people', id: '9', 'version:role': 2, '@label': 'writer' } },
        },
      },
    }
    const output = deserialise(document)
    expect(output.data.author).toEqual({ type: 'people', id: '9' })
    expect(output.data.$.relationships).toEqual({
      '@context': '/relationships/context',
      'version:count': 1,
      author: { data: { type: 'people', id: '9', 'version:role': 2, '@label': 'writer' } },
    })
  })
})
