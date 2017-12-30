import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import Kitsu from 'kitsu'
import {
  getCollection,
  getCollectionWithIncludes,
  getSingle,
  getSingleWithIncludes
} from './__cases__'

const mock = new MockAdapter(axios)

afterEach(() => {
  mock.reset()
})

describe('Kitsu Class', () => {

})

describe('GET Requests', () => {
  it('Should fetch a collection of resources', async () => {
    expect.assertions(1)
    const api = new Kitsu()
    mock.onGet().reply(200, getCollection.jsonapi)
    const request = await api.get('anime')
    expect(request).toEqual(getCollection.kitsu)
  })

  it('Should fetch a collection of resources with includes', async () => {
    expect.assertions(1)
    const api = new Kitsu()
    mock.onGet().reply(200, getCollectionWithIncludes.jsonapi)
    const request = await api.get('anime')
    expect(request).toEqual(getCollectionWithIncludes.kitsu)
  })

  it('Should fetch a single resource', async () => {
    expect.assertions(1)
    const api = new Kitsu()
    mock.onGet().reply(200, getSingle.jsonapi)
    const request = await api.get('anime/1')
    expect(request).toEqual(getSingle.kitsu)
  })

  it('Should fetch a single resource with includes', async () => {
    expect.assertions(1)
    const api = new Kitsu()
    mock.onGet().reply(200, getSingleWithIncludes.jsonapi)
    const request = await api.get('anime/1')
    expect(request).toEqual(getSingleWithIncludes.kitsu)
  })
})

describe('PATCH Requests', () => {

})

describe('POST Requests', () => {

})

describe('DELETE Requests', () => {

})
