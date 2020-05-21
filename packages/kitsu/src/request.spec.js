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
    it('sends headers', async done => {
      expect.assertions(1)
      const api = new Kitsu({ headers: { Authorization: true } })
      mock.onGet('/users').reply(config => {
        expect(config.headers).toEqual({
          Accept: 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json',
          Authorization: true,
          extra: true
        })
        return [ 200, { data: [] } ]
      })
      api.request({
        method: 'GET',
        url: 'users',
        model: 'users'
      }, { extra: true }).catch(err => {
        done.fail(err)
      })
      done()
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
      expect(request).toEqual(getSingleWithIncludes.kitsu)
    })

    it('defaults to a GET request', async () => {
      expect.assertions(1)
      const api = new Kitsu()
      mock.onGet('anime/1').reply(200, genericResponse)
      const request = await api.request({
        url: 'anime/1'
      })
      expect(request).toEqual(genericRequest)
    })

    it('handles method case differences', async () => {
      expect.assertions(1)
      const api = new Kitsu()
      mock.onGet('anime/1').reply(200, genericResponse)
      const request = await api.request({
        method: 'gEt',
        url: 'anime/1'
      })
      expect(request).toEqual(genericRequest)
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
      expect(request).toEqual(genericRequest)
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
        ]
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
      expect(request).toEqual(genericRequest)
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
      expect(request).toEqual(genericRequest)
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
  })
})
