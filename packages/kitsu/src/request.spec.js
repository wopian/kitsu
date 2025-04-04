import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import Kitsu from 'kitsu'
import {
  getSingleWithIncludes
} from 'specification'

const mock = new MockAdapter(axios)

const genericRequest = {
  data: {
    id: '1',
    type: 'anime',
    subtype: 'tv'
  }
}

const genericResponse = {
  data: {
    id: '1',
    type: 'anime',
    attributes: { subtype: 'tv' }
  }
}

afterEach(() => {
  mock.reset()
})

describe('kitsu', () => {
  describe('request', () => {
    it('uses provided axios options', async () => {
      expect.assertions(1)
      const api = new Kitsu()
      api.axios = { request: jest.fn().mockReturnValue({ data: '' }) }
      await api.request({ axiosOptions: { withCredentials: true } })
      expect(api.axios.request).toHaveBeenCalledWith(expect.objectContaining({ withCredentials: true }))
    })

    it('sends and receives headers', async () => {
      expect.assertions(2)
      const api = new Kitsu({ headers: { Authorization: true } })
      mock.onGet('/users').reply(config => {
        expect(config.headers).toMatchObject({
          Accept: 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json',
          Authorization: 'true',
          extra: 'true'
        })
        return [ 200, { data: [] }, { Accept: 'application/vnd.api+json' } ]
      })
      await expect(await api.request({
        method: 'GET',
        url: 'users',
        model: 'users',
        headers: { extra: true }
      })).toMatchObject({ data: [], headers: { Accept: 'application/vnd.api+json' }, status: 200 })
    })

    it('sends parameters', async () => {
      expect.assertions(1)
      const api = new Kitsu()
      mock.onGet(`anime/${getSingleWithIncludes.jsonapi.data.id}`, { include: 'author,comments' }).reply(200, getSingleWithIncludes.jsonapi)
      const request = await api.request({
        method: 'GET',
        url: 'anime/1',
        params: { include: 'author,comments' }
      })
      expect(request).toEqual({ ...getSingleWithIncludes.kitsu, status: 200 })
    })

    it('defaults to a GET request', async () => {
      expect.assertions(1)
      const api = new Kitsu()
      mock.onGet('anime/1').reply(200, genericResponse)
      const request = await api.request({
        url: 'anime/1'
      })
      expect(request).toEqual({ ...genericRequest, status: 200 })
    })

    it('handles method case differences', async () => {
      expect.assertions(1)
      const api = new Kitsu()
      mock.onGet('anime/1').reply(200, genericResponse)
      const request = await api.request({
        method: 'gEt',
        url: 'anime/1'
      })
      expect(request).toEqual({ ...genericRequest, status: 200 })
    })

    it('makes PATCH requests', async () => {
      expect.assertions(1)
      const api = new Kitsu()
      mock.onPatch('anime').reply(200, genericResponse)
      const request = await api.request({
        method: 'patch',
        url: 'anime',
        type: 'anime',
        body: genericResponse.data
      })
      expect(request).toEqual({ ...genericRequest, status: 200 })
    })

    it('makes PATCH requests (array)', async () => {
      expect.assertions(1)
      const api = new Kitsu()
      mock.onPatch('anime').reply(200, {
        data: [
          genericResponse.data,
          genericResponse.data
        ]
      })
      const request = await api.request({
        method: 'patch',
        url: 'anime',
        type: 'anime',
        body: [
          genericResponse.data,
          genericResponse.data
        ]
      })
      expect(request).toEqual({
        data: [
          genericRequest.data,
          genericRequest.data
        ],
        status: 200
      })
    })

    it('makes POST requests', async () => {
      expect.assertions(1)
      const api = new Kitsu()
      mock.onPost('anime').reply(200, genericResponse)
      const request = await api.request({
        method: 'post',
        url: 'anime',
        type: 'anime',
        body: genericResponse.data
      })
      expect(request).toEqual({ ...genericRequest, status: 200 })
    })

    it('makes DELETE requests', async () => {
      expect.assertions(1)
      const api = new Kitsu()
      mock.onDelete('anime/1').reply(200, genericResponse)
      const request = await api.request({
        method: 'delete',
        type: 'anime',
        url: 'anime/1'
      })
      expect(request).toEqual({ ...genericRequest, status: 200 })
    })

    it('throws an error if body is missing', async () => {
      expect.assertions(1)
      const api = new Kitsu()
      try {
        await api.request({
          method: 'patch'
        })
      } catch (err) {
        expect(err.message).toEqual('PATCH requires a resource type')
      }
    })

    it('fetches a single resource with a camelCase relationship include', async () => {
      expect.assertions(1)
      const api = new Kitsu()
      mock.onGet('anime/1', { params: { include: 'animeStaff' } }).reply(200, getSingleWithIncludes.jsonapi)
      const request = await api.request({
        url: 'anime/1',
        params: { include: 'animeStaff' }
      })
      expect(request).toEqual({ ...getSingleWithIncludes.kitsu, status: 200 })
    })
  })
})
