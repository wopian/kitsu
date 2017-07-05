import Kitsu from '../lib/kitsu'

const kitsu = new Kitsu()

/**
 * Fetches the top 5 most popular anime and displays their canonical
 * titles in a list
 *
 * Returns:
 *
 * Top 5 popular anime:
 * - Fullmetal Alchemist: Brotherhood
 * - Attack on Titan
 * - Steins;Gate
 * - Sword Art Online
 * - Death Note
 */
const showPopular = async () => {
  try {
    const { data, error } = await kitsu.get('anime', {
      page: { limit: 5 },
      sort: 'popularityRank'
    })
    if (error) console.error(error)
    else {
      console.log('\nTop 5 popular anime:')
      data.forEach(anime => {
        console.log(`- ${anime.attributes.canonicalTitle}`)
      })
    }
  } catch (err) {
    console.log(err)
  }
}

showPopular()
