export default {
  data: {
    id: '1',
    type: 'anime',
    links: {
      self: 'https://kitsu.io/api/edge/anime/1'
    },
    attributes: {
      createdAt: '2013-02-20T16:00:13.609Z',
      updatedAt: '2017-12-30T00:49:40.721Z',
      slug: 'cowboy-bebop',
      synopsis: 'In the year 2071',
      coverImageTopOffset: 400,
      titles: {
        en: 'Cowboy Bebop',
        en_jp: 'Cowboy Bebop',
        ja_jp: 'カウボーイビバップ'
      },
      canonicalTitle: 'Cowboy Bebop',
      abbreviatedTitles: [
        'COWBOY BEBOP'
      ],
      averageRating: '88.54',
      ratingFrequencies: {
        '2': '83',
        '3': '0',
        '4': '297',
        '5': '0',
        '6': '68',
        '7': '2',
        '8': '205',
        '9': '1',
        '10': '271',
        '11': '3',
        '12': '1416',
        '13': '11',
        '14': '1724',
        '15': '35',
        '16': '3935',
        '17': '56',
        '18': '4651',
        '19': '69',
        '20': '14315'
      },
      userCount: 43560,
      favoritesCount: 3490,
      startDate: '1998-04-03',
      endDate: '1999-04-24',
      popularityRank: 10,
      ratingRank: 10,
      ageRating: 'R',
      ageRatingGuide: '17+ (violence & profanity)',
      subtype: 'TV',
      status: 'finished',
      tba: '',
      posterImage: {
        tiny: 'https://media.kitsu.io/anime/poster_images/1/tiny.jpg?1431697256',
        small: 'https://media.kitsu.io/anime/poster_images/1/small.jpg?1431697256',
        medium: 'https://media.kitsu.io/anime/poster_images/1/medium.jpg?1431697256',
        large: 'https://media.kitsu.io/anime/poster_images/1/large.jpg?1431697256',
        original: 'https://media.kitsu.io/anime/poster_images/1/original.jpg?1431697256',
        meta: {
          dimensions: {
            tiny: {
              width: null,
              height: null
            },
            small: {
              width: null,
              height: null
            },
            medium: {
              width: null,
              height: null
            },
            large: {
              width: null,
              height: null
            }
          }
        }
      },
      coverImage: {
        tiny: 'https://media.kitsu.io/anime/cover_images/1/tiny.jpg?1416336000',
        small: 'https://media.kitsu.io/anime/cover_images/1/small.jpg?1416336000',
        large: 'https://media.kitsu.io/anime/cover_images/1/large.jpg?1416336000',
        original: 'https://media.kitsu.io/anime/cover_images/1/original.jpg?1416336000',
        meta: {
          dimensions: {
            tiny: {
              width: null,
              height: null
            },
            small: {
              width: null,
              height: null
            },
            large: {
              width: null,
              height: null
            }
          }
        }
      },
      episodeCount: 26,
      episodeLength: 25,
      youtubeVideoId: 'qig4KOK2R2g',
      showType: 'TV',
      nsfw: false
    },
    relationships: {
      genres: {
        links: {
          self: 'https://kitsu.io/api/edge/anime/1/relationships/genres',
          related: 'https://kitsu.io/api/edge/anime/1/genres'
        }
      },
      categories: {
        links: {
          self: 'https://kitsu.io/api/edge/anime/1/relationships/categories',
          related: 'https://kitsu.io/api/edge/anime/1/categories'
        },
        data: [
          {
            type: 'categories',
            id: '155'
          },
          {
            type: 'categories',
            id: '51'
          }
        ]
      }
    }
  },
  included: [
    {
      id: '155',
      type: 'categories',
      links: {
        self: 'https://kitsu.io/api/edge/categories/155'
      },
      attributes: {
        createdAt: '2017-05-31T06:39:22.090Z',
        updatedAt: '2017-05-31T09:01:35.589Z',
        title: 'Science Fiction',
        totalMediaCount: 4368,
        slug: 'science-fiction',
        nsfw: false,
        childCount: 8,
        image: null
      },
      relationships: {
        parent: {
          links: {
            self: 'https://kitsu.io/api/edge/categories/155/relationships/parent',
            related: 'https://kitsu.io/api/edge/categories/155/parent'
          }
        }
      }
    },
    {
      id: '51',
      type: 'categories',
      links: {
        self: 'https://kitsu.io/api/edge/categories/51'
      },
      attributes: {
        createdAt: '2017-05-31T06:38:47.070Z',
        updatedAt: '2017-05-31T09:05:33.687Z',
        title: 'Space',
        totalMediaCount: 574,
        slug: 'space',
        nsfw: false,
        childCount: 2,
        image: null
      },
      relationships: {
        parent: {
          links: {
            self: 'https://kitsu.io/api/edge/categories/51/relationships/parent',
            related: 'https://kitsu.io/api/edge/categories/51/parent'
          }
        }
      }
    }
  ]
}
