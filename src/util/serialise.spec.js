import { serialise } from './serialise'

describe('serialise', () => {
  it('Should serialise to a JSON API complient object', () => {
    expect.assertions(1)
    expect(serialise('libraryEntries', {
      id: '1',
      ratingTwenty: 20
    })).resolves.toEqual({
      data: {
        attributes: {
          ratingTwenty: 20
        },
        type: 'libraryEntries'
      }
    })
  })

  it('Should serialise JSON API relationships', () => {
    expect.assertions(1)
    expect(serialise('LibraryEntries', {
      id: '1',
      user: {
        id: '2'
      }
    })).resolves.toEqual({
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

  it('Should pluralise type', () => {
    expect.assertions(1)
    expect(serialise('libraryEntry', {
      rating: '1'
    })).resolves.toEqual({
      data: {
        type: 'libraryEntries',
        attributes: {
          rating: '1'
        }
      }
    })
  })

  it('Should not pluralise mass nouns', () => {
    expect.assertions(1)
    expect(serialise('anime', {
      slug: 'Cowboy Bebop 2'
    })).resolves.toEqual({
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
    await expect(serialise('post'))
      .rejects
      .toEqual(Error('POST requires a JSON object body'))
  })

  it('Should throw an error if obj is not an Object', async () => {
    expect.assertions(1)
    await expect(serialise('post', 'id: 1', 'DELETE'))
      .rejects
      .toEqual(Error('DELETE requires a JSON object body'))
  })

  it('Should throw an error when missing ID', async () => {
    expect.assertions(1)
    await expect(serialise('user', { theme: 'dark' }, 'PATCH'))
      .rejects
      .toEqual(Error('PATCH requires an ID for the users type'))
  })
})
