const Kitsu = require('../lib/kitsu')

const kitsu = new Kitsu()

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
  kitsu.get('manga', {
    page: { limit: 5 },
    sort: 'popularityRank'
  }).then(({ data }) => {
    console.log('\nTop 5 popular manga:')
    data.forEach(manga => {
      console.log(`- ${manga.canonicalTitle}`)
    })
  })
} catch (err) {
  console.log(err)
}
