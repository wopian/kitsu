import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import Kitsu from 'kitsu'

const mock = new MockAdapter(axios)

afterEach(() => {
  mock.reset()
})

describe('self', () => {
  it('Should send headers', async done => {
    expect.assertions(1)
    const api = new Kitsu({ headers: { Authorization: true } })
    mock.onGet('/users', { filter: { self: true } }).reply(config => {
      expect(config.headers).toEqual({
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Authorization': true,
        extra: true
      })
      return [ 200, { data: [] } ]
    })
    api.self(undefined, { extra: true }).catch(err => {
      done.fail(err)
    })
    done()
  })

  it('Should fetch the authenticated user', async () => {
    expect.assertions(1)
    const api = new Kitsu()
    mock.onGet('/users', { filter: { self: true } }).reply(200, {
      data: [
        {
          id: '1',
          type: 'users',
          attributes: { name: 'John' }
        }
      ]
    })
    expect(await api.self()).toEqual({
      id: '1',
      type: 'users',
      name: 'John'
    })
  })
})
