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

describe('kitsu', () => {
  describe('self', () => {
    it('uses provided axios options', async () => {
      expect.assertions(1)
      const api = new Kitsu()
      api.get = jest.fn().mockReturnValue({ data: '', headers: '' })
      await api.self({ axiosOptions: { withCredentials: true } })
      expect(api.get).toHaveBeenCalledWith('users', expect.objectContaining({ withCredentials: true }))
    })

    it('sends and recieves headers', async () => {
      expect.assertions(2)
      const api = new Kitsu({ headers: { Authorization: true } })
      mock.onGet('/users', { filter: { self: true } }).reply(config => {
        expect(config.headers).toMatchObject({
          Accept: 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json',
          Authorization: 'true',
          extra: 'true'
        })
        return [ 200, { data: [] }, { Accept: 'application/vnd.api+json' } ]
      })
      await expect(await api.self({ headers: { extra: true } })).toMatchObject({
        headers: { Accept: 'application/vnd.api+json' }
      })
    })

    it('fetches the authenticated user', async () => {
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
        data: {
          id: '1',
          type: 'users',
          name: 'John'
        }
      })
    })

    it('returns a JSON:API error object for invalid queries', async () => {
      expect.assertions(5)
      const api = new Kitsu()
      mock.onGet('/users', { filter: { self: true }, include: 'author' }).reply(400, getError.jsonapi)
      try {
        await api.self({ params: { include: 'author' } })
      } catch ({ errors }) {
        expect(errors).toHaveLength(1)
        expect(errors[0].title).toBe('Invalid field')
        expect(errors[0].detail).toBeDefined()
        expect(errors[0].code).toBeDefined()
        expect(errors[0].status).toBe('400')
      }
    })
  })
})
