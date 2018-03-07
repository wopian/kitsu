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
      })).toEqual('filter[slug]=cowboy-bebop&filter[title][value]=foo')
    })

    it('builds an include query string', () => {
      expect.assertions(1)
      expect(query({
        include: 'author,comments.author'
      })).toEqual('include=author,comments.author')
    })

    it('builds a fields query string', () => {
      expect.assertions(1)
      expect(query({
        fields: {
          articles: 'title',
          author: 'name'
        }
      })).toEqual('fields[articles]=title&fields[author]=name')
    })

    it('appends multiple queries', () => {
      expect.assertions(1)
      expect(query({
        page: { limit: 1 },
        sort: '-popularityRank'
      })).toEqual('page[limit]=1&sort=-popularityRank')
    })
  })
})
