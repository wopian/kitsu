import { describe, expect, it } from 'bun:test'
import { linkRelationships } from '../linkRelationships.js'

describe('kitsu-core linkRelationships', () => {
  it('copies only own relationship extras when relationship objects have prototypes', () => {
    const relationship = Object.assign(
      Object.create({ meta: { inherited: true }, 'audit:hidden': { inherited: true } }),
      {
        data: { type: 'people', id: '9' },
        links: { related: null },
        'audit:own': { revision: 1 },
      },
    )
    const output = linkRelationships({
      type: 'articles',
      id: '1',
      relationships: { author: relationship },
    })
    expect(output).toEqual({
      type: 'articles',
      id: '1',
      author: { type: 'people', id: '9' },
      $: {
        relationships: {
          author: { links: { related: null }, 'audit:own': { revision: 1 } },
        },
      },
    })
    expect(output.$.relationships.author.links).not.toBe(relationship.links)
    expect(output.$.relationships.author['audit:own']).not.toBe(relationship['audit:own'])
  })
  it('resolves identifier collections and empty relationships', () => {
    const input = {
      type: 'articles',
      id: '1',
      relationships: {
        author: { data: { type: 'people', id: '9' } },
        tags: { data: [] },
        empty: { data: null },
        related: { links: { related: '/related' } },
      },
    }
    expect(linkRelationships(input)).toEqual({
      type: 'articles',
      id: '1',
      author: { type: 'people', id: '9' },
      tags: [],
      empty: null,
      $: { relationships: { related: { links: { related: '/related' } } } },
    })
    expect(input.relationships).toBeDefined()
  })
  it('uses primary data and included data as one identity graph', () => {
    const input = [
      { type: 'people', id: '1', relationships: { friend: { data: { type: 'people', id: '2' } } } },
      { type: 'people', id: '2' },
    ]
    const result = linkRelationships(input)
    expect(result[0].friend).toBe(result[1])
  })
  it('distinguishes resource types and unresolved local ids', () => {
    expect(
      linkRelationships(
        {
          type: 'things',
          id: '1',
          relationships: {
            target: { data: { type: 'people', lid: 'draft' } },
            other: { data: { type: 'articles', id: '1' } },
          },
        },
        [{ type: 'people', id: '1', attributes: { name: 'Ada' } }],
      ),
    ).toEqual({
      type: 'things',
      id: '1',
      target: { type: 'people', $: { lid: 'draft' } },
      other: { type: 'articles', id: '1' },
    })
  })
  it('allows absent and null primary data', () => {
    expect(linkRelationships(undefined)).toBeUndefined()
    expect(linkRelationships(null)).toBeNull()
  })
})
