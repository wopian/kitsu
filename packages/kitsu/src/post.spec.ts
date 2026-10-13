import { afterAll, afterEach, describe, expect, it, mock } from 'bun:test'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import Kitsu from 'kitsu'

const adapter = new MockAdapter(axios)

afterEach(() => {
  adapter.reset()
})

describe('kitsu', () => {
  describe('post', () => {
    it('uses provided axios options', async () => {
      expect.assertions(1)
      const api = new Kitsu()
      // @ts-expect-error - testing axios options passthrough
      api.axios = { post: mock().mockReturnValue({ data: '' }) }
      await api.post(
        'anime',
        { id: '1', type: 'anime' },
        { axiosOptions: { withCredentials: true } },
      )
      expect(api.axios.post).toHaveBeenCalledWith(
        'anime',
        { data: { id: '1', type: 'anime' } },
        expect.objectContaining({ withCredentials: true }),
      )
    })

    it('sends and recieves headers', async () => {
      expect.assertions(2)
      const api = new Kitsu({ headers: { Authorization: true } })
      adapter.onPost('/anime').reply((config: any) => {
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
      expect(
        await api.post('anime', { id: '1', type: 'anime' }, { headers: { extra: true } }),
      ).toMatchObject({
        headers: {
          Accept: 'application/vnd.api+json',
        },
        status: 200,
      })
    })

    it('sends data in request', async () => {
      expect.assertions(2)
      const api = new Kitsu({ headers: { Authorization: true } })
      adapter.onPost('/anime').reply((config: any) => {
        expect(JSON.parse(config.data)).toEqual({
          data: {
            type: 'anime',
            attributes: {
              name: 'Name',
            },
          },
        })
        return [200]
      })
      expect(await api.post('anime', { type: 'anime', name: 'Name' })).toEqual({ status: 200 })
    })

    it('handles nested routes', async () => {
      expect.assertions(2)
      const api = new Kitsu({ headers: { Authorization: true } })
      adapter.onPost('/something/1/relationships/anime').reply((config: any) => {
        expect(JSON.parse(config.data)).toEqual({
          data: {
            type: 'anime',
            attributes: {
              name: 'Name',
            },
          },
        })
        return [200]
      })
      expect(
        await api.post('something/1/relationships/anime', { type: 'anime', name: 'Name' }),
      ).toEqual({ status: 200 })
    })

    it('sends data in request with client-generated ID', async () => {
      expect.assertions(2)
      const api = new Kitsu()
      adapter.onPost('/anime').reply((config: any) => {
        expect(JSON.parse(config.data)).toEqual({
          data: {
            id: '123456789',
            type: 'anime',
            attributes: {
              name: 'Name',
            },
          },
        })
        return [200]
      })
      expect(await api.post('anime', { id: 123456789, type: 'anime', name: 'Name' })).toEqual({
        status: 200,
      })
    })

    it('throws an error if missing a valid JSON object body', async () => {
      expect.assertions(2)
      const api = new Kitsu()
      try {
        await api.post('posts', 123 as any)
      } catch (err: any) {
        expect(err.message).toEqual('POST requires an object or array body')
      }

      try {
        await api.post('posts', 'invalid body' as any)
      } catch (err: any) {
        expect(err.message).toEqual('POST requires an object or array body')
      }
    })

    it('sends data in request if missing a JSON object body', async () => {
      expect.assertions(4)
      const api = new Kitsu()
      adapter.onPost('/anime').reply((config: any) => {
        expect(JSON.parse(config.data)).toEqual({
          data: { type: 'anime' },
        })
        return [200]
      })
      // @ts-expect-error - testing invalid input
      expect(await api.post('anime')).toEqual({ status: 200 })
      expect(await api.post('anime', {})).toEqual({ status: 200 })
    })

    it('sends data in request if given empty JSON object in array body', async () => {
      expect.assertions(2)
      const api = new Kitsu()
      adapter.onPost('/anime').reply((config: any) => {
        expect(JSON.parse(config.data)).toEqual({
          data: [{ type: 'anime' }],
        })
        return [200]
      })
      expect(await api.post('anime', [{}])).toEqual({ status: 200 })
    })
  })
})

afterAll(() => adapter.restore())
