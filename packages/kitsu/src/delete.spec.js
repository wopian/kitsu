import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import Kitsu from 'kitsu'

const mock = new MockAdapter(axios)

afterEach(() => {
  mock.reset()
})

describe('kitsu', () => {
  describe('delete', () => {
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
