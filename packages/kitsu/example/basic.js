const Kitsu = require('../dist')

const printError = error => {
  console.log(`${error.title}: ${error.detail}`)
}

try {
  // Create a new Kitsu class
  const api = new Kitsu()

  // Fetch resources
  api.fetch('users', {
    page: { limit: 1, offset: 2 },
    fields: { users: 'name,waifu', characters: 'name' },
    include: 'waifu'
  })
    .then(response => console.log(response))
    .catch(err => {
      console.error(err)
    })

  // Create new resources
  api.create('posts', {
    content: 'Hello World',
    targetUser: {
      id: 42603,
      type: 'users'
    },
    user: {
      id: 77404,
      type: 'users'
    }
  })
    .then(response => console.log(response))
    .catch(({ errors }) => {
      if (errors) errors.forEach(error => printError(error))
    })

  // Update existing resources
  api.update('posts', {
    id: '8819453',
    type: 'posts',
    content: 'Goodbye World'
  })
    .then(response => console.log(response))
    .catch(({ errors }) => {
      if (errors) errors.forEach(error => printError(error))
    })

  // Remove a resource
  api.remove('post', 8819453)
    .then(response => console.log(response))
    .catch(({ errors }) => {
      if (errors) errors.forEach(error => printError(error))
    })
} catch (err) {
  console.error(err)
}
