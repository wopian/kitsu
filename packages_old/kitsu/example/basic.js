const Kitsu = require('../dist')

const printError = error => {
  console.log(`${error.title}: ${error.detail}`)
}

try {
  // Create a new Kitsu class
  const api = new Kitsu()

  // Fetch resources
  api
    .fetch('users', {
      page: { limit: 1, offset: 2 },
      fields: { users: 'name,waifu', characters: 'name' },
      include: 'waifu'
    })
    .then(response => console.log(response))
    .catch(error => {
      console.error(error)
    })

  // Create new resources
  api
    .create('posts', {
      content: 'Hello World',
      targetUser: {
        data: {
          id: 42_603,
          type: 'users'
        }
      },
      user: {
        data: {
          id: 77_404,
          type: 'users'
        }
      }
    })
    .then(response => console.log(response))
    .catch(({ errors }) => {
      if (errors) for (const error of errors) printError(error)
    })

  // Update existing resources
  api
    .update('posts', {
      id: '8819453',
      type: 'posts',
      content: 'Goodbye World'
    })
    .then(response => console.log(response))
    .catch(({ errors }) => {
      if (errors) for (const error of errors) printError(error)
    })

  // Remove a resource
  api
    .remove('post', 8_819_453)
    .then(response => console.log(response))
    .catch(({ errors }) => {
      if (errors) for (const error of errors) printError(error)
    })
} catch (error) {
  console.error(error)
}
