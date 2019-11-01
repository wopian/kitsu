import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import Kitsu from '@starofservice/kitsu'

const mock = new MockAdapter(axios)

afterEach(() => {
  mock.reset()
})

describe('kitsu', () => {
  describe('post', () => {
    it('sends headers', async done => {
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

    it('sends data in request', async done => {
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

    it('throws an error if missing a JSON object body', async () => {
      expect.assertions(1)
      const api = new Kitsu()
      try {
        await api.post('posts')
      } catch (err) {
        expect(err.message).toEqual('POST requires a JSON object body')
      }
    })
  })
})
