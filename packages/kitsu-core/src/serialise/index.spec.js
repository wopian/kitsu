import plural from 'pluralize'
import { camel, kebab, snake } from '../'
import { serialise } from './'

// Mock being run from the Kitsu Class:
// serialise.call(this, [...args]) is used to pass constructor options
const skip = s => s
const serial = {
  // camelCaseTypes: false  resourceCase: kebab   pluralize: false
  kebab: serialise.bind({ camel: skip, resCase: kebab, plural: skip }),
  // camelCaseTypes: false  resourceCase: kebab   pluralize: true
  kebabPlural: serialise.bind({ camel: skip, resCase: kebab, plural }),
  // camelCaseTypes: false  resourceCase: none    pluralize: false
  none: serialise.bind({ camel: skip, resCase: skip, plural: skip }),
  // camelCaseTypes: false  resourceCase: none    pluralize: true
  nonePlural: serialise.bind({ camel: skip, resCase: skip, plural }),
  // camelCaseTypes: false  resourceCase: snake   pluralize: false
  snake: serialise.bind({ camel: skip, resCase: snake, plural: skip }),
  // camelCaseTypes: false  resourceCase: snake   pluralize: true
  snakePlural: serialise.bind({ camel: skip, resCase: snake, plural: skip }),
  // camelCaseTypes: true   resourceCase: kebab   pluralize: false
  camelKebab: serialise.bind({ camel, resCase: kebab, plural: skip }),
  // camelCaseTypes: true   resourceCase: kebab   pluralize: true     DEFAULT
  camelKebabPlural: serialise.bind({ camel, resCase: kebab, plural }),
  // camelCaseTypes: true   resourceCase: none    pluralize: false
  camelNone: serialise.bind({ camel, resCase: skip, plural: skip }),
  // camelCaseTypes: true   resourceCase: none    pluralize: true
  camelNonePlural: serialise.bind({ camel, resCase: skip, plural }),
  // camelCaseTypes: true   resourceCase: snake   pluralize: false
  camelSnake: serialise.bind({ camel, resCase: snake, plural: skip }),
  // camelCaseTypes: true   resourceCase: snake   pluralize: true
  camelSnakePlural: serialise.bind({ camel, resCase: snake, plural })
}

describe('kitsu-core', () => {
  describe('serialise', () => {
    it('serialises to a JSON API compliant object', () => {
      expect.assertions(1)
      const input = serial.camelKebabPlural('libraryEntries', {
        ratingTwenty: 20
      })
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
      const input = serial.camelKebabPlural('libraryEntries', {
        user: {
          id: '2'
        }
      })
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
      const input = serial.camelKebabPlural('libraryEntries', {
        user: [
          {
            id: '2',
            type: 'users'
          },
          {
            id: '3'
          }
        ]
      })
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
      const input = serial.camelKebabPlural('libraryEntries', {
        id: '123456789',
        ratingTwenty: 20
      })
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

    it('throws an error when serialising array relationships with missing ID', () => {
      expect.assertions(2)
      try {
        serial.camelKebabPlural('libraryEntries', {
          id: '1',
          user: [ 
            { foo: 'bar' }, 
            { id: 3 }
          ]
        })
      } catch (err) {
        expect(err.name).toEqual('Error')
        expect(err.message).toEqual('POST requires an ID for the user relationships')
      }
    })

    it('throws an error when serialising  relationships with missing ID', () => {
      expect.assertions(2)
      try {
        serial.camelKebabPlural('libraryEntries', {
          id: '1',
          bar: { foo: 'bar' }
        })
      } catch (err) {
        expect(err.name).toEqual('Error')
        expect(err.message).toEqual('POST requires an ID for the bar relationships')
      }
    })

    it('pluralises type', () => {
      expect.assertions(1)
      const input = serial.camelKebabPlural('libraryEntry', {
        rating: '1'
      })
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
      const input = serial.camelKebabPlural('anime', {
        slug: 'Cowboy Bebop 2'
      })
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
      const input = serial.none('libraryEntry', {
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
      expect(() => serial.camelKebabPlural('post'))
        .toThrowError('POST requires a JSON object body')
    })

    it('throws an error if obj is not an Object', () => {
      expect.assertions(1)
      expect(() => serial.camelKebabPlural('post', 'id: 1', 'DELETE'))
        .toThrowError('DELETE requires a JSON object body')
    })

    it('throws an error when missing ID', () => {
      expect.assertions(1)
      expect(() => serial.camelKebabPlural('user', { theme: 'dark' }, 'PATCH'))
        .toThrowError('PATCH requires an ID for the users type')
    })
  })
})
