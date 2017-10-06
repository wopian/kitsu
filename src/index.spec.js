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

    it('should allow modifying axios directly', () => {
      const kitsu = new Kitsu()
      console.log(kitsu)
      kitsu.axios.defaults.headers['test'] = '123'
      expect(kitsu.axios.defaults.headers['test']).toBe('123')
    })
  })
})
