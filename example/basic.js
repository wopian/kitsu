const Kitsu = require('../lib/kitsu')

try {
  // Create a new Kitsu class
  const api = new Kitsu({})

  // Fetch resources
  api.fetch('users', {
    page: { limit: 1, offset: 2 },
    fields: { users: 'name,waifu', characters: 'name' },
    include: 'waifu'
  }).then(response => console.log(response))

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
  }).then(response => console.log(response))

  // Update existing resources
  api.update('posts', {
    id: '8819453',
    type: 'posts',
    content: 'Goodbye World'
  }).then(response => console.log(response))

  // Remove a resource
  api.remove('post', 8819453).then(response => console.log(response))
} catch (err) {
  console.log(err)
}
