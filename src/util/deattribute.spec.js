import { deattribute } from './deattribute'

describe('deattribute', () => {
  it('Should do something', () => {
    expect(deattribute({
      attributes: {
        key: 'value'
      }
    })).resolves.toEqual({
      key: 'value'
    })
  })

  it('Should handle arrays', () => {
    expect(deattribute([{
      attributes: {
        key: 'value'
      }
    }])).resolves.toEqual([{
      key: 'value'
    }])
  })
})
