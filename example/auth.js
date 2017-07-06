import Kitsu from '../src'

const kitsu = new Kitsu()

const app = async () => {
  // console.log(kitsu.isAuth)

  await kitsu.auth({
    username: '',
    password: '',
    clientId: '',
    clientSecret: ''
  })

  // console.log(kitsu.isAuth)

  const { id } = await kitsu.whoAmI({ compact: true })

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
