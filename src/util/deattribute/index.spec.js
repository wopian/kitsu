import { deattribute } from './'

describe('deattribute', () => {
  it('Should deattribute an object', () => {
    expect.assertions(1)
    expect(deattribute({
      attributes: {
        key: 'value'
      }
    })).resolves.toEqual({
      key: 'value'
    })
  })

  it('Should handle arrays', () => {
    expect.assertions(1)
    expect(deattribute([{
      attributes: {
        key: 'value'
      }
    }])).resolves.toEqual([{
      key: 'value'
    }])
  })
})
