import Kitsu from '../src'

const api = new Kitsu()

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
    const { data } = await api
      .get('libraryEntries', {
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
      })
      .catch(error => {
        console.log(error.errors)
      })

    return data
  } catch (error) {
    console.log(error)
  }
}

const filter = async ({ userId, kind }) => {
  const data = await get({ userId, kind })
  const years = {}

  for (const entry of data) {
    if (entry.ratingTwenty === 20) {
      let year = entry[kind].startDate

      year =
        year === null
          ? 'Unknown'
          : entry[kind].startDate.slice(0, 4) || 'Unknown'

      // Ensure an array for the year exists
      if (!years[year]) years[year] = []

      years[year].push(entry)
    }
  }

  return years
}

const display = async ({ userId, kind }) => {
  const years = await filter({ userId, kind })

  console.log(`\nYour 10-star ${kind}:`)

  for (const year of Object.keys(years)) {
    console.log(`\n  ${year}\n`)

    for (const entry of years[year].sort((a, b) =>
      a[kind].canonicalTitle.localeCompare(b[kind].canonicalTitle, {
        numeric: true
      })
    )) {
      console.log('-', entry[kind].canonicalTitle)
    }
  }
}

display({ userId: 42_603, kind: 'anime' })
