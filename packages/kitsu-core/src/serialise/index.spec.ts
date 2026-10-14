import { describe, expect, it } from 'bun:test'
import plural from 'pluralize'
import { camel } from '../camel.js'
import { serialise } from '../serialise.js'

describe('kitsu-core serialise', () => {
  it('copies literal prototype keys in document and relationship extras without changing prototypes', () => {
    const document = JSON.parse('{"__proto__":{"document":true}}')
    const extras = JSON.parse('{"__proto__":{"relationship":true},"data":null}')
    for (const extra of [{}, { author: { type: 'people', id: '9', name: 'Ada' } }]) {
      const output = serialise(
        'articles',
        { ...extra, $: { relationships: { clear: extras } } },
        'POST',
        { document },
      )
      expect(Object.getPrototypeOf(output)).toBe(Object.prototype)
      expect(Object.getOwnPropertyDescriptor(output, '__proto__')?.value).toEqual({
        document: true,
      })
      const relationship = output.data.relationships.clear
      expect(Object.getPrototypeOf(relationship)).toBe(Object.prototype)
      expect(Object.getOwnPropertyDescriptor(relationship, '__proto__')?.value).toEqual({
        relationship: true,
      })
      expect(relationship.data).toBeNull()
    }
    expect(Object.getOwnPropertyDescriptor(document, '__proto__')?.value.document).toBe(true)
  })
  it('keeps prototype member names as own relationship fields', () => {
    const original = Object.getOwnPropertyDescriptor(Object, 'data')
    const output = serialise('articles', {
      constructor: { type: 'people', id: '9', name: 'Ada' },
      toString: { type: 'tags', id: '2', label: 'Tag' },
    })
    expect(Object.hasOwn(output.data.relationships, 'constructor')).toBe(true)
    expect(Object.hasOwn(output.data.relationships, 'toString')).toBe(true)
    expect(output.data.relationships.constructor.data).toEqual({ type: 'people', id: '9' })
    expect(output.data.relationships.toString.data).toEqual({ type: 'tags', id: '2' })
    expect(Object.getOwnPropertyDescriptor(Object, 'data')).toEqual(original)
    const raw = serialise('articles', {
      $: {
        relationships: {
          constructor: { data: { type: 'people', id: '9' }, meta: { role: 'author' } },
        },
      },
    })
    expect(raw.data.relationships.constructor).toEqual({
      data: { type: 'people', id: '9' },
      meta: { role: 'author' },
    })
    expect(Object.getOwnPropertyDescriptor(Object, 'data')).toEqual(original)
  })
  it('promotes completed output without rereading earlier attribute values', () => {
    let reads = 0
    const input = {
      get title() {
        reads++
        return { nested: true }
      },
      tags: [
        { type: 'tags', id: '1' },
        { type: 'tags', id: '2', label: 'Full' },
      ],
      author: { type: 'people', id: '9', name: 'Ada' },
    }
    const output = serialise('articles', input)
    expect(reads).toBe(1)
    expect(output.data.attributes).toEqual({ title: { nested: true } })
    expect(output.data.relationships.tags.data).toEqual([
      { type: 'tags', id: '1' },
      { type: 'tags', id: '2' },
    ])
    expect(output.included.map((resource: any) => resource.id)).toEqual(['2', '9'])
    expect(
      serialise(
        'articles',
        [
          { id: '1', title: 'First' },
          { id: '2', author: { type: 'people', id: '9', name: 'Ada' } },
        ],
        'PATCH',
      ).data.map((resource: any) => resource.id),
    ).toEqual(['1', '2'])
  })
  it('merges a bridge between separate id and lid entries without changing first-seen order', () => {
    const output = serialise('articles', {
      first: { type: 'people', id: '9' },
      middle: { type: 'tags', id: '3', label: 'Tag' },
      second: { type: 'people', $: { lid: 'draft' } },
      bridge: { type: 'people', id: '9', $: { lid: 'draft' }, name: 'Ada' },
    })
    expect(output.included.map((resource: any) => resource.type)).toEqual(['people', 'tags'])
    expect(output.data.relationships.first.data).toEqual({ type: 'people', id: '9', lid: 'draft' })
    expect(output.data.relationships.second.data).toEqual({ type: 'people', id: '9', lid: 'draft' })
    expect(() =>
      serialise('articles', {
        first: { type: 'people', id: '9', name: 'Ada' },
        second: { type: 'people', $: { lid: 'draft' }, name: 'Different' },
        bridge: { type: 'people', id: '9', $: { lid: 'draft' } },
      }),
    ).toThrow('Conflicting resources')
  })
  it('keeps metadata-free first matches and finalizes aliases in supplied linkage', () => {
    const output = serialise(
      'articles',
      {
        author: { type: 'people', id: '9', $: { lid: 'draft' } },
        $: {
          relationships: {
            author: {
              data: [
                { type: 'people', lid: 'draft' },
                { type: 'people', id: '9', meta: { stale: true } },
              ],
            },
          },
        },
      },
      'POST',
      {
        document: {
          included: [
            {
              type: 'tags',
              id: '1',
              relationships: {
                author: { data: { type: 'people', lid: 'draft', meta: { edge: true } } },
              },
            },
          ],
        },
      },
    )
    expect(output.data.relationships.author.data).toEqual({ type: 'people', id: '9', lid: 'draft' })
    expect(output.included[0].relationships.author.data).toEqual({
      type: 'people',
      id: '9',
      lid: 'draft',
      meta: { edge: true },
    })
    expect(output.included).toHaveLength(1)
  })
  it('serializes deep cyclic resource graphs and compares cyclic duplicate attributes', () => {
    const first: any = { type: 'nodes', id: '0' }
    let last = first
    for (let index = 1; index < 12000; index++)
      last = last.next = { type: 'nodes', id: String(index) }
    last.next = first
    const output = serialise('nodes', first, 'PATCH')
    expect(output.included).toHaveLength(11999)
    expect(output.included[11998].relationships.next.data).toEqual({ type: 'nodes', id: '0' })
    const left: any = { value: 1 }
    left.self = left
    const right: any = { value: 1 }
    right.self = right
    expect(
      serialise('articles', {
        first: { type: 'people', id: '9', payload: left },
        second: { type: 'people', id: '9', payload: right },
      }).included,
    ).toHaveLength(1)
  })
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
  it('clears and replaces relationships using saved raw linkage without direct values', () => {
    const input = {
      $: { relationships: { author: { data: null }, tags: { data: [{ type: 'tags', id: '2' }] } } },
    }
    const output = serialise('articles', input)
    expect(output).toEqual({
      data: {
        type: 'articles',
        relationships: { author: { data: null }, tags: { data: [{ type: 'tags', id: '2' }] } },
      },
    })
    output.data.relationships.tags.data[0].id = 'changed'
    expect(input.$.relationships.tags.data[0].id).toBe('2')
  })
  it('copies nested, cyclic and shared attributes through simple and full resource graphs', () => {
    const shared: any = { value: 1 }
    shared.self = shared
    for (const extra of [{}, { author: { type: 'people', id: '9', name: 'Ada' } }]) {
      const output = serialise('articles', { first: shared, second: shared, ...extra })
      expect(output.data.attributes.first).toBe(output.data.attributes.second)
      expect(output.data.attributes.first.self).toBe(output.data.attributes.first)
      expect(output.data.attributes.first).not.toBe(shared)
      output.data.attributes.first.value = 2
      expect(shared.value).toBe(1)
    }
    const fields = Object.fromEntries(
      Array.from({ length: 600 }, (_, index) => [`field-${index}`, index]),
    )
    expect(serialise('articles', fields).data.attributes).toEqual(fields)
    expect(() => serialise('articles', { value: () => {} })).toThrow()
  })
  it('rejects conflicting collection resources and does not retain output between calls', () => {
    expect(() =>
      serialise(
        'articles',
        [
          { id: '1', title: 'First' },
          { id: '1', title: 'Second' },
        ],
        'PATCH',
      ),
    ).toThrow('Conflicting resources')
    const input = { id: '1', title: 'First' }
    const first = serialise('articles', input, 'PATCH')
    input.title = 'Second'
    const second = serialise('articles', input, 'PATCH')
    expect(second.data.attributes.title).toBe('Second')
    expect(first.data.attributes.title).toBe('First')
    expect(first).not.toBe(second)
  })
  it('ignores inherited resource fields and preserves cycles on custom prototypes', () => {
    const person = Object.assign(Object.create({ ignored: 'inherited', id: 'wrong' }), {
      type: 'people',
      name: 'Ada',
      $: { lid: 'p' },
    })
    person.friend = person
    const output = serialise('articles', { author: person })
    expect(output.included).toEqual([
      {
        type: 'people',
        lid: 'p',
        attributes: { name: 'Ada' },
        relationships: { friend: { data: { type: 'people', lid: 'p' } } },
      },
    ])
    expect(person.ignored).toBe('inherited')
    expect(
      serialise('articles', Object.assign(Object.create({ hidden: true }), { title: 'Hello' })),
    ).toEqual({ data: { type: 'articles', attributes: { title: 'Hello' } } })
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
  it('joins wide reordered linkage by identity without losing identifier metadata', () => {
    const identifiers = Array.from({ length: 4000 }, (_, index) => ({
      type: 'tags',
      id: String(index),
      meta: { index },
    }))
    const tags = identifiers.map(({ type, id }) => ({ type, id })).reverse()
    const input = { tags, $: { relationships: { tags: { data: identifiers } } } }
    const before = structuredClone(input)
    expect(serialise('articles', input).data.relationships.tags.data).toEqual(
      [...identifiers].reverse(),
    )
    expect(input).toEqual(before)
  })
  it('keeps first metadata match across id and lid aliases and relationship boundaries', () => {
    const person = { type: 'people', id: '9', $: { lid: 'draft' } }
    const input = {
      author: person,
      editor: person,
      $: {
        relationships: {
          author: {
            data: [
              { type: 'people', lid: 'draft', meta: { first: true }, 'edge:role': 'author' },
              { type: 'people', id: '9', meta: { first: false } },
            ],
          },
          editor: {
            data: [
              { type: 'people', id: '9', meta: { editor: true } },
              { type: 'people', id: '9', meta: { editor: false } },
            ],
          },
        },
      },
    }
    const output = serialise('articles', input)
    expect(output.data.relationships).toEqual({
      author: {
        data: {
          type: 'people',
          id: '9',
          lid: 'draft',
          meta: { first: true },
          'edge:role': 'author',
        },
      },
      editor: { data: { type: 'people', id: '9', lid: 'draft', meta: { editor: true } } },
    })
    expect(output.included).toBeUndefined()
    expect(
      serialise('articles', {
        tags: [
          { type: 'tags', id: 'same' },
          { type: 'people', id: 'same' },
        ],
        $: {
          relationships: {
            tags: {
              data: [
                { type: 'people', id: 'same', meta: { person: true } },
                { type: 'tags', id: 'same', meta: { tag: true } },
              ],
            },
          },
        },
      }).data.relationships.tags.data,
    ).toEqual([
      { type: 'tags', id: 'same', meta: { tag: true } },
      { type: 'people', id: 'same', meta: { person: true } },
    ])
  })
})
