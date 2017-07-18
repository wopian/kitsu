import Kitsu from '../src'

const kitsu = new Kitsu()

/**
 * Authenticate as a user and create a post on their profile feed
 */
const app = async () => {
  console.log(kitsu.isAuth) // false

  await kitsu.auth({
    username: '',
    password: '',
    clientId: '',
    clientSecret: ''
  })

  console.log(kitsu.isAuth) // true if auth succeeded

  // Get the logged in user's ID
  const { id } = await kitsu.whoAmI({ compact: true })

  // internally checks isAuth before sending request
  await kitsu.create('posts', {
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
