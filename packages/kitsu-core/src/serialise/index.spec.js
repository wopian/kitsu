import plural from 'pluralize'
import { camel } from '../'
import { serialise } from './'

describe('kitsu-core', () => {
  describe('serialise', () => {
    it('accepts camelCaseTypes as an option (default)', () => {
      expect.assertions(1)
      const input = serialise('library-entries', { id: '1' }, undefined)
      expect(input).toEqual({
        data: {
          id: '1',
          type: 'library-entries'
        }
      })
    })

    it('accepts camelCaseTypes as an option (value set)', () => {
      expect.assertions(1)
      const input = serialise('library-entries', { id: '1' }, undefined, {
        camelCaseTypes: camel
      })
      expect(input).toEqual({
        data: {
          id: '1',
          type: 'libraryEntries'
        }
      })
    })

    it('accepts pluralTypes  as an option (default)', () => {
      expect.assertions(1)
      const input = serialise('libraryEntry', { id: '1' }, undefined)
      expect(input).toEqual({
        data: {
          id: '1',
          type: 'libraryEntry'
        }
      })
    })

    it('accepts pluralTypes as an option (value set)', () => {
      expect.assertions(1)
      const input = serialise('libraryEntry', { id: '1' }, undefined, {
        pluralTypes: plural
      })
      expect(input).toEqual({
        data: {
          id: '1',
          type: 'libraryEntries'
        }
      })
    })

    it('serialises to a JSON API compliant object', () => {
      expect.assertions(1)
      const input = serialise(
        'libraryEntries',
        {
          ratingTwenty: 20
        },
        undefined,
        {
          camelCaseTypes: camel,
          pluralTypes: plural
        }
      )
      expect(input).toEqual({
        data: {
          attributes: {
            ratingTwenty: 20
          },
          type: 'libraryEntries'
        }
      })
    })

    it('serialises JSON API relationships', () => {
      expect.assertions(1)
      const input = serialise(
        'libraryEntries',
        {
          user: {
            id: '2'
          }
        },
        undefined,
        {
          camelCaseTypes: camel,
          pluralTypes: plural
        }
      )
      expect(input).toEqual({
        data: {
          relationships: {
            user: {
              data: {
                id: '2',
                type: 'users'
              }
            }
          },
          type: 'libraryEntries'
        }
      })
    })

    it('serialises JSON API array relationships', () => {
      expect.assertions(1)
      const input = serialise(
        'libraryEntries',
        {
          user: [
            {
              id: '2',
              type: 'users'
            },
            {
              id: '3'
            }
          ]
        },
        undefined,
        {
          camelCaseTypes: camel,
          pluralTypes: plural
        }
      )
      expect(input).toEqual({
        data: {
          relationships: {
            user: {
              data: [
                {
                  id: '2',
                  type: 'users'
                },
                {
                  id: '3',
                  type: 'users'
                }
              ]
            }
          },
          type: 'libraryEntries'
        }
      })
    })

    it('serialises JSON API with a client-generated ID', () => {
      expect.assertions(1)
      const input = serialise(
        'libraryEntries',
        {
          id: '123456789',
          ratingTwenty: 20
        },
        undefined,
        {
          camelCaseTypes: camel,
          pluralTypes: plural
        }
      )
      expect(input).toEqual({
        data: {
          id: '123456789',
          type: 'libraryEntries',
          attributes: {
            ratingTwenty: 20
          }
        }
      })
    })

    it('pluralises type', () => {
      expect.assertions(1)
      const input = serialise(
        'libraryEntry',
        {
          rating: '1'
        },
        undefined,
        {
          camelCaseTypes: camel,
          pluralTypes: plural
        }
      )
      expect(input).toEqual({
        data: {
          type: 'libraryEntries',
          attributes: {
            rating: '1'
          }
        }
      })
    })

    it('does not pluralise mass nouns', () => {
      expect.assertions(1)
      const input = serialise(
        'anime',
        {
          slug: 'Cowboy Bebop 2'
        },
        undefined,
        {
          camelCaseTypes: camel,
          pluralTypes: plural
        }
      )
      expect(input).toEqual({
        data: {
          type: 'anime',
          attributes: {
            slug: 'Cowboy Bebop 2'
          }
        }
      })
    })

    it('does not pluralise type', () => {
      expect.assertions(1)
      const input = serialise('libraryEntry', {
        rating: '1'
      })
      expect(input).toEqual({
        data: {
          type: 'libraryEntry',
          attributes: {
            rating: '1'
          }
        }
      })
    })

    it('throws an error if obj is missing', () => {
      expect.assertions(1)
      expect(() => serialise('post'))
        .toThrowError('POST requires an object or array body')
    })

    it('throws an error if obj is not an Object', () => {
      expect.assertions(1)
      expect(() => serialise('post', 'id: 1', 'DELETE'))
        .toThrowError('DELETE requires an object or array body')
    })

    it('throws an error when missing ID', () => {
      expect.assertions(1)
      expect(() => serialise('user', { theme: 'dark' }, 'PATCH'))
        .toThrowError('PATCH requires an ID for the user type')
    })

    it('throws an error when missing ID in array', () => {
      expect.assertions(1)
      expect(() => serialise('user', [ { theme: 'dark' } ], 'PATCH'))
        .toThrowError('PATCH requires an ID for the user type')
    })

    it('serialises strings/numbers/booleans into attributes', () => {
      expect.assertions(1)
      const input = serialise('resourceModel', {
        string: 'shark',
        number: 1,
        boolean: true
      })
      expect(input).toEqual({
        data: {
          type: 'resourceModel',
          attributes: {
            string: 'shark',
            number: 1,
            boolean: true
          }
        }
      })
    })

    it('serialises bare objects into attributes', () => {
      expect.assertions(1)
      const input = serialise('resourceModel', {
        object: {
          string: 'shark'
        },
        blank: {}
      })
      expect(input).toEqual({
        data: {
          type: 'resourceModel',
          attributes: {
            object: {
              string: 'shark'
            },
            blank: {}
          }
        }
      })
    })

    it('serialises type objects into relationships', () => {
      expect.assertions(1)
      const input = serialise('resourceModel', {
        object: {
          id: '1',
          type: 'relationshipModel'
        }
      })
      expect(input).toEqual({
        data: {
          type: 'resourceModel',
          relationships: {
            object: {
              data: {
                id: '1',
                type: 'relationshipModel'
              }
            }
          }
        }
      })
    })

    it('serialises type objects into relationships inside arrays', () => {
      expect.assertions(1)
      const input = serialise('resourceModel', [ {
        object: {
          id: '1',
          type: 'relationshipModel'
        }
      } ])
      expect(input).toEqual({
        data: [ {
          type: 'resourceModel',
          relationships: {
            object: {
              data: {
                id: '1',
                type: 'relationshipModel'
              }
            }
          }
        } ]
      })
    })

    it('serialises bare arrays into attributes', () => {
      expect.assertions(1)
      const input = serialise('resourceModel', {
        array: [ 0 ],
        deepArray: [ [ 0 ] ],
        arrayObject: [ { string: 'shark' } ],
        blank: []
      })
      expect(input).toEqual({
        data: {
          type: 'resourceModel',
          attributes: {
            array: [ 0 ],
            deepArray: [ [ 0 ] ],
            arrayObject: [ { string: 'shark' } ],
            blank: []
          }
        }
      })
    })

    it('serialises type arrays into relationships', () => {
      expect.assertions(1)
      const input = serialise('resourceModel', {
        array: [ {
          id: '1',
          type: 'relationshipModel'
        } ]
      })
      expect(input).toEqual({
        data: {
          type: 'resourceModel',
          relationships: {
            array: {
              data: [ {
                id: '1',
                type: 'relationshipModel'
              } ]
            }
          }
        }
      })
    })

    it('serialises relationship clearing (to-one)', () => {
      expect.assertions(1)
      const input = serialise('resourceModel', null)
      expect(input).toEqual({
        data: null
      })
    })

    it('serialises relationship clearing (to-many)', () => {
      expect.assertions(1)
      const input = serialise('resourceModel', [])
      expect(input).toEqual({
        data: []
      })
    })

    it('serialises a data array without ID (POST)', () => {
      expect.assertions(1)
      const resource = { content: 'some new content' }
      const resourceOutput = { type: 'posts', attributes: { content: 'some new content' } }
      const input = serialise('posts', [ resource, resource ])
      expect(input).toEqual({
        data: [ resourceOutput, resourceOutput ]
      })
    })

    it('serialises a data array with ID (PATCH/DELETE)', () => {
      expect.assertions(1)
      const resource = { id: '1', content: 'some new content' }
      const resourceOutput = { id: '1', type: 'posts', attributes: { content: 'some new content' } }
      const input = serialise('posts', [ resource, resource ])
      expect(input).toEqual({
        data: [ resourceOutput, resourceOutput ]
      })
    })

    it('does not error with an invalid JSON value (undefined)', () => {
      expect.assertions(1)
      const resource = { id: '1', content: undefined }
      const resourceOutput = { id: '1', type: 'posts', attributes: { content: undefined } }
      const input = serialise('posts', resource)
      expect(input).toEqual({ data: resourceOutput })
    })
  })
})
