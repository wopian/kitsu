import { deserialise } from './deserialise'

describe('deserialise', () => {
  it('Should deserialise a collection of resources', async () => {
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

  it('Should deserialise a single resource', async () => {
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
