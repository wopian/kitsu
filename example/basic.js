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
      'Authorization': 'Bearer bbfb842d4a9aa70057c3a8299eac007cf8ddec5bc9f560db54882102c1d6bc8d'
    }
  })
  api.fetch('users', {
    page: { limit: 1, offset: 2 },
    fields: { users: 'name,waifu', characters: 'name' },
    include: 'waifu'
  }).then(response => console.log(JSON.stringify(response, null, 2)))
    .catch(err => console.error(err))

  /*
  api.create('posts', {
    content: 'Hello World',
    targetUser: {
      id: 42603,
      type: 'users'
    },
    user: {
      id: 42603,
      type: 'users'
    }
  }).then(response => console.log(response))
  */
} catch (err) {
  console.log(err)
}
