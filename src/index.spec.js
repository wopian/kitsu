import Kitsu from 'kitsu'

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
        'content-type': 'application/vnd.api+json'
      })
    })

    it('should set a header', () => {
      const kitsu = new Kitsu()
      kitsu.headers['test'] = '123'
      expect(kitsu.headers['test']).toBe('123')
    })
  })

  describe('auth', () => {
    it('should return false is auth token missing', () => {
      const kitsu = new Kitsu()
      expect(kitsu.isAuth).toEqual(false)
    })

    it('should return true if auth token set in initialisation', () => {
      const kitsu = new Kitsu({ headers: { Authorization: '123 '}})
      expect(kitsu.isAuth).toEqual(true)
    })

    it('should return true if auth token set after initialisation', () => {
      const kitsu = new Kitsu()
      kitsu.headers['Authorization'] = '123'
      expect(kitsu.isAuth).toEqual(true)
    })
  })
})
