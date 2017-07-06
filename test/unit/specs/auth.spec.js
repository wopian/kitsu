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
    it('should throw an error if not logged in', async () => {
      expect.assertions(1)
      try {
        const kitsu = new Kitsu()
        await kitsu.whoAmI()
      } catch (e) {
        expect(e.message).toEqual('Not authenticated')
      }
    })
  })
})
