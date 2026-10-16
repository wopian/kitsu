import { describe, expect, it } from 'bun:test'
import { deserialise, serialise } from 'kitsu-core'

describe('JSON:API 1.1 serialization', () => {
  it('S01 resource creation, updating, type strings, and numeric zero', () => {
    expect(serialise('articles', { title: 'Hello' })).toEqual({
      data: { type: 'articles', attributes: { title: 'Hello' } },
    })
    expect(serialise('articles', { id: 0, title: null }, 'PATCH')).toEqual({
      data: { type: 'articles', id: '0', attributes: { title: null } },
    })
    expect(serialise('articles', { $: { lid: 'draft' } })).toEqual({
      data: { type: 'articles', lid: 'draft' },
    })
    expect(() => serialise('articles', { title: 'Hello' }, 'PATCH')).toThrow('PATCH requires an ID')
    expect(() => serialise(undefined, {})).toThrow('POST requires a resource type')
    expect(() => serialise('bad/type', {})).toThrow('Invalid resource type')
  })
  it('S02 metadata, explicit attributes, and direct relationships', () => {
    const input = {
      id: '1',
      meta: {},
      links: null,
      lid: 'attribute',
      empty: [],
      payload: { type: 'json', id: 1 },
      wrapper: { data: { id: '9' } },
      author: { type: 'people', id: 9 },
      $: {
        lid: 'draft',
        meta: { resource: true },
        links: { self: { href: '/articles/1', hreflang: 'en' } },
        attributes: { empty: [], payload: { type: 'json', id: 1 } },
        relationships: {
          author: { meta: { role: 'primary' }, links: { related: null } },
          clear: { data: null },
        },
        'version:id': '4',
        '@context': '/context',
      },
    }
    const snapshot = structuredClone(input)
    expect(serialise('articles', input, 'PATCH')).toEqual({
      data: {
        type: 'articles',
        id: '1',
        lid: 'draft',
        meta: { resource: true },
        links: { self: { href: '/articles/1', hreflang: 'en' } },
        'version:id': '4',
        '@context': '/context',
        attributes: {
          meta: {},
          links: null,
          lid: 'attribute',
          wrapper: { data: { id: '9' } },
          empty: [],
          payload: { type: 'json', id: 1 },
        },
        relationships: {
          author: {
            data: { type: 'people', id: '9' },
            meta: { role: 'primary' },
            links: { related: null },
          },
          clear: { data: null },
        },
      },
    })
    expect(input).toEqual(snapshot)
  })
  it('S03 linkage contains identifiers only; related resources enter included', () => {
    const person = { type: 'people', id: '9', name: 'Ada' }
    expect(serialise('articles', { author: person, editors: [person], tags: [] })).toEqual({
      data: {
        type: 'articles',
        relationships: {
          author: { data: { type: 'people', id: '9' } },
          editors: { data: [{ type: 'people', id: '9' }] },
          tags: { data: [] },
        },
      },
      included: [{ type: 'people', id: '9', attributes: { name: 'Ada' } }],
    })
    expect(
      serialise('articles', { author: { type: 'people', $: { lid: 'p' }, name: 'Ada' } }),
    ).toEqual({
      data: { type: 'articles', relationships: { author: { data: { type: 'people', lid: 'p' } } } },
      included: [{ type: 'people', lid: 'p', attributes: { name: 'Ada' } }],
    })
  })
  it('S04 shared and cyclic graphs serialize without duplicate representations', () => {
    const article: any = { type: 'articles', id: '1', title: 'Hello' }
    const person: any = { type: 'people', id: '9', name: 'Ada', article }
    article.author = person
    expect(serialise('articles', article, 'PATCH')).toEqual({
      data: {
        type: 'articles',
        id: '1',
        attributes: { title: 'Hello' },
        relationships: { author: { data: { type: 'people', id: '9' } } },
      },
      included: [
        {
          type: 'people',
          id: '9',
          attributes: { name: 'Ada' },
          relationships: { article: { data: { type: 'articles', id: '1' } } },
        },
      ],
    })
    expect(() =>
      serialise('articles', {
        author: { type: 'people', id: '9', name: 'Ada' },
        editor: { type: 'people', id: '9', name: 'Different' },
      }),
    ).toThrow('Conflicting resources')
  })
  it('S05 identifier metadata follows identity, not array position', () => {
    const input = {
      tags: [
        { type: 'tags', id: '2' },
        { type: 'tags', id: '3' },
      ],
      $: {
        relationships: {
          tags: {
            data: [
              { type: 'tags', id: '1', meta: { stale: true } },
              { type: 'tags', id: '2', meta: { keep: true } },
            ],
          },
        },
      },
    }
    expect(serialise('articles', input).data.relationships.tags.data).toEqual([
      { type: 'tags', id: '2', meta: { keep: true } },
      { type: 'tags', id: '3' },
    ])
    expect(
      serialise('articles', {
        $: { relationships: { author: { data: { type: 'people', lid: 'p', meta: {} } } } },
      }).data.relationships.author.data,
    ).toEqual({ type: 'people', lid: 'p', meta: {} })
  })
  it('S06 top-level members and included merge by identity', () => {
    const options = {
      document: {
        meta: { source: 'cli' },
        links: { self: null },
        jsonapi: { version: '1.1', ext: ['https://example.org/version'] },
        'version:revision': 1,
        included: [{ type: 'people', id: '9', attributes: { name: 'Ada' } }],
      },
    }
    const output = serialise(
      'articles',
      { author: { type: 'people', id: '9', name: 'Ada' } },
      'POST',
      options,
    )
    expect(output).toEqual({
      meta: { source: 'cli' },
      links: { self: null },
      jsonapi: { version: '1.1', ext: ['https://example.org/version'] },
      'version:revision': 1,
      data: { type: 'articles', relationships: { author: { data: { type: 'people', id: '9' } } } },
      included: [{ type: 'people', id: '9', attributes: { name: 'Ada' } }],
    })
    expect(options.document.included).toHaveLength(1)
    expect(() => serialise('articles', {}, 'POST', { document: { errors: [] } })).toThrow(
      'document cannot override',
    )
    expect(() => serialise('articles', {}, 'POST', { document: { data: null } })).toThrow(
      'document cannot override',
    )
  })
  it('S07 relationship endpoints serialize primary identifiers and clearing', () => {
    expect(serialise('people', { id: 0 }, 'PATCH', { relationship: true })).toEqual({
      data: { type: 'people', id: '0' },
    })
    expect(serialise('people', null, 'PATCH', { relationship: true })).toEqual({ data: null })
    expect(serialise('tags', [], 'DELETE', { relationship: true })).toEqual({ data: [] })
    expect(serialise('tags', [{ id: '1' }, { id: '2' }], 'POST', { relationship: true })).toEqual({
      data: [
        { type: 'tags', id: '1' },
        { type: 'tags', id: '2' },
      ],
    })
  })
  it('S08 invalid fields and identifiers never emit invalid linkage', () => {
    for (const data of [
      { author: { type: 'people' } },
      { author: [{ type: 'people', id: '9' }, 1] },
      { $: { relationships: { author: { data: {} } } } },
    ])
      expect(() => serialise('articles', data as any)).toThrow()
    for (const key of ['type', 'id', '$', 'bad.name'])
      expect(() => serialise('articles', { $: { attributes: { [key]: 1 } } })).toThrow()
    expect(() => serialise('articles', { $: { relationships: { author: {} } } })).toThrow(
      'Empty relationship',
    )
    expect(() => serialise('articles', { $: { relationships: { author: { meta: {} } } } })).toThrow(
      'POST requires data',
    )
    expect(() =>
      serialise('articles', {
        $: { attributes: { author: 1 }, relationships: { author: { data: null } } },
      }),
    ).toThrow('conflict')
  })
  it('S09 round trips preserve attribute objects, metadata, and linkage', () => {
    const input = {
      id: '1',
      name: 'Hello',
      author: { type: 'people', id: '9', name: 'Ada' },
      $: { meta: { revision: 1 }, attributes: { payload: { data: [1] }, array: [] } },
    }
    const document = serialise('articles', input, 'PATCH')
    const output = deserialise(document)
    expect(output.data.author).toBe(output.included[0])
    // Reconstitute attributes that cannot be inferred from flat values.
    output.data.$.attributes = { payload: output.data.payload, array: output.data.array }
    expect(serialise('articles', output.data, 'PATCH')).toEqual(document)
  })
  it('S10 preserves explicit empty includes, fieldless resources, and extension-only resources', () => {
    expect(serialise('articles', {}, 'POST', { document: { included: [] } })).toEqual({
      data: { type: 'articles' },
      included: [],
    })
    expect(
      serialise('articles', {}, 'POST', { document: { included: [{ type: 'people', id: '9' }] } }),
    ).toEqual({ data: { type: 'articles' }, included: [{ type: 'people', id: '9' }] })
    expect(
      serialise('articles', { author: { type: 'people', id: '9', $: { 'version:id': 3 } } }),
    ).toEqual({
      data: { type: 'articles', relationships: { author: { data: { type: 'people', id: '9' } } } },
      included: [{ type: 'people', id: '9', 'version:id': 3 }],
    })
  })
  it('S11 preserves @-members and identifier extensions without inferring relationships from them', () => {
    const input: any = {
      '@context': { type: 'opaque' },
      author: { type: 'people', id: '9' },
      $: {
        relationships: {
          '@context': '/context',
          'version:count': 1,
          author: { data: { type: 'people', id: '9', 'version:role': 2, '@label': 'writer' } },
        },
      },
    }
    expect(serialise('articles', input)).toEqual({
      data: {
        type: 'articles',
        attributes: { '@context': { type: 'opaque' } },
        relationships: {
          '@context': '/context',
          'version:count': 1,
          author: { data: { type: 'people', id: '9', 'version:role': 2, '@label': 'writer' } },
        },
      },
    })
  })
  it('S12 deduplication distinguishes JSON arrays from objects with numeric keys', () => {
    expect(() =>
      serialise('articles', {
        first: { type: 'people', id: '9', payload: [1] },
        second: { type: 'people', id: '9', payload: { 0: 1 } },
      }),
    ).toThrow('Conflicting resources')
  })
  it('S13 id/lid aliases deduplicate and reject inconsistent local identity', () => {
    const output = serialise('articles', {
      author: { type: 'people', name: 'Ada', $: { lid: 'p' } },
      editor: { type: 'people', id: '9', name: 'Ada', $: { lid: 'p' } },
    })
    expect(output).toEqual({
      data: {
        type: 'articles',
        relationships: {
          author: { data: { type: 'people', id: '9', lid: 'p' } },
          editor: { data: { type: 'people', id: '9', lid: 'p' } },
        },
      },
      included: [{ type: 'people', id: '9', lid: 'p', attributes: { name: 'Ada' } }],
    })
    expect(() =>
      serialise('articles', {
        author: { type: 'people', id: '9', $: { lid: 'p' } },
        editor: { type: 'people', id: '9', $: { lid: 'different' } },
      }),
    ).toThrow('Conflicting resources')
    expect(() =>
      serialise('articles', {
        author: { type: 'people', id: '9', $: { lid: 'p' } },
        editor: { type: 'people', id: '10', $: { lid: 'p' } },
      }),
    ).toThrow('Conflicting resources')
  })
})
