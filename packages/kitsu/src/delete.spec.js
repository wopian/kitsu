import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import Kitsu from 'kitsu'

const mock = new MockAdapter(axios)

afterEach(() => {
  mock.reset()
})

describe('kitsu', () => {
  describe('delete', () => {
    it('uses provided axios options', async () => {
      expect.assertions(1)
      const api = new Kitsu()
      api.axios = { delete: jest.fn().mockReturnValue({ data: '' }) }
      await api.delete('anime', 1, { axiosOptions: { withCredentials: true } })
      expect(api.axios.delete).toHaveBeenCalledWith('anime/1', expect.objectContaining({ withCredentials: true }))
    })

    it('sets encode and serialize', async () => {
      expect.assertions(4)
      const api = new Kitsu({ headers: { init: true } })
      mock.onDelete('/anime/1').reply(config => {
        expect(config.paramsSerializer.encode).toBeDefined()
        expect(config.paramsSerializer.serialize).toBeDefined()
        expect(config.paramsSerializer.encode('[]')).toBe('%5B%5D')
        return [ 200, { data: [] } ]
      })
      const response = await api.delete('anime', 1)
      await expect(await response).toEqual({
        data: []
      })
    })

    it('sends and recieves headers', async () => {
      expect.assertions(2)
      const api = new Kitsu({ headers: { Authorization: true } })
      mock.onDelete('/anime/1').reply(config => {
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
      expect(await api.delete('anime', 1, { headers: { extra: true } })).toEqual({
        headers: {
          Accept: 'application/vnd.api+json'
        }
      })
    })

    it('sends data in request', async () => {
      expect.assertions(2)
      const api = new Kitsu({ headers: { Authorization: true } })
      mock.onDelete('/posts/1').reply(config => {
        expect(JSON.parse(config.data)).toEqual({
          data: {
            id: '1',
            type: 'posts'
          }
        })
        return [ 200 ]
      })
      await expect(await api.delete('post', 1)).toBeUndefined()
    })

    it('handles nested routes', async () => {
      expect.assertions(2)
      const api = new Kitsu({ headers: { Authorization: true } })
      mock.onDelete('/posts/1/comments/1').reply(config => {
        expect(JSON.parse(config.data)).toEqual({
          data: {
            id: '1',
            type: 'comments'
          }
        })
        return [ 200 ]
      })
      await expect(await api.delete('posts/1/comments', 1)).toBeUndefined()
    })

    it('deletes multiple resources (bulk extension)', async () => {
      expect.assertions(2)
      const api = new Kitsu({ headers: { Authorization: true } })
      mock.onDelete('/posts').reply(config => {
        expect(JSON.parse(config.data)).toEqual({
          data: [
            { id: '1', type: 'posts' },
            { id: '2', type: 'posts' }
          ]
        })
        return [ 200 ]
      })
      await expect(await api.delete('post', [ 1, 2 ])).toBeUndefined()
    })

    it('throws an error if ID is missing', async () => {
      expect.assertions(1)
      const api = new Kitsu()
      try {
        await api.delete('posts')
      } catch (err) {
        expect(err.message).toEqual('DELETE requires an ID for the posts type')
      }
    })
  })
})
