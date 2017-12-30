import axios from 'axios'
import decamelize from 'decamelize'
import pluralize from 'pluralize'
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
  it('Should set the required JSON:API headers', () => {
    expect.assertions(2)
    const api = new Kitsu()
    const header = 'application/vnd.api+json'
    expect(api.headers['Accept']).toBe(header)
    expect(api.headers['Content-Type']).toBe(header)
  })

  it('Should set provided headers in constructor', () => {
    expect.assertions(1)
    const api = new Kitsu({
      headers: {
        'Key': 'value'
      }
    })
    expect(api.headers['Key']).toBe('value')
  })

  it('Should set additional headers', () => {
    expect.assertions(1)
    const api = new Kitsu()
    api.headers['Key'] = 'value'
    expect(api.headers['Key']).toBe('value')
  })

  it('Should return all headers', () => {
    expect.assertions(1)
    const api = new Kitsu()
    const header = 'application/vnd.api+json'
    expect(api.headers).toEqual({
      'Accept': header,
      'Content-Type': header
    })
  })

  it('Should return false if Authorization header not set', () => {
    expect.assertions(1)
    const api = new Kitsu()
    expect(api.isAuth).toBe(false)
  })

  it('Should return true if Authorization header is set in constructor', () => {
    expect.assertions(1)
    const api = new Kitsu({
      headers: {
        Authorization: 'value'
      }
    })
    expect(api.isAuth).toBe(true)
  })

  it('Should return true if Authorization header is set by method', () => {
    expect.assertions(1)
    const api = new Kitsu()
    api.headers['Authorization'] = 'value'
    expect(api.isAuth).toBe(true)
  })

  it('Should use decamelize by default', () => {
    expect.assertions(2)
    const api = new Kitsu()
    expect(api.kebab).toEqual(decamelize)
    expect(api.kebab('longWord')).toBe('long_word')
  })

  it('Should not use decamlize if disabled in options', () => {
    expect.assertions(2)
    const api = new Kitsu({
      decamelize: false
    })
    expect(api.kebab('longWord')).not.toBe('long_word')
    expect(api.kebab('longWord')).toBe('longWord')
  })

  it('Should use pluralize by default', () => {
    expect.assertions(3)
    const api = new Kitsu()
    expect(api.plural).toEqual(pluralize)
    expect(api.plural('apple')).toBe('apples')
    expect(api.plural.singular('apples')).toBe('apple')
  })

  it('Should not use pluralize if disabled in options', () => {
    expect.assertions(2)
    const api = new Kitsu({
      pluralize: false
    })
    expect(api.plural('apple')).toBe('apple')
    expect(api.plural.singular('apples')).toBe('apples')
  })
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
