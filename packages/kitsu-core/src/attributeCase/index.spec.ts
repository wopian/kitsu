import { describe, expect, it } from 'bun:test'
import {
  camel,
  deattribute,
  deserialise,
  kebab,
  linkRelationships,
  serialise,
  snake,
} from '../index.js'

describe('optional attribute casing', () => {
  it('calls custom converters for every attribute without memoizing callback results', () => {
    let calls = 0
    const input = {
      data: [
        { type: 'people', id: '1', attributes: { name: 'Ada' } },
        { type: 'people', id: '2', attributes: { name: 'Grace' } },
      ],
    }
    const options = { attributeCase: (name: string) => `${name}${++calls}` }
    expect(deserialise(input, options).data).toEqual([
      { type: 'people', id: '1', name1: 'Ada' },
      { type: 'people', id: '2', name2: 'Grace' },
    ])
    expect(deserialise(input, options).data).toEqual([
      { type: 'people', id: '1', name3: 'Ada' },
      { type: 'people', id: '2', name4: 'Grace' },
    ])
    expect(calls).toBe(4)
    expect(input.data[0].attributes).toEqual({ name: 'Ada' })
  })
  it('keeps default names and converts only immediate attribute names when enabled', () => {
    const nested: any = { 'keep-key': [{ nested_key: 1, data: null }] }
    nested.self = nested
    const document = {
      data: {
        type: 'people',
        id: '0',
        attributes: {
          'first-name': 'Ada',
          last_name: 'Lovelace',
          'json-value': nested,
          '@keep-name': 1,
        },
        meta: { 'keep-key': true },
        links: { 'keep-link': null },
      },
      meta: { 'document-key': 1 },
      jsonapi: { version: '1.1' },
    }
    expect(deserialise(document).data['first-name']).toBe('Ada')
    const result = deserialise(document, { attributeCase: camel })
    expect(result.data.firstName).toBe('Ada')
    expect(result.data.lastName).toBe('Lovelace')
    expect(result.data['@keep-name']).toBe(1)
    expect(result.data.jsonValue).toEqual(nested)
    expect(result.data.jsonValue).not.toBe(nested)
    expect(result.data.jsonValue.self).toBe(result.data.jsonValue)
    expect(result.data.$).toEqual({ meta: { 'keep-key': true }, links: { 'keep-link': null } })
    expect(result.meta).toEqual({ 'document-key': 1 })
    expect(result.jsonapi).toEqual({ version: '1.1' })
    expect(Object.hasOwn(document.data.attributes, 'first-name')).toBe(true)
    expect(deserialise({ data: null }, { attributeCase: camel })).toEqual({ data: null })
  })

  it('supports standalone helpers, collections, empty values, and custom callbacks', () => {
    const resources = [
      { type: 'things', id: '1', attributes: { FIELD: 0, empty: [], nothing: null } },
    ]
    const convert = (name: string) => name.toLowerCase()
    expect(deattribute(resources, { attributeCase: convert })).toEqual([
      { type: 'things', id: '1', field: 0, empty: [], nothing: null },
    ])
    expect(deattribute(resources)[0].FIELD).toBe(0)
    expect(linkRelationships(resources[0], [], { attributeCase: convert }).field).toBe(0)
    expect(linkRelationships(null, [], { attributeCase: convert })).toBeNull()
    expect(serialise('things', { FIELD: 0 }, 'POST', { attributeCase: convert })).toEqual({
      data: { type: 'things', attributes: { field: 0 } },
    })
    expect(deserialise({ data: resources }, { attributeCase: convert }).data[0].field).toBe(0)
  })

  it('retains shared resources, aliases, cycles, relationship names, and identifier metadata', () => {
    const document = {
      data: [
        {
          type: 'people',
          lid: 'draft',
          attributes: { 'first-name': 'Ada' },
          relationships: {
            'best-friend': { data: { type: 'people', id: '2', meta: { 'edge-key': 1 } } },
          },
        },
      ],
      included: [
        { type: 'people', id: '1', lid: 'draft' },
        {
          type: 'people',
          id: '2',
          attributes: { first_name: 'Grace' },
          relationships: { owner: { data: { type: 'people', lid: 'draft' } } },
        },
        { type: 'people', id: '3', attributes: { 'first-name': 'Sparse' } },
      ],
    }
    const output = deserialise(document, { attributeCase: camel })
    const person = output.data[0]
    expect(person.firstName).toBe('Ada')
    expect(person).toBe(output.included[0])
    expect(person['best-friend']).toBe(output.included[1])
    expect(person['best-friend'].firstName).toBe('Grace')
    expect(person['best-friend'].owner).toBe(person)
    expect(person.$.relationships['best-friend'].data.meta).toEqual({ 'edge-key': 1 })
    expect(output.included[2].firstName).toBe('Sparse')
    const shared = { type: 'people', id: '2', attributes: { 'first-name': 'Grace' } }
    const duplicate = deserialise({ data: [shared, shared] }, { attributeCase: camel })
    expect(duplicate.data[0]).toBe(duplicate.data[1])
    const custom = Object.assign(Object.create(null), shared)
    expect(deserialise({ data: custom }, { attributeCase: camel }).data.firstName).toBe('Grace')
  })

  for (const [attributeCase, name] of [
    [kebab, 'first-name'],
    [snake, 'first_name'],
  ] as const) {
    it(`encodes ${name}, preserving explicit attributes and supplied wire resources`, () => {
      const input = {
        firstName: 'ignored',
        'best-friend': { type: 'people', id: '2', firstName: 'Grace' },
        $: {
          attributes: { firstName: 'Ada', jsonValue: { 'keep-key': 1 }, values: [] },
          meta: { 'keep-key': true },
          relationships: {
            'best-friend': {
              links: { related: null },
              data: { type: 'people', id: '2', meta: { 'edge-key': true } },
            },
          },
        },
      }
      const output = serialise('people', input, 'POST', {
        attributeCase,
        document: {
          meta: { 'document-key': 1 },
          included: [{ type: 'people', id: '3', attributes: { 'wire-name': 'Sparse' } }],
        },
      })
      expect(output.data.attributes).toEqual({
        [name]: 'Ada',
        [attributeCase('jsonValue')]: { 'keep-key': 1 },
        values: [],
      })
      expect(output.data.relationships).toEqual({
        'best-friend': {
          links: { related: null },
          data: { type: 'people', id: '2', meta: { 'edge-key': true } },
        },
      })
      expect(output.data.meta).toEqual({ 'keep-key': true })
      expect(output.meta).toEqual({ 'document-key': 1 })
      expect(output.included).toEqual([
        { type: 'people', id: '2', attributes: { [name]: 'Grace' } },
        { type: 'people', id: '3', attributes: { 'wire-name': 'Sparse' } },
      ])
      expect(input.firstName).toBe('ignored')
      expect(output.data.attributes[attributeCase('jsonValue')]).not.toBe(
        input.$.attributes.jsonValue,
      )
    })
  }

  it('converts plain, rich, and late graph paths with no lost attributes', () => {
    const options = { attributeCase: kebab }
    expect(serialise('people', { firstName: 'Ada', '@keep-name': 1 }, 'POST', options)).toEqual({
      data: { type: 'people', attributes: { 'first-name': 'Ada', '@keep-name': 1 } },
    })
    expect(
      serialise(
        'people',
        { firstName: 'Ada', $: { attributes: { firstName: 'Grace' } } },
        'POST',
        options,
      ).data.attributes,
    ).toEqual({ 'first-name': 'Grace' })
    const input: any = { type: 'people', id: '1', firstName: 'Ada' }
    input.friend = { type: 'people', id: '2', firstName: 'Grace', owner: input }
    const output = serialise('people', input, 'PATCH', options)
    expect(output.data.attributes).toEqual({ 'first-name': 'Ada' })
    expect(output.included[0].attributes).toEqual({ 'first-name': 'Grace' })
    expect(output.included[0].relationships.owner.data).toEqual({ type: 'people', id: '1' })
    const rich = serialise(
      'people',
      {
        id: '1',
        firstName: 'Ada',
        $: { relationships: { editor: { links: { related: '/editor' } } } },
      },
      'PATCH',
      options,
    )
    expect(rich.data.attributes).toEqual({ 'first-name': 'Ada' })
    expect(rich.data.relationships.editor.links.related).toBe('/editor')
  })

  it('rejects name collisions and invalid callback results without changing inputs', () => {
    const conflicting = { firstName: 'Ada', 'first-name': 'Grace' }
    expect(() => serialise('people', conflicting, 'POST', { attributeCase: kebab })).toThrow(
      'Attribute name conflict: first-name',
    )
    expect(conflicting.firstName).toBe('Ada')
    expect(() =>
      deserialise({ data: { type: 'people', attributes: conflicting } }, { attributeCase: camel }),
    ).toThrow('Attribute name conflict: firstName')
    for (const output of ['id', 'type', '$', '', '__proto__', 'invalid:name', undefined]) {
      const options = { attributeCase: () => output as string }
      expect(() => serialise('people', { name: 'Ada' }, 'POST', options)).toThrow(
        'Invalid attribute name:',
      )
      expect(() => deattribute({ attributes: { name: 'Ada' } }, options)).toThrow(
        'Invalid attribute name:',
      )
    }
    const wire = {
      type: 'people',
      attributes: { first_name: 'Ada' },
      relationships: { firstName: { meta: {} } },
    }
    expect(() => deserialise({ data: wire }, { attributeCase: camel })).toThrow(
      'Attribute name conflict: firstName',
    )
    for (const input of [
      { firstName: 'Ada', 'first-name': { type: 'people', id: '2' } },
      { 'first-name': { type: 'people', id: '2' }, firstName: 'Ada' },
      { firstName: 'Ada', $: { relationships: { 'first-name': { data: null, meta: {} } } } },
      { $: { attributes: { firstName: 'Ada' }, relationships: { 'first-name': { data: null } } } },
      {
        firstName: 'Ada',
        friend: { type: 'people', id: '2', firstName: 'Grace', 'first-name': [] },
      },
    ])
      expect(() => serialise('people', input, 'POST', { attributeCase: kebab })).toThrow(
        'Attribute name conflict: first-name',
      )
    expect(() =>
      serialise('people', { firstName: 1, $: { attributes: { 'first-name': 2 } } }, 'POST', {
        attributeCase: kebab,
      }),
    ).toThrow('Attribute name conflict: first-name')
  })

  it('handles Unicode names, prototype keys, null linkage, and alias bridges', () => {
    const input: any = {
      type: 'people',
      $: {
        lid: 'draft',
        attributes: { élèveNom: { value: 1 }, meta: 'attribute' },
        relationships: { editor: { data: null } },
        meta: { own: true },
      },
    }
    input.friend = {
      type: 'people',
      id: '2',
      owner: { type: 'people', id: '1', $: { lid: 'draft' } },
    }
    const output = serialise('people', input, 'POST', { attributeCase: kebab })
    expect(output.data.id).toBe('1')
    expect(output.data.attributes).toEqual({ 'élève-nom': { value: 1 }, meta: 'attribute' })
    expect(output.data.relationships.editor.data).toBeNull()
    expect(deserialise(output, { attributeCase: camel }).data.élèveNom).toEqual({ value: 1 })
    const attributes = JSON.parse('{"constructor":{"nested_key":1},"prototype":2}')
    const flat = deattribute({ attributes }, { attributeCase: camel })
    expect(flat.constructor).toEqual({ nested_key: 1 })
    expect(Object.getPrototypeOf(flat)).toBe(Object.prototype)
    expect(
      Object.getPrototypeOf(
        serialise('things', { constructor: 1 }, 'POST', { attributeCase: kebab }).data.attributes,
      ),
    ).toBe(Object.prototype)
  })
})
