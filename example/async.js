import Kitsu from '../src/main'

const kitsu = new Kitsu()

/**
 * Shows 5 most popular anime
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
