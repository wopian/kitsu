import { describe, expect, it } from 'bun:test'
import { deserialise, filterIncludes, linkRelationships } from 'kitsu-core'

describe('JSON:API 1.1 linkage', () => {
  it('L01 type/id identity, ordering, shared resources, and cycles', () => {
    const person = {
      type: 'people',
      id: '1',
      attributes: { name: 'Ada' },
      relationships: { article: { data: { type: 'articles', id: '1' } } },
    }
    const document = {
      data: [
        {
          type: 'articles',
          id: '1',
          relationships: {
            first: { data: { type: 'people', id: '1', meta: { role: 'first' } } },
            second: { data: { type: 'people', id: '1', meta: { role: 'second' } } },
            many: {
              data: [
                { type: 'people', id: 'missing' },
                { type: 'people', id: '1' },
              ],
            },
          },
        },
      ],
      included: [person],
    }
    const output = deserialise(document)
    const article = output.data[0]
    expect(article.first).toBe(article.second)
    expect(article.first).toBe(output.included[0])
    expect(article.first.article).toBe(article)
    expect(article.many).toEqual([{ type: 'people', id: 'missing' }, article.first])
    expect(article.first.$).toBeUndefined()
    expect(article.$.relationships.first.data.meta).toEqual({ role: 'first' })
    expect(article.$.relationships.second.data.meta).toEqual({ role: 'second' })
    expect(document.data[0].relationships.first.data).toHaveProperty('meta')
  })
  it('L02 local identifiers and id/lid aliases', () => {
    const output = deserialise({
      data: {
        type: 'articles',
        lid: 'a',
        relationships: {
          author: { data: { type: 'people', lid: 'p' } },
          other: { data: { type: 'people', id: '9' } },
        },
      },
      included: [{ type: 'people', id: '9', lid: 'p', attributes: { name: 'Ada' } }],
    })
    expect(output.data.$.lid).toBe('a')
    expect(output.data.author).toEqual({ type: 'people', id: '9', name: 'Ada', $: { lid: 'p' } })
    expect(output.data.author).toBe(output.data.other)
    expect(output.data.author).toBe(output.included[0])
  })
  it('L03 sparse fieldsets retain included resources without linkage', () => {
    const output = deserialise({
      data: { type: 'articles', id: '1', attributes: { title: 'Hello' } },
      included: [{ type: 'people', id: '9', attributes: { name: 'Ada' } }],
    })
    expect(output.data).toEqual({ type: 'articles', id: '1', title: 'Hello' })
    expect(output.included).toEqual([{ type: 'people', id: '9', name: 'Ada' }])
  })
  it('L04 relationship primary identifiers resolve included data', () => {
    const output = deserialise({
      data: [{ type: 'people', id: '9' }],
      included: [{ type: 'people', id: '9', attributes: { name: 'Ada' } }],
    })
    expect(output.data[0]).toEqual({ type: 'people', id: '9', name: 'Ada' })
    expect(output.data[0]).toBe(output.included[0])
  })
  it('L05 public helpers preserve local identity and independent copies', () => {
    const included = [{ type: 'people', lid: 'p', attributes: { name: 'Ada' } }]
    const resource = filterIncludes(included, { type: 'people', lid: 'p' })
    expect(resource).toEqual(included[0])
    resource.attributes.name = 'Changed'
    expect(included[0].attributes.name).toBe('Ada')
    expect(filterIncludes([], { type: 'people', id: '0' })).toEqual({ type: 'people', id: '0' })
    expect(
      linkRelationships({ type: 'articles', id: '1', relationships: { author: { data: null } } }),
    ).toEqual({ type: 'articles', id: '1', author: null })
  })
})
