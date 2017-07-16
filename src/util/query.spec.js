import { query } from './query'

describe('query', () => {
  it('Should return an empty string by default', () => {
    expect(query()).toBe('')
  })

  it('Should build a query string', () => {
    expect(query({
      filter: { slug: 'cowboy-bebop' }
    })).toBe('?filter[slug]=cowboy-bebop')
  })

  it('Should append multiple queries', () => {
    expect(query({
      page: { limit: 1 },
      sort: '-popularityRank'
    })).toBe('?page[limit]=1&sort=-popularityRank')
  })
})
