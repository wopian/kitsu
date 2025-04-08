import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import stringify from 'json-stringify-safe'
import Kitsu from 'kitsu'
import {
  getCollection,
  getCollectionWithIncludes,
  getError,
  getSingle,
  getSingleWithIncludes,
  getSingleWithNestedIncludes
} from 'specification'

const mock = new MockAdapter(axios)

afterEach(() => {
  mock.reset()
})

describe('kitsu', () => {
  describe('get', () => {
    it('uses provided axios options', async () => {
      expect.assertions(1)
      const api = new Kitsu()
      api.axios = { get: jest.fn().mockReturnValue({ data: '' }) }
      await api.get('anime', { axiosOptions: { withCredentials: true } })
      expect(api.axios.get).toHaveBeenCalledWith('anime', expect.objectContaining({ withCredentials: true }))
    })

    it('sends and recieves headers', async () => {
      expect.assertions(2)
      const api = new Kitsu({ headers: { init: true } })
      mock.onGet('/anime').reply(config => {
        expect(config.headers).toMatchObject({
          Accept: 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json',
          init: 'true',
          extra: 'true'
        })
        return [ 200, { data: [] }, {
          Accept: 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json',
          extra: true
        } ]
      })
      const response = await api.get('anime', { headers: { extra: true } })
      await expect(await response).toMatchObject({
        data: [],
        headers: {
          Accept: 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json',
          extra: 'true'
        },
        status: 200
      })
    })

    it('fetches a collection of resources', async () => {
      expect.assertions(1)
      const api = new Kitsu()
      mock.onGet('/anime').reply(200, getCollection.jsonapi)
      const request = await api.get('anime')
      expect(request).toEqual({ ...getCollection.kitsu, status: 200 })
    })

    it('fetches a single resource', async () => {
      expect.assertions(1)
      const api = new Kitsu()
      mock.onGet(`anime/${getSingle.jsonapi.data.id}`).reply(200, getSingle.jsonapi)
      const request = await api.get('anime/1')
      expect(request).toEqual({ ...getSingle.kitsu, status: 200 })
    })

    it('fetches a relationship collection of resources', async () => {
      expect.assertions(1)
      const api = new Kitsu()
      mock.onGet('authors/1/anime').reply(200, getCollection.jsonapi)
      const request = await api.get('author/1/anime')
      expect(request).toEqual({ ...getCollection.kitsu, status: 200 })
    })

    it('fetches a relationshop single resource', async () => {
      expect.assertions(1)
      const api = new Kitsu()
      mock.onGet('comments/1/anime').reply(200, getSingle.jsonapi)
      const request = await api.get('comment/1/anime')
      expect(request).toEqual({ ...getSingle.kitsu, status: 200 })
    })

    it('fetches a collection of resources with includes', async () => {
      expect.assertions(1)
      const api = new Kitsu()
      mock.onGet('anime').reply(200, getCollectionWithIncludes.jsonapi)
      const request = await api.get('anime')
      expect(request).toEqual({ ...getCollectionWithIncludes.kitsu, status: 200 })
    })

    it('fetches a single resource with includes', async () => {
      expect.assertions(1)
      const api = new Kitsu()
      mock.onGet(`anime/${getSingleWithIncludes.jsonapi.data.id}`, { include: 'author,comments' }).reply(200, getSingleWithIncludes.jsonapi)
      const request = await api.get('anime/1', { params: { include: 'author,comments' } })
      expect(request).toEqual({ ...getSingleWithIncludes.kitsu, status: 200 })
    })

    it('fetches a single resource with nested includes', async () => {
      expect.assertions(1)
      const api = new Kitsu()
      mock.onGet('anime/1').reply(200, getSingleWithNestedIncludes.jsonapi)
      const request = await api.get('anime/1')
      expect(request).toEqual({ ...getSingleWithNestedIncludes.kitsu, status: 200 })
    })

    it('fetches a single resource with a camelCase relationship include', async () => {
      expect.assertions(1)
      const api = new Kitsu()
      mock.onGet('anime/1', { params: { include: 'animeStaff' } }).reply(200, getSingleWithIncludes.jsonapi)
      const request = await api.get('anime/1', { params: { include: 'animeStaff' } })
      expect(request).toEqual({ ...getSingleWithIncludes.kitsu, status: 200 })
    })

    it('fetches :resource/:id/relationships/:relationship', async () => {
      expect.assertions(1)
      const response = {
        links: {
          self: 'https://api.example/media-relationships/1/relationships/destination',
          related: 'https://api.example/media-relationships/1/destination'
        },
        data: {
          type: 'anime',
          id: '1'
        }
      }
      const api = new Kitsu()
      mock.onGet('media-relationships/1/relationships/destination').reply(200, response)
      const request = await api.get('mediaRelationships/1/relationships/destination')
      expect(request).toEqual({ ...response, status: 200 })
    })

    it('fetches :resource/:relationship/:subRelationship', async () => {
      expect.assertions(1)
      const response = {
        data: {
          type: 'profile',
          id: '1'
        }
      }
      const api = new Kitsu({ pluralize: false })
      mock.onGet('profile/user-accounts/me').reply(200, response)
      const request = await api.get('profile/userAccounts/me')
      expect(request).toEqual({ ...response, status: 200 })
    })

    it('returns a JSON:API error object for invalid queries', async () => {
      expect.assertions(5)
      const api = new Kitsu()
      mock.onGet('articles', { include: 'author' }).reply(400, getError.jsonapi)
      try {
        await api.get('articles', { params: { include: 'author' } })
      } catch ({ errors }) {
        expect(errors).toHaveLength(1)
        expect(errors[0].title).toBe('Invalid field')
        expect(errors[0].detail).toBeDefined()
        expect(errors[0].code).toBeDefined()
        expect(errors[0].status).toBe('400')
      }
    })

    it('fetches infinitely nested relationship resource', async () => {
      expect.assertions(1)
      const api = new Kitsu()
      mock.onGet('printers', { params: { include: 'paper,labels' } }).reply(200, {
        data: [
          {
            type: 'printer',
            id: '1',
            attributes: {
              name: 'Printer 1'
            },
            relationships: {
              paper: {
                data: {
                  type: 'paper',
                  id: '1'
                }
              },
              labels: {
                data: [
                  {
                    type: 'label',
                    id: '1'
                  }
                ]
              }
            }
          }
        ],
        included: [
          {
            type: 'paper',
            id: '1',
            attributes: {
              name: 'Paper 1'
            },
            relationships: {
              labels: {
                data: {
                  type: 'label',
                  id: '1'
                }
              }
            }
          },
          {
            type: 'label',
            id: '1',
            attributes: {
              name: 'Label 1'
            },
            relationships: {
              paper: {
                data: {
                  type: 'paper',
                  id: '1'
                }
              }
            }
          }
        ]
      })
      const request = await api.get('printers', { params: { include: 'paper,labels' } })
      expect(JSON.parse(stringify(request))).toEqual({
        data: [
          {
            type: 'printer',
            id: '1',
            name: 'Printer 1',
            labels: {
              data: [
                {
                  id: '1',
                  type: 'label',
                  name: 'Label 1',
                  paper: {
                    data: {
                      id: '1',
                      type: 'paper',
                      name: 'Paper 1',
                      labels: {
                        data: '[Circular ~.data.0.labels.data.0]'
                      }
                    }
                  }
                }
              ]
            },
            paper: {
              data: {
                id: '1',
                type: 'paper',
                name: 'Paper 1',
                labels: {
                  data: {
                    id: '1',
                    type: 'label',
                    name: 'Label 1',
                    paper: {
                      data: '[Circular ~.data.0.paper.data]'
                    }
                  }
                }
              }
            }
          }
        ],
        status: 200
      })
    })
  })
})
