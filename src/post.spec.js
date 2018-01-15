import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import Kitsu from 'kitsu'
import {
  patchSingle
} from './__cases__'

const mock = new MockAdapter(axios)

afterEach(() => {
  mock.reset()
})

describe('post', () => {
  it('Should send headers', async done => {
    expect.assertions(1)
    const api = new Kitsu({ headers: { Authorization: true } })
    mock.onPost('/anime').reply(config => {
      expect(config.headers).toEqual({
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Authorization': true,
        extra: true
      })
      return [ 200 ]
    })
    api.post('anime', { id: '1', type: 'anime' }, { extra: true }).catch(err => {
      done.fail(err)
    })
    done()
  })

  it('Should send data in request', async done => {
    expect.assertions(1)
    const api = new Kitsu({ headers: { Authorization: true } })
    mock.onPost('/anime').reply(config => {
      expect(JSON.parse(config.data)).toEqual({
        data: {
          type: 'anime',
          attributes: {
            name: 'Name'
          }
        }
      })
      return [ 200 ]
    })
    api.post('anime', { type: 'anime', name: 'Name' }).catch(err => {
      done.fail(err)
    })
    done()
  })

  it('should throw an error if Authorization header is not set (post)', async () => {
    expect.assertions(1)
    const api = new Kitsu()
    mock.onPost().reply(200)
    expect(api.post('posts', patchSingle.kitsu)).rejects.toThrowError('Not logged in')
  })
})
