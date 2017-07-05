const Kitsu = require('../lib/kitsu')

const kitsu = new Kitsu()

/**
 * Fetches the top 5 most popular manga and displays their canonical
 * titles in a list
 *
 * Returns:
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
  }).then(({ data, error }) => {
    if (error) console.error(error)
    else {
      console.log('\nTop 5 popular manga:')
      data.forEach(manga => {
        console.log(`- ${manga.attributes.canonicalTitle}`)
      })
    }
  })
} catch (err) {
  console.log(err)
}
