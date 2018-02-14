import { query } from './'

describe('query', () => {
  it('should return an empty string by default', () => {
    expect.assertions(1)
    expect(query()).toEqual('')
  })

  it('should build a query string', () => {
    expect.assertions(1)
    expect(query({
      filter: { slug: 'cowboy-bebop' }
    })).toEqual('filter[slug]=cowboy-bebop')
  })

  it('should append multiple queries', () => {
    expect.assertions(1)
    expect(query({
      page: { limit: 1 },
      sort: '-popularityRank'
    })).toEqual('page[limit]=1&sort=-popularityRank')
  })
})
