import { deserialise } from './deserialise'

describe('deserialise', () => {
  it('Should deserialise a resource without included relationships', () => {
    expect(deserialise({
      data: {
        id: '9',
        type: 'roles',
        attributes: {
          name: 'mod'
        }
      }
    })).resolves.toEqual({
      data: {
        id: '9',
        type: 'roles',
        name: 'mod'
      }
    })
  })

  it('Should deserialise a collection without attributes and included relationships', () => {
    expect(deserialise({
      data: [
        {
          id: '1',
          type: 'userRoles'
        },
        {
          id: '2',
          type: 'userRoles'
        }
      ]
    })).resolves.toEqual({
      data: [
        {
          id: '1',
          type: 'userRoles'
        },
        {
          id: '2',
          type: 'userRoles'
        }
      ]
    })
  })

  it('Should deserialise a collection of resources with included relationships', async () => {
    expect.assertions(1)
    await expect(deserialise({
      data: [{
        id: '1',
        type: 'users',
        attributes: {
          name: 'Josh'
        },
        relationships: {
          waifu: {
            data: {
              id: '1',
              type: 'characters'
            }
          }
        }
      }],
      included: [{
        id: '1',
        type: 'characters',
        attributes: {
          name: 'Genkai'
        }
      }]
    })).resolves.toEqual({
      data: [{
        name: 'Josh',
        waifu: {
          name: 'Genkai',
          id: '1',
          type: 'characters'
        },
        id: '1',
        type: 'users'
      }]
    })
  })

  it('Should deserialise a single resource with included relationships', async () => {
    expect.assertions(1)
    await expect(deserialise({
      data: {
        id: '1',
        type: 'users',
        attributes: {
          name: 'Josh'
        },
        relationships: {
          waifu: {
            data: {
              id: '1',
              type: 'characters'
            }
          }
        }
      },
      included: [{
        id: '1',
        type: 'characters',
        attributes: {
          name: 'Genkai'
        }
      }]
    })).resolves.toEqual({
      data: {
        name: 'Josh',
        waifu: {
          name: 'Genkai',
          id: '1',
          type: 'characters'
        },
        id: '1',
        type: 'users'
      }
    })
  })
})
