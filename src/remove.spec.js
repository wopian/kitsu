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

describe('remove', () => {
  it('should throw an error if Authorization header is not set (remove)', async () => {
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
