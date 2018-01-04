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
  it('should throw an error if Authorization header is not set (post)', async () => {
    expect.assertions(1)
    const api = new Kitsu()
    mock.onPost().reply(200)
    expect(api.post('posts', patchSingle.kitsu)).rejects.toThrowError('Not logged in')
  })
})
