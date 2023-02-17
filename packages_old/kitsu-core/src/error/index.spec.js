import { error } from './'

describe('kitsu-core', () => {
  describe('error', () => {
    it('handles axios response errors', () => {
      expect.assertions(1)
      const object = { response: {} }
      expect(() => {
        error(object)
      }).toThrow()
    })

    it('handles axios response errors with JSON:API errors', () => {
      expect.assertions(1)
      const object = {
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
        error(object)
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
      const object = {
        errors: [{ code: 400 }]
      }
      try {
        error(object)
      } catch (error_) {
        expect(error_).toEqual({
          errors: [{ code: 400 }]
        })
      }
    })

    it('throws all other errors', () => {
      expect.assertions(2)
      expect(() => {
        error('Hello')
      }).toThrowError('Hello')
      expect(() => {
        error(new Error('Hello'))
      }).toThrowError('Hello')
    })
  })
})
