import { linkRelationships } from './'

describe('kitsu-core', () => {
  describe('linkRelationships', () => {
    it('links single relationship to included data', () => {
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
      expect(linkRelationships(data, included))
        .toEqual({
          waifu: {
            data: {
              id: '3',
              name: 'Maki',
              type: 'characters'
            }
          }
        })
    })

    it('links a relationship collection to included data', () => {
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
      expect(linkRelationships(data, included))
        .toEqual({
          favorites: {
            data: [
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
          }
        })
    })

    it('does not deattribute key if theres a relationship (single) with same name (handle invalid JSON:API)', () => {
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
      expect(linkRelationships(data, included))
        .toEqual({
          attributes: {
            author: 'Joe'
          },
          author: {
            data: {
              id: '1',
              name: 'Joe',
              type: 'people'
            }
          }
        })
    })

    it('does not deattribute key if theres a relationship (array) with same name (handle invalid JSON:API)', () => {
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
      expect(linkRelationships(data, included))
        .toEqual({
          attributes: {
            authors: [ 'Joe', 'Mary' ]
          },
          authors: {
            data: [
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
          }
        })
    })

    it('accepts empty inputs', () => {
      expect.assertions(1)
      expect(linkRelationships({}, [])).toEqual({})
    })

    it('accepts empty inputs 2', () => {
      expect.assertions(1)
      expect(linkRelationships({}, undefined)).toEqual({})
    })

    it('gracefully handles broken relationship syntax', () => {
      expect.assertions(1)
      const data = {
        relationships: {
          test: {}
        }
      }
      expect(linkRelationships(data, undefined)).toEqual({
        test: {}
      })
    })

    it('accepts link-only relationships', () => {
      expect.assertions(1)
      const data = {
        relationships: {
          test: {
            links: {
              self: 'https://kitsu.example'
            }
          }
        }
      }
      expect(linkRelationships(data, undefined)).toEqual({
        test: {
          links: {
            self: 'https://kitsu.example'
          }
        }
      })
    })

    it('accepts attribute.attribute in relationships', () => {
      expect.assertions(1)
      const data = {
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
            attributes: 'Joe'
          }
        }
      ]
      expect(linkRelationships(data, included))
        .toEqual({
          author: {
            data: {
              id: '1',
              attributes: 'Joe',
              type: 'people'
            }
          }
        })
    })
  })
})
