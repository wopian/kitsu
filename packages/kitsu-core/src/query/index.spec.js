import { query } from './'

describe('kitsu-core', () => {
  describe('query', () => {
    it('returns an empty string by default', () => {
      expect.assertions(1)
      expect(query()).toEqual('')
    })

    it('builds a filter query string', () => {
      expect.assertions(1)
      expect(query({
        filter: {
          slug: 'cowboy-bebop',
          title: {
            value: 'foo'
          }
        }
      })).toEqual('filter%5Bslug%5D=cowboy-bebop&filter%5Btitle%5D%5Bvalue%5D=foo')
    })

    it('builds an include query string', () => {
      expect.assertions(1)
      expect(query({
        include: 'author,comments.author'
      })).toEqual('include=author%2Ccomments.author')
    })

    it('builds a fields query string', () => {
      expect.assertions(1)
      expect(query({
        fields: {
          articles: 'title',
          author: 'name'
        }
      })).toEqual('fields%5Barticles%5D=title&fields%5Bauthor%5D=name')
    })

    it('appends multiple queries', () => {
      expect.assertions(1)
      expect(query({
        page: { limit: 1 },
        sort: '-popularityRank'
      })).toEqual('page%5Blimit%5D=1&sort=-popularityRank')
    })

    it('builds nested parameters', () => {
      expect.assertions(1)
      expect(query({
        fields: {
          abc: {
            def: {
              ghi: {
                jkl: 'mno'
              }
            }
          }
        }
      })).toEqual('fields%5Babc%5D%5Bdef%5D%5Bghi%5D%5Bjkl%5D=mno')
    })

    it('builds list parameters', () => {
      expect.assertions(1)
      expect(query({
        filter: {
          id_in: [ 1, 2, 3 ]
        }
      })).toEqual('filter%5Bid_in%5D%5B%5D=1&filter%5Bid_in%5D%5B%5D=2&filter%5Bid_in%5D%5B%5D=3')
    })

    it('builds nested list parameters', () => {
      expect.assertions(1)
      expect(query({
        filter: {
          users: [ { id: 1, type: 'users' }, { id: 2, type: 'users' } ]
        }
      })).toEqual('filter%5Busers%5D%5B%5D%5Bid%5D=1&filter%5Busers%5D%5B%5D%5Btype%5D=users&filter%5Busers%5D%5B%5D%5Bid%5D=2&filter%5Busers%5D%5B%5D%5Btype%5D=users')
    })
  })
})
