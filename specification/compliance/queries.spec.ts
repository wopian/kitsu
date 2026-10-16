import { describe, expect, it } from 'bun:test'
import { query } from 'kitsu-core'

describe('JSON:API 1.1 queries', () => {
  it('Q01 include paths, sparse fields, sort order, and empty values', () => {
    expect(
      query({
        include: 'author,comments.author',
        fields: { articles: 'title,author', people: '' },
        sort: '-created,title',
      }),
    ).toBe(
      'include=author%2Ccomments.author&fields%5Barticles%5D=title%2Cauthor&fields%5Bpeople%5D=&sort=-created%2Ctitle',
    )
    expect(query({ include: '' })).toBe('include=')
  })
  it('Q02 query families and extension names', () => {
    expect(
      query({
        page: { offset: 0, limit: 10, cursor: 'a+b' },
        filter: { 'author.status': 'active' },
        'version:since': '1',
        searchTerm: '日本語',
      }),
    ).toBe(
      'page%5Boffset%5D=0&page%5Blimit%5D=10&page%5Bcursor%5D=a%2Bb&filter%5Bauthor.status%5D=active&version%3Asince=1&searchTerm=%E6%97%A5%E6%9C%AC%E8%AA%9E',
    )
  })
  it('Q03 form encoding round-trips spaces, plus signs, brackets, and punctuation', () => {
    const output = query({ filter: { 'given name': 'a + b&c=é' }, searchTerm: "~!'()" })
    expect(output).toBe('filter%5Bgiven+name%5D=a+%2B+b%26c%3D%C3%A9&searchTerm=%7E%21%27%28%29')
    expect(new URLSearchParams(output).get('filter[given name]')).toBe('a + b&c=é')
  })
  it('Q04 traditional and modern implementation-specific lists remain supported', () => {
    expect(query({ filter: { ids: [1, 2] } })).toBe('filter%5Bids%5D=1&filter%5Bids%5D=2')
    expect(query({ filter: { ids: [1, 2] } }, undefined, false)).toBe(
      'filter%5Bids%5D%5B%5D=1&filter%5Bids%5D%5B%5D=2',
    )
  })
})
