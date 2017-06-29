import Kitsu from '../src/main'

const kitsu = new Kitsu()

const app = async () => {
  console.log(kitsu.isAuth)

  await kitsu.auth({
    username: '',
    password: '',
    clientId: '',
    clientSecret: ''
  })

  console.log(kitsu.isAuth)

  const { id } = await kitsu.whoAmI({ compact: true })

  await kitsu.post('posts', {
    attributes: {
      content: 'Hello world'
    },
    relationships: {
      targetUser: {
        data: { id, type: 'users' }
      },
      user: {
        data: { id, type: 'users' }
      }
    }
  })
}

app()
