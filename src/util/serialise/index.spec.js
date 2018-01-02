import camelcase from 'camelcase'
import decamelize from 'decamelize'
import pluralize from 'pluralize'

import { serialise } from './'

// Mock being run from the Kitsu Class:
// serialise.call(this, ...args) is used to pass constructor options
const kebab = s => s
const camel = s => s
const plural = s => s
plural.singular = s => s
const serialisePluralConvertCamelCase = serialise.bind({ kebab: decamelize, camel: camelcase, plural: pluralize })
const serialisePluralize = serialise.bind({ kebab, camel, plural: pluralize })
const serialiseConvertCamelCase = serialise.bind({ kebab: decamelize, camel: camelcase, plural })

describe('serialise', () => {
  it('Should serialise to a JSON API compliant object', async () => {
    expect.assertions(1)
    const input = await serialisePluralConvertCamelCase('LibraryEntries', {
      id: '1',
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

  it('Should serialise JSON API relationships', async () => {
    expect.assertions(1)
    const input = await serialisePluralConvertCamelCase('LibraryEntries', {
      id: '1',
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

  it('Should serialise JSON API array relationships', async () => {
    expect.assertions(1)
    const input = await serialisePluralConvertCamelCase('LibraryEntries', {
      id: '1',
      user: [
        {
          id: '2'
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
            data: [{
              id: '2',
              type: 'users'
            },
            {
              id: '3',
              type: 'users'
            }]
          }
        },
        type: 'libraryEntries'
      }
    })
  })

  it('Should throw an error when trying to serialise JSON API array relationships without ID', async () => {
    await expect(serialisePluralConvertCamelCase('LibraryEntries', {
      id: '1',
      user: [
        {
          foo: 'bar'
        },
        {
          id: 3
        }
      ]
    }))
      .rejects
      .toEqual(Error('POST requires an ID for the user relationships'))
  })

  it('Should pluralise type', async () => {
    expect.assertions(1)
    const input = await serialisePluralConvertCamelCase('libraryEntry', {
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

  it('Should not pluralise mass nouns', async () => {
    expect.assertions(1)
    const input = await serialisePluralConvertCamelCase('anime', {
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

  it('Should throw an error if obj is missing', async () => {
    expect.assertions(1)
    await expect(serialisePluralConvertCamelCase('post'))
      .rejects
      .toEqual(Error('POST requires a JSON object body'))
  })

  it('Should throw an error if obj is not an Object', async () => {
    expect.assertions(1)
    await expect(serialisePluralConvertCamelCase('post', 'id: 1', 'DELETE'))
      .rejects
      .toEqual(Error('DELETE requires a JSON object body'))
  })

  it('Should throw an error when missing ID', async () => {
    expect.assertions(1)
    await expect(serialisePluralConvertCamelCase('user', { theme: 'dark' }, 'PATCH'))
      .rejects
      .toEqual(Error('PATCH requires an ID for the users type'))
  })
})
