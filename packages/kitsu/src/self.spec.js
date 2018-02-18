import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import Kitsu from 'kitsu'
import {
  getError
} from 'specification'

const mock = new MockAdapter(axios)

afterEach(() => {
  mock.reset()
})

describe('self', () => {
  it('should send headers', async done => {
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

  it('should fetch the authenticated user', async () => {
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

  it('should return a JSON:API error object for invalid queries', async () => {
    expect.assertions(5)
    const api = new Kitsu()
    mock.onGet('/users', { filter: { self: true }, include: 'author' }).reply(400, getError.jsonapi)
    try {
      await api.self({ include: 'author' })
    } catch ({ errors }) {
      expect(errors).toHaveLength(1)
      expect(errors[0].title).toBe('Invalid field')
      expect(errors[0].detail).toBeDefined()
      expect(errors[0].code).toBeDefined()
      expect(errors[0].status).toBe('400')
    }
  })
})
