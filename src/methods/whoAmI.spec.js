import Kitsu from 'kitsu'

describe('whoAmI', () => {
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
