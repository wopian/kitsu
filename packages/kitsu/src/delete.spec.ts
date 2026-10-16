import { afterAll, afterEach, describe, expect, it, mock } from 'bun:test'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import Kitsu from 'kitsu'

const adapter = new MockAdapter(axios)

afterEach(() => {
  adapter.reset()
})

describe('kitsu', () => {
  describe('delete', () => {
    it('uses provided axios options', async () => {
      expect.assertions(1)
      const api = new Kitsu()
      // @ts-expect-error - testing axios options passthrough
      api.axios = { delete: mock().mockReturnValue({ data: '' }) }
      await api.delete('anime', 1, { axiosOptions: { withCredentials: true } })
      expect(api.axios.delete).toHaveBeenCalledWith(
        'anime/1',
        expect.objectContaining({ withCredentials: true }),
      )
    })

    it('sends and recieves headers', async () => {
      expect.assertions(2)
      const api = new Kitsu({ headers: { Authorization: true } })
      adapter.onDelete('/anime/1').reply((config: any) => {
        expect(config.headers).toMatchObject({
          Accept: 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json',
          Authorization: 'true',
          extra: 'true',
        })
        return [
          200,
          undefined,
          {
            Accept: 'application/vnd.api+json',
          },
        ]
      })
      expect(await api.delete('anime', 1, { headers: { extra: true } })).toMatchObject({
        headers: {
          Accept: 'application/vnd.api+json',
        },
        status: 200,
      })
    })

    it('sends data in request', async () => {
      expect.assertions(2)
      const api = new Kitsu({ headers: { Authorization: true } })
      adapter.onDelete('/posts/1').reply((config: any) => {
        expect(config.data).toBeUndefined()
        return [200]
      })
      expect(await api.delete('post', 1)).toEqual({ status: 200 })
    })

    it('handles nested routes', async () => {
      expect.assertions(2)
      const api = new Kitsu({ headers: { Authorization: true } })
      adapter.onDelete('/posts/1/comments/1').reply((config: any) => {
        expect(config.data).toBeUndefined()
        return [200]
      })
      expect(await api.delete('posts/1/comments', 1)).toEqual({ status: 200 })
    })

    it('deletes multiple resources (bulk extension)', async () => {
      expect.assertions(2)
      const api = new Kitsu({ headers: { Authorization: true } })
      adapter.onDelete('/posts').reply((config: any) => {
        expect(JSON.parse(config.data)).toEqual({
          data: [
            { id: '1', type: 'posts' },
            { id: '2', type: 'posts' },
          ],
        })
        return [200]
      })
      expect(await api.delete('post', [1, 2])).toEqual({ status: 200 })
    })

    it('throws an error if ID is missing', async () => {
      expect.assertions(1)
      const api = new Kitsu()
      try {
        // @ts-expect-error - testing error throw
        await api.delete('posts')
      } catch (err: any) {
        expect(err.message).toEqual('DELETE requires an ID for the posts type')
      }
    })
  })
})

afterAll(() => adapter.restore())
