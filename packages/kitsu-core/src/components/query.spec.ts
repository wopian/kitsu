import test from 'ava'

import { query } from '../index.js'

test('returns an empty string by default', t => {
  t.is(query({}), '')
})

test('builds a filter query string', t => {
  t.is(
    query({
      filter: {
        slug: 'cowboy-bebop',
        title: {
          value: 'foo'
        }
      }
    }),
    'filter%5Bslug%5D=cowboy-bebop&filter%5Btitle%5D%5Bvalue%5D=foo'
  )
})

test('builds an include query string', t => {
  t.is(
    query({
      include: 'author,comments.author'
    }),
    'include=author%2Ccomments.author'
  )
})

test('builds a fields query string', t => {
  t.is(
    query({
      fields: {
        articles: 'title',
        author: 'name'
      }
    }),
    'fields%5Barticles%5D=title&fields%5Bauthor%5D=name'
  )
})

test('appends multiple queries', t => {
  t.is(
    query({
      page: { limit: 1 },
      sort: '-popularityRank'
    }),
    'page%5Blimit%5D=1&sort=-popularityRank'
  )
})

test('builds nested parameters', t => {
  t.is(
    query({
      fields: {
        abc: {
          def: {
            ghi: {
              jkl: 'mno'
            }
          }
        }
      }
    }),
    'fields%5Babc%5D%5Bdef%5D%5Bghi%5D%5Bjkl%5D=mno'
  )
})

test('builds list parameters', t => {
  t.is(
    query({
      filter: {
        id_in: [1, 2, 3]
      }
    }),
    'filter%5Bid_in%5D=1&filter%5Bid_in%5D=2&filter%5Bid_in%5D=3'
  )
})

test('builds nested list parameters', t => {
  t.is(
    query({
      filter: {
        users: [
          { id: 1, type: 'users' },
          { id: 2, type: 'users' }
        ]
      }
    }),
    'filter%5Busers%5D%5Bid%5D=1&filter%5Busers%5D%5Btype%5D=users&filter%5Busers%5D%5Bid%5D=2&filter%5Busers%5D%5Btype%5D=users'
  )
})
