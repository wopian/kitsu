import Kitsu from 'kitsu'
import { version } from 'pkg'

describe('Initialisation', () => {
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
