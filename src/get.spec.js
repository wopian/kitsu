import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import Kitsu from 'kitsu'
import {
  getCollection,
  getCollectionWithIncludes,
  getError,
  getSingle,
  getSingleWithIncludes
} from './__cases__'

const mock = new MockAdapter(axios)

afterEach(() => {
  mock.reset()
})

describe('get', () => {
  it('Should fetch a collection of resources', async () => {
    expect.assertions(1)
    const api = new Kitsu()
    mock.onGet('/anime').reply(200, getCollection.jsonapi)
    const request = await api.get('anime')
    expect(request).toEqual(getCollection.kitsu)
  })

  it('Should fetch a single resource', async () => {
    expect.assertions(1)
    const api = new Kitsu()
    mock.onGet(`anime/${getSingle.jsonapi.data.id}`).reply(200, getSingle.jsonapi)
    const request = await api.get('anime/1')
    expect(request).toEqual(getSingle.kitsu)
  })

  it('Should fetch a collection of resources with includes', async () => {
    expect.assertions(1)
    const api = new Kitsu()
    mock.onGet('/anime', { include: 'author,comments' }).reply(200, getCollectionWithIncludes.jsonapi)
    const request = await api.get('anime', { include: 'author,comments' })
    expect(request).toEqual(getCollectionWithIncludes.kitsu)
  })

  it('Should fetch a single resource with includes', async () => {
    expect.assertions(1)
    const api = new Kitsu()
    mock.onGet(`anime/${getSingleWithIncludes.jsonapi.data.id}`, { include: 'author,comments' }).reply(200, getSingleWithIncludes.jsonapi)
    const request = await api.get('anime/1', { include: 'author,comments' })
    expect(request).toEqual(getSingleWithIncludes.kitsu)
  })

  // TODO: Support nested includes
  /*
  it('Should fetch a single resource with nested includes', async () => {
    expect.assertions(1)
    const api = new Kitsu()
    mock.onGet().reply(200, getSingleWithNestedIncludes.jsonapi)
    const request = await api.get('anime/1')
    expect(request).toEqual(getSingleWithNestedIncludes.kitsu)
  })
  */

  it('Should return a JSON:API error object for invalid queries', async () => {
    expect.assertions(5)
    const api = new Kitsu()
    mock.onGet('articles', { include: 'author' }).reply(400, getError.jsonapi)
    const { errors } = await api.get('articles', { include: 'author' })
    expect(errors).toHaveLength(1)
    expect(errors[0].title).toBe('Invalid field')
    expect(errors[0].detail).toBeDefined()
    expect(errors[0].code).toBeDefined()
    expect(errors[0].status).toBe('400')
  })
})
