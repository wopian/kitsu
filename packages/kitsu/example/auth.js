import Kitsu from '../src'
import OAuth2 from 'client-oauth2'

const api = new Kitsu()

/**
 * Authenticate as a user and create a post on their profile feed
 */
const app = async () => {
  const { owner } = new OAuth2({
    clientId: '',
    clientSecret: '',
    accessTokenUri: 'https://kitsu.io/api/oauth/token'
  })

  const { accessToken } = await owner.getToken('username', 'password')

  api.headers.Authorization = `Bearer ${accessToken}`

  // Get the logged in user's ID
  const { id } = await api.self()

  await api.create('posts', {
    content: 'Hello world',
    targetUser: {
      id,
      type: 'users'
    },
    user: {
      id,
      type: 'users'
    }
  })
}

app()
