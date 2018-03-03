import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import Kitsu from 'kitsu'

const mock = new MockAdapter(axios)

afterEach(() => {
  mock.reset()
})

describe('kitsu', () => {
  describe('remove', () => {
    it('should send headers', done => {
      expect.assertions(1)
      const api = new Kitsu({ headers: { Authorization: true } })
      mock.onDelete('/anime/1').reply(config => {
        expect(config.headers).toEqual({
          'Accept': 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json',
          'Authorization': true,
          extra: true
        })
        return [ 200 ]
      })
      api.remove('anime', 1, { extra: true }).catch(err => {
        done.fail(err)
      })
      done()
    })

    it('should send data in request', async done => {
      expect.assertions(1)
      const api = new Kitsu({ headers: { Authorization: true } })
      mock.onDelete('/posts/1').reply(config => {
        expect(JSON.parse(config.data)).toEqual({
          data: {
            id: '1',
            type: 'posts'
          }
        })
        return [ 200 ]
      })
      api.remove('post', 1).catch(err => {
        done.fail(err)
      })
      done()
    })

    it('should throw an error if ID is missing', async () => {
      expect.assertions(1)
      const api = new Kitsu()
      try {
        await api.remove('posts')
      } catch (err) {
        expect(err.message).toEqual('DELETE requires an ID for the posts type')
      }
    })
  })
})
