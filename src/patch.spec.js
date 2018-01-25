import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import Kitsu from 'kitsu'
import {
  patchSingle,
  patchSingleMissingID
} from './__cases__'

const mock = new MockAdapter(axios)

afterEach(() => {
  mock.reset()
})

describe('patch', () => {
  it('Should send headers', async done => {
    expect.assertions(1)
    const api = new Kitsu({ headers: { Authorization: true } })
    mock.onPatch('/anime/1').reply(config => {
      expect(config.headers).toEqual({
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Authorization': true,
        extra: true
      })
      return [ 200 ]
    })
    api.patch('anime', { id: '1', type: 'anime' }, { extra: true }).catch(err => {
      done.fail(err)
    })
    done()
  })

  it('Should send data in request', async done => {
    expect.assertions(1)
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
    api.patch('post', { id: '1', content: 'Hello World' }).catch(err => {
      done.fail(err)
    })
    done()
  })

  it('Should throw an error if missing a JSON object body', async () => {
    expect.assertions(1)
    const api = new Kitsu()
    try {
      await api.patch('posts')
    } catch (err) {
      expect(err.message).toEqual('PATCH requires a JSON object body')
    }
  })

  it('should throw an error if ID is missing (patch)', async () => {
    expect.assertions(1)
    const api = new Kitsu()
    try {
      await api.patch('posts', patchSingleMissingID.kitsu)
    } catch (err) {
      expect(err.message).toEqual('PATCH requires an ID for the posts type')
    }
  })

  it('Should update a single resource', async () => {
    expect.assertions(1)
    const api = new Kitsu({ headers: { Authorization: true } })
    mock.onPatch(`posts/${patchSingle.jsonapi.data.id}`).reply(200, patchSingle.jsonapi)
    const request = await api.patch('posts', patchSingle.kitsu)
    expect(request).toEqual(patchSingle.jsonapi)
  })
})
