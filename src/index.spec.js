import Kitsu from 'kitsu'
import { version } from 'pkg'

describe('Index', () => {
  describe('Kitsu', () => {
    it('should have required JSON-API headers', () => {
      expect.assertions(2)
      const kitsu = new Kitsu()
      expect(kitsu.headers['accept']).toBe('application/vnd.api+json')
      expect(kitsu.headers['content-type']).toBe('application/vnd.api+json')
    })

    it('should set auth header if provided', () => {
      const token = 'Bearer 1234567890'
      const kitsu = new Kitsu({
        headers: {
          authorization: token
        }
      })
      expect(kitsu.headers['authorization']).toBe(token)
    })
  })

  describe('headers', () => {
    it('should display all headers', () => {
      const kitsu = new Kitsu()
      expect(kitsu.headers).toEqual({
        'accept': 'application/vnd.api+json',
        'content-type': 'application/vnd.api+json',
        'user-agent': `Kitsu/${version} (github.com/wopian/kitsu)`
      })
    })

    it('should set a header', () => {
      const kitsu = new Kitsu()
      kitsu.headers['test'] = '123'
      expect(kitsu.headers['test']).toBe('123')
    })
  })

  describe('isAuth', () => {
    it('should return false if not logged in', () => {
      const kitsu = new Kitsu()
      expect(kitsu.isAuth).toBe(false)
    })

    it('should return true if logged in', () => {
      const kitsu = new Kitsu({
        headers: {
          authorization: 'Bearer 1234567890'
        }
      })
      expect(kitsu.isAuth).toBe(true)
    })
  })
})
