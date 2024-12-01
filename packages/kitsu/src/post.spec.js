import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import Kitsu from 'kitsu'

const mock = new MockAdapter(axios)

afterEach(() => {
  mock.reset()
})

describe('kitsu', () => {
  describe('post', () => {
    it('uses provided axios options', async () => {
      expect.assertions(1)
      const api = new Kitsu()
      api.axios = { post: jest.fn().mockReturnValue({ data: '' }) }
      await api.post('anime', { id: '1', type: 'anime' }, { axiosOptions: { withCredentials: true } })
      expect(api.axios.post).toHaveBeenCalledWith('anime', { data: { id: '1', type: 'anime' } }, expect.objectContaining({ withCredentials: true }))
    })

    it('sends and recieves headers', async () => {
      expect.assertions(2)
      const api = new Kitsu({ headers: { Authorization: true } })
      mock.onPost('/anime').reply(config => {
        expect(config.headers).toEqual({
          Accept: 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json',
          Authorization: true,
          extra: true
        })
        return [ 200, undefined, {
          Accept: 'application/vnd.api+json'
        } ]
      })
      await expect(await api.post('anime', { id: '1', type: 'anime' }, { headers: { extra: true } })).toEqual({
        headers: {
          Accept: 'application/vnd.api+json'
        },
        statusCode: 200
      })
    })

    it('sends data in request', async () => {
      expect.assertions(2)
      const api = new Kitsu({ headers: { Authorization: true } })
      mock.onPost('/anime').reply(config => {
        expect(JSON.parse(config.data)).toEqual({
          data: {
            type: 'anime',
            attributes: {
              name: 'Name'
            }
          }
        })
        return [ 200 ]
      })
      await expect(await api.post('anime', { type: 'anime', name: 'Name' })).toEqual({ statusCode: 200 })
    })

    it('handles nested routes', async () => {
      expect.assertions(2)
      const api = new Kitsu({ headers: { Authorization: true } })
      mock.onPost('/something/1/relationships/anime').reply(config => {
        expect(JSON.parse(config.data)).toEqual({
          data: {
            type: 'anime',
            attributes: {
              name: 'Name'
            }
          }
        })
        return [ 200 ]
      })
      await expect(await api.post('something/1/relationships/anime', { type: 'anime', name: 'Name' })).toEqual({ statusCode: 200 })
    })

    it('sends data in request with client-generated ID', async () => {
      expect.assertions(2)
      const api = new Kitsu()
      mock.onPost('/anime').reply(config => {
        expect(JSON.parse(config.data)).toEqual({
          data: {
            id: '123456789',
            type: 'anime',
            attributes: {
              name: 'Name'
            }
          }
        })
        return [ 200 ]
      })
      await expect(await api.post('anime', { id: 123456789, type: 'anime', name: 'Name' })).toEqual({ statusCode: 200 })
    })

    it('throws an error if missing a valid JSON object body', async () => {
      expect.assertions(2)
      const api = new Kitsu()
      try {
        await api.post('posts', 123)
      } catch (err) {
        expect(err.message).toEqual('POST requires an object or array body')
      }

      try {
        await api.post('posts', 'invalid body')
      } catch (err) {
        expect(err.message).toEqual('POST requires an object or array body')
      }
    })

    it('sends data in request if missing a JSON object body', async () => {
      expect.assertions(4)
      const api = new Kitsu()
      mock.onPost('/anime').reply(config => {
        expect(JSON.parse(config.data)).toEqual({
          data: { type: 'anime' }
        })
        return [ 200 ]
      })
      await expect(await api.post('anime')).toEqual({ statusCode: 200 })
      await expect(await api.post('anime', {})).toEqual({ statusCode: 200 })
    })

    it('sends data in request if given empty JSON object in array body', async () => {
      expect.assertions(2)
      const api = new Kitsu()
      mock.onPost('/anime').reply(config => {
        expect(JSON.parse(config.data)).toEqual({
          data: [ { type: 'anime' } ]
        })
        return [ 200 ]
      })
      await expect(await api.post('anime', [ {} ])).toEqual({ statusCode: 200 })
    })
  })
})
