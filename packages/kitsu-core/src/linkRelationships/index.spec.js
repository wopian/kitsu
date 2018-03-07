import { linkRelationships } from './'

describe('kitsu-core', () => {
  describe('linkRelationships', () => {
    it('links single relationship to included data', async () => {
      expect.assertions(1)
      const data = {
        relationships: {
          waifu: {
            data: {
              id: '3',
              type: 'characters'
            }
          }
        }
      }
      const included = [
        {
          id: '3',
          type: 'characters',
          attributes: {
            name: 'Maki'
          }
        }
      ]
      expect(await linkRelationships(data, included))
        .toEqual({
          waifu: {
            id: '3',
            name: 'Maki',
            type: 'characters'
          }
        })
    })

    it('links a relationship collection to included data', async () => {
      expect.assertions(1)
      const data = {
        relationships: {
          favorites: {
            data: [
              {
                id: '1',
                type: 'favorites'
              },
              {
                id: '2',
                type: 'favorites'
              }
            ]
          }
        }
      }
      const included = [
        {
          id: '1',
          type: 'favorites',
          attributes: {
            favRank: 1
          }
        },
        {
          id: '2',
          type: 'favorites',
          attributes: {
            favRank: 1
          }
        }
      ]
      expect(await linkRelationships(data, included))
        .toEqual({
          favorites: [
            {
              id: '1',
              favRank: 1,
              type: 'favorites'
            },
            {
              id: '2',
              favRank: 1,
              type: 'favorites'
            }
          ]
        })
    })

    it('does not deattribute key if theres a relationship (single) with same name (handle invalid JSON:API)', async () => {
      expect.assertions(1)
      const data = {
        attributes: {
          author: 'Joe'
        },
        relationships: {
          author: {
            data: {
              id: '1',
              type: 'people'
            }
          }
        }
      }
      const included = [
        {
          id: '1',
          type: 'people',
          attributes: {
            name: 'Joe'
          }
        }
      ]
      expect(await linkRelationships(data, included))
        .toEqual({
          attributes: {
            author: 'Joe'
          },
          author: {
            id: '1',
            name: 'Joe',
            type: 'people'
          }
        })
    })

    it('does not deattribute key if theres a relationship (array) with same name (handle invalid JSON:API)', async () => {
      expect.assertions(1)
      const data = {
        attributes: {
          authors: [ 'Joe', 'Mary' ]
        },
        relationships: {
          authors: {
            data: [
              {
                id: '1',
                type: 'people'
              },
              {
                id: '2',
                type: 'people'
              }
            ]
          }
        }
      }
      const included = [
        {
          id: '1',
          type: 'people',
          attributes: {
            name: 'Joe'
          }
        },
        {
          id: '2',
          type: 'people',
          attributes: {
            name: 'Mary'
          }
        }
      ]
      expect(await linkRelationships(data, included))
        .toEqual({
          attributes: {
            authors: [ 'Joe', 'Mary' ]
          },
          authors: [
            {
              id: '1',
              name: 'Joe',
              type: 'people'
            },
            {
              id: '2',
              name: 'Mary',
              type: 'people'
            }
          ]
        })
    })
  })
})
