import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import Kitsu from 'kitsu'
import {
  patchSingle,
  patchSingleMissingID
} from 'specification'

const mock = new MockAdapter(axios)

afterEach(() => {
  mock.reset()
})

describe('kitsu', () => {
  describe('patch', () => {
    it('uses provided axios options', async () => {
      expect.assertions(1)
      const api = new Kitsu()
      api.axios = { patch: jest.fn().mockReturnValue({ data: '' }) }
      await api.patch('anime', { id: '1', type: 'anime' }, { axiosOptions: { withCredentials: true } })
      expect(api.axios.patch).toHaveBeenCalledWith('anime/1', { data: { id: '1', type: 'anime' } }, expect.objectContaining({ withCredentials: true }))
    })

    it('sends and receieves headers', async () => {
      expect.assertions(2)
      const api = new Kitsu({ headers: { Authorization: true } })
      mock.onPatch('/anime/1').reply(config => {
        expect(config.headers).toMatchObject({
          Accept: 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json',
          Authorization: 'true',
          extra: 'true'
        })
        return [ 200, undefined, {
          Accept: 'application/vnd.api+json'
        } ]
      })
      await expect(await api.patch('anime', { id: '1', type: 'anime' }, { headers: { extra: true } })).toMatchObject({
        headers: {
          Accept: 'application/vnd.api+json'
        },
        status: 200
      })
    })

    it('sends data in request', async () => {
      expect.assertions(2)
      const api = new Kitsu({ headers: { Authorization: true } })
      mock.onPatch('/posts/1').reply(config => {
        expect(JSON.parse(config.data)).toEqual({
          data: {
            id: '1',
            type: 'posts',
            attributes: {
              content: 'Hello World'
            }
          }
        })
        return [ 200 ]
      })
      await expect(await api.patch('post', { id: '1', content: 'Hello World' })).toEqual({ status: 200 })
    })

    it('sends bulk data in request', async () => {
      expect.assertions(2)
      const api = new Kitsu({ headers: { Authorization: true } })
      mock.onPatch('/posts').reply(config => {
        expect(JSON.parse(config.data)).toEqual({
          data: [
            {
              id: '1',
              type: 'posts',
              attributes: {
                content: 'Hello World'
              }
            },
            {
              id: '2',
              type: 'posts',
              attributes: {
                content: 'Hey World'
              }
            }
          ]
        })
        return [ 200 ]
      })
      await expect(await api.patch('post', [
        { id: '1', content: 'Hello World' },
        { id: '2', content: 'Hey World' }
      ])).toEqual({ status: 200 })
    })

    it('throws an error if missing a JSON object body', async () => {
      expect.assertions(1)
      const api = new Kitsu()
      try {
        await api.patch('posts')
      } catch (err) {
        expect(err.message).toEqual('PATCH requires an object or array body')
      }
    })

    it('throws an error if ID is missing (patch)', async () => {
      expect.assertions(1)
      const api = new Kitsu()
      try {
        await api.patch('posts', patchSingleMissingID.kitsu)
      } catch (err) {
        expect(err.message).toEqual('PATCH requires an ID for the posts type')
      }
    })

    it('updates a single resource', async () => {
      expect.assertions(1)
      const api = new Kitsu({ headers: { Authorization: true } })
      mock.onPatch(`posts/${patchSingle.jsonapi.data.id}`).reply(200, patchSingle.jsonapi)
      const request = await api.patch('posts', patchSingle.kitsu)
      expect(request).toEqual({ data: patchSingle.kitsu, status: 200 })
    })

    it('handes nested routes', async () => {
      expect.assertions(1)
      const api = new Kitsu({ headers: { Authorization: true } })
      mock.onPatch(`something/1/relationships/posts/${patchSingle.jsonapi.data.id}`).reply(200, patchSingle.jsonapi)
      const request = await api.patch('something/1/relationships/posts', patchSingle.kitsu)
      expect(request).toEqual({ data: patchSingle.kitsu, status: 200 })
    })
  })
})
