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

describe('serialise', () => {
  it('Should serialise to a JSON API compliant object', async () => {
    expect.assertions(1)
    const input = await serial.camelKebabPlural('libraryEntries', {
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
    const input = await serial.camelKebabPlural('libraryEntries', {
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
    const input = await serial.camelKebabPlural('libraryEntries', {
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
    await expect(serial.camelKebabPlural('libraryEntries', {
      id: '1',
      user: [
        {
          foo: 'bar'
        },
        {
          id: 3
        }
      ]
    })).rejects.toThrowError('POST requires an ID for the user relationships')
  })

  it('Should pluralise type', async () => {
    expect.assertions(1)
    const input = await serial.camelKebabPlural('libraryEntry', {
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
    const input = await serial.camelKebabPlural('anime', {
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
    await expect(serial.camelKebabPlural('post'))
      .rejects
      .toEqual(Error('POST requires a JSON object body'))
  })

  it('Should throw an error if obj is not an Object', async () => {
    expect.assertions(1)
    await expect(serial.camelKebabPlural('post', 'id: 1', 'DELETE'))
      .rejects
      .toEqual(Error('DELETE requires a JSON object body'))
  })

  it('Should throw an error when missing ID', async () => {
    expect.assertions(1)
    await expect(serial.camelKebabPlural('user', { theme: 'dark' }, 'PATCH'))
      .rejects
      .toEqual(Error('PATCH requires an ID for the users type'))
  })
})
