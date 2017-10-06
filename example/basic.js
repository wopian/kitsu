const Kitsu = require('../lib/kitsu')

/**
 * Fetches the top 5 most popular manga and displays their canonical
 * titles in a list
 *
 * Displays:
 *
 * Top 5 popular manga:
 * - Naruto
 * - Shingeki no Kyojin
 * - Berserk
 * - Tokyo Ghoul
 * - One Piece
 */
try {
  const api = new Kitsu({
    headers: {
      'Authorization': 'Bearer ...'
    }
  })

  api.fetch('users', {
    page: { limit: 1, offset: 2 },
    fields: { users: 'name,waifu', characters: 'name' },
    include: 'waifu'
  }).then(response => console.log(response))

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

  api.update('posts', {
    id: '8819453',
    type: 'posts',
    content: 'Goodbye World'
  }).then(response => console.log(response))

  api.remove('post', 8819453).then(response => console.log(response))
} catch (err) {
  console.log(err)
}
