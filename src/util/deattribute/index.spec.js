import { deattribute } from './'

describe('deattribute', () => {
  it('Should deattribute an object', async () => {
    expect.assertions(1)
    expect(await deattribute({
      attributes: {
        key: 'value'
      }
    })).toEqual({
      key: 'value'
    })
  })

  it('Should deattribute an array of objects', async () => {
    expect.assertions(1)
    expect(await deattribute([
      {
        attributes: {
          key: 'value'
        }
      },
      {
        attributes: {
          key: 'value'
        }
      }
    ])).toEqual([
      {
        key: 'value'
      },
      {
        key: 'value'
      }
    ])
  })

  it('Should do nothing if no attributes supplied', async () => {
    expect.assertions(1)
    expect(await deattribute({
      id: '1'
    })).toEqual({ id: '1' })
  })

  it('Should strip attributes object if empty', async () => {
    expect.assertions(1)
    expect(await deattribute({
      id: '1',
      attributes: {}
    })).toEqual({ id: '1' })
  })
})
