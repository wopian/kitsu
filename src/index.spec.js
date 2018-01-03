import axios from 'axios'
import pluralize from 'pluralize'
import MockAdapter from 'axios-mock-adapter'
import Kitsu from 'kitsu'
import camel from './util/camel'
import kebab from './util/kebab'
import {
  getCollection,
  getCollectionWithIncludes,
  getError,
  getSingle,
  getSingleWithIncludes,
  getSingleWithNestedIncludes,
  patchSingle,
  patchSingleMissingID
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

  it('Should convert types into camelCase by default', () => {
    expect.assertions(3)
    const api = new Kitsu()
    expect(api.camel('long-word')).toBe('longWord')
    expect(api.camel('long_word')).toBe('longWord')
    expect(api.camel('longWord')).toBe('longWord')
  })

  it('Should not convert types into camelCase if camelCaseTypes option is false', () => {
    expect.assertions(3)
    const api = new Kitsu({
      camelCaseTypes: false
    })
    expect(api.camel('long-word')).toBe('long-word')
    expect(api.camel('long_word')).toBe('long_word')
    expect(api.camel('longWord')).toBe('longWord')
  })

  it('Should convert resource requests into kebab-case by default', () => {
    expect.assertions(2)
    const api = new Kitsu()
    expect(api.resCase('long-word')).toBe('long-word')
    expect(api.resCase('longWord')).toBe('long-word')
  })

  it('Should convert resource requests into snake_case if resourceCase option is \'snake\'', () => {
    expect.assertions(2)
    const api = new Kitsu({
      resourceCase: 'snake'
    })
    expect(api.resCase('long_word')).toBe('long_word')
    expect(api.resCase('longWord')).toBe('long_word')
  })

  it('Should not convert resource requests if resourceCase option is \'none\'', () => {
    expect.assertions(3)
    const api = new Kitsu({
      resourceCase: 'none'
    })
    expect(api.resCase('long-word')).toBe('long-word')
    expect(api.resCase('long_word')).toBe('long_word')
    expect(api.resCase('longWord')).toBe('longWord')
  })

  it('Should use pluralize by default', () => {
    expect.assertions(2)
    const api = new Kitsu()
    expect(api.plural).toEqual(pluralize)
    expect(api.plural('apple')).toBe('apples')
  })

  it('Should not use pluralize if pluralize option is false', () => {
    expect.assertions(1)
    const api = new Kitsu({
      pluralize: false
    })
    expect(api.plural('apple')).toBe('apple')
  })
})

describe('isAuth', () => {
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
})

describe('get', () => {
  it('Should fetch a collection of resources', async () => {
    expect.assertions(1)
    const api = new Kitsu()
    mock.onGet().reply(200, getCollection.jsonapi)
    const request = await api.get('anime')
    expect(request).toEqual(getCollection.kitsu)
  })

  it('Should fetch a single resource', async () => {
    expect.assertions(1)
    const api = new Kitsu()
    mock.onGet().reply(200, getSingle.jsonapi)
    const request = await api.get('anime/1')
    expect(request).toEqual(getSingle.kitsu)
  })

  it('Should fetch a collection of resources with includes', async () => {
    expect.assertions(1)
    const api = new Kitsu()
    mock.onGet().reply(200, getCollectionWithIncludes.jsonapi)
    const request = await api.get('anime', { include: 'author,comments' })
    expect(request).toEqual(getCollectionWithIncludes.kitsu)
  })

  it('Should fetch a single resource with includes', async () => {
    expect.assertions(1)
    const api = new Kitsu()
    mock.onGet().reply(200, getSingleWithIncludes.jsonapi)
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
    mock.onGet().reply(400, getError.jsonapi)
    const { errors } = await api.get('articles', { include: 'author' })
    expect(errors).toHaveLength(1)
    expect(errors[0].title).toBe('Invalid field')
    expect(errors[0].detail).toBeDefined()
    expect(errors[0].code).toBeDefined()
    expect(errors[0].status).toBe('400')
  })
})

describe('patch', () => {
  it('should throw an error if Authorization header is not set (patch)', async () => {
    expect.assertions(1)
    const api = new Kitsu()
    mock.onPatch().reply(200)
    // expect(api.patch('posts', patchSingle.kitsu)).rejects.toThrow('Not logged in')
    expect(api.patch('posts', patchSingle.kitsu)).rejects.toThrowError('Not logged in')
  })

  it('should throw an error if ID is missing (patch)', async () => {
    expect.assertions(1)
    const api = new Kitsu({ headers: { Authorization: true } })
    mock.onPatch().reply(200)
    expect(api.patch('posts', patchSingleMissingID.kitsu)).rejects.toThrowError('Updating a resource requires an ID')
  })

  it('Should update a single resource', async () => {
    expect.assertions(1)
    const api = new Kitsu({ headers: { Authorization: true } })
    mock.onPatch().reply(200, patchSingle.jsonapi)
    const request = await api.patch('posts', patchSingle.kitsu)
    expect(request).toEqual(patchSingle.jsonapi)
  })
})

describe('post', () => {
  it('should throw an error if Authorization header is not set (post)', async () => {
    expect.assertions(1)
    const api = new Kitsu()
    mock.onPost().reply(200)
    expect(api.post('posts', patchSingle.kitsu)).rejects.toThrowError('Not logged in')
  })
})

describe('delete', () => {
  it('should throw an error if Authorization header is not set (delete)', async () => {
    expect.assertions(1)
    const api = new Kitsu()
    mock.onDelete().reply(200)
    expect(api.remove('posts', patchSingle.kitsu)).rejects.toThrowError('Not logged in')
  })

  /*
  it('should throw an error if ID is missing (delete)', async () => {
    expect.assertions(1)
    const api = new Kitsu({ headers: { Authorization: true } })
    mock.onDelete().reply(200)
    expect(api.remove('posts', 1)).rejects.toThrowError('Deleting a resource requires an ID')
  })
  */
})

describe('self', () => {

})

describe('aliases', () => {
  const api = new Kitsu()

  it('should alias fetch to get', () => {
    expect.assertions(1)
    expect(api.fetch).toEqual(api.get)
  })

  it('should alias update to patch', () => {
    expect.assertions(1)
    expect(api.update).toEqual(api.patch)
  })

  it('should alias create to post', () => {
    expect.assertions(1)
    expect(api.create).toEqual(api.post)
  })
})
