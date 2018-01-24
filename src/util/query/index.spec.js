import { query } from './'

describe('query', () => {
  it('Should return an empty string by default', () => {
    expect.assertions(1)
    expect(query()).toEqual('')
  })

  it('Should build a query string', () => {
    expect.assertions(1)
    expect(query({
      filter: { slug: 'cowboy-bebop' }
    })).toEqual('filter[slug]=cowboy-bebop')
  })

  it('Should append multiple queries', () => {
    expect.assertions(1)
    expect(query({
      page: { limit: 1 },
      sort: '-popularityRank'
    })).toEqual('page[limit]=1&sort=-popularityRank')
  })
})
