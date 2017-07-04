import Kitsu from 'kitsu'

describe('Authentication', () => {
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

  describe('WhoAmI', () => {
    it('should return an error if not logged in', () => {
      const kitsu = new Kitsu()

      expect(kitsu.whoAmI()).resolves.toEqual({
        errors: [{
          code: 'K01',
          detail: 'No user is logged in',
          status: 'K01',
          title: 'Not Logged In'
        }]
      })
    })
  })
})
