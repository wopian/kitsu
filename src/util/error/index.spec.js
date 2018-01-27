import { error } from './'

describe('error', () => {
  it('Should handle axios response errors', () => {
    expect.assertions(1)
    const obj = { response: {} }
    expect(() => { error(obj) }).toThrow()
  })

  it('Should handle axios response errors with JSON:API errors', () => {
    expect.assertions(1)
    const obj = {
      response: {
        data: {
          errors: [
            {
              title: 'Filter is not allowed',
              detail: 'x is not allowed',
              code: '102',
              status: '400'
            }
          ]
        }
      }
    }
    try {
      error(obj)
    } catch ({ errors }) {
      expect(errors).toEqual([
        {
          title: 'Filter is not allowed',
          detail: 'x is not allowed',
          code: '102',
          status: '400'
        }
      ])
    }
  })

  it('Should handle top-level JSON:API errors', () => {
    expect.assertions(1)
    const obj = {
      errors: [ { code: 400 } ]
    }
    try {
      error(obj)
    } catch (err) {
      expect(err).toEqual({
        errors: [ { code: 400 } ]
      })
    }
  })

  it('Should throw all other errors', () => {
    expect.assertions(2)
    expect(() => { error('Hello') }).toThrowError('Hello')
    expect(() => { error(new Error('Hello')) }).toThrowError('Hello')
  })
})
