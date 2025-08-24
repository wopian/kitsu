import { error } from './'

describe('kitsu-core', () => {
  describe('error', () => {
    it('handles axios response errors', () => {
      expect.assertions(1)
      const obj = { response: {} }
      expect(() => { error(obj) }).toThrow()
    })

    it('handles axios response errors with JSON:API errors', () => {
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

    it('handles top-level JSON:API errors', () => {
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

    it('throws all other errors', () => {
      expect.assertions(2)
      expect(() => { error('Hello') }).toThrow('Hello')
      expect(() => { error(new Error('Hello')) }).toThrow('Hello')
    })
  })
})
