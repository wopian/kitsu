import Kitsu from '../src'

const kitsu = new Kitsu()

/**
 * Displays the 10-star ratings of a user's anime, manga or drama
 * library
 *
 * Your 10-star [kind]:
 *
 *   1999
 *
 * - FLCL
 */

const get = async ({ userId, kind }) => {
  try {
    // Get the user's library entries sorted by highest rated first
    // Ignoring pagination as they're highly unlikely to have more
    // than 500 20/20 of that media
    const { data } = await kitsu.get('libraryEntries', {
      page: { limit: 500 },
      sort: '-rating',
      fields: {
        libraryEntries: `ratingTwenty,${kind}`,
        [kind]: 'canonicalTitle,startDate'
      },
      filter: {
        userId,
        kind
      },
      include: kind
    }).catch(e => {
      console.log(e.errors)
    })

    return data
  } catch (e) {
    console.log(e)
  }
}

const filter = async ({ userId, kind }) => {
  const data = await get({ userId, kind })
  const years = {}

  data.forEach(entry => {
    if (entry.ratingTwenty === 20) {
      let year = entry[kind].startDate

      if (year === null) year = 'Unknown'
      else year = entry[kind].startDate.slice(0, 4) || 'Unknown'

      // Ensure an array for the year exists
      if (!years[year]) years[year] = []

      years[year].push(entry)
    }
  })

  return years
}

const display = async ({ userId, kind }) => {
  const years = await filter({ userId, kind })

  console.log(`\nYour 10-star ${kind}:`)

  Object.keys(years)
    .forEach(year => {
      console.log(`\n  ${year}\n`)

      years[year]
        .sort((a, b) => a[kind].canonicalTitle.localeCompare(b[kind].canonicalTitle, {
          numeric: true
        }))
        .forEach(entry => {
          console.log('-', entry[kind].canonicalTitle)
        })
    })
}

display({ userId: 42603, kind: 'anime' })
