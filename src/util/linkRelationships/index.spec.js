import { linkRelationships } from './'

describe('linkRelationships', () => {
  it('Should link single relationship to included data', async () => {
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

  it('Should link a relationship collection to included data', async () => {
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
})
