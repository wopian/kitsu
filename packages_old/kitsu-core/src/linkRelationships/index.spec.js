import stringify from 'json-stringify-safe'

import { linkRelationships } from './'

describe('kitsu-core', () => {
  describe('linkRelationships', () => {
    it('links single relationship to included data', () => {
      expect.assertions(1)
      const data = {
        relationships: {
          waifu: {
            data: {
              id: '3',
              type: 'characters'
            }
          }
        }
      }
      const included = [
        {
          id: '3',
          type: 'characters',
          attributes: {
            name: 'Maki'
          }
        }
      ]
      expect(linkRelationships(data, included)).toEqual({
        waifu: {
          data: {
            id: '3',
            name: 'Maki',
            type: 'characters'
          }
        }
      })
    })

    it('links a relationship collection to included data', () => {
      expect.assertions(1)
      const data = {
        relationships: {
          favorites: {
            data: [
              {
                id: '1',
                type: 'favorites'
              },
              {
                id: '2',
                type: 'favorites'
              }
            ]
          }
        }
      }
      const included = [
        {
          id: '1',
          type: 'favorites',
          attributes: {
            favRank: 1
          }
        },
        {
          id: '2',
          type: 'favorites',
          attributes: {
            favRank: 1
          }
        }
      ]
      expect(linkRelationships(data, included)).toEqual({
        favorites: {
          data: [
            {
              id: '1',
              favRank: 1,
              type: 'favorites'
            },
            {
              id: '2',
              favRank: 1,
              type: 'favorites'
            }
          ]
        }
      })
    })

    it('caches relationships that were previously linked', () => {
      expect.assertions(1)

      const data = {
        id: '1',
        type: 'user',
        attributes: {
          name: 'A user'
        },
        relationships: {
          current_song: {
            data: {
              id: '1',
              type: 'song'
            }
          }
        }
      }

      const included = [
        {
          id: '1',
          type: 'album',
          attributes: {
            name: 'Mezmerize'
          },
          relationships: {
            songs: {
              data: [
                {
                  id: '1',
                  type: 'song'
                }
              ]
            }
          }
        },
        {
          id: '1',
          type: 'song',
          attributes: {
            title: 'Revenga'
          },
          relationships: {
            album: {
              data: {
                id: '1',
                type: 'album'
              }
            }
          }
        }
      ]

      const circularResult = linkRelationships(data, included)
      const result = JSON.parse(stringify(circularResult))

      expect(result).toEqual({
        id: '1',
        type: 'user',
        attributes: {
          name: 'A user'
        },
        current_song: {
          data: {
            id: '1',
            type: 'song',
            album: {
              data: {
                id: '1',
                name: 'Mezmerize',
                type: 'album',
                songs: {
                  data: ['[Circular ~.current_song.data]']
                }
              }
            },
            title: 'Revenga'
          }
        }
      })
    })

    it('does not deattribute key if theres a relationship (single) with same name (handle invalid JSON:API)', () => {
      expect.assertions(1)
      const data = {
        attributes: {
          author: 'Joe'
        },
        relationships: {
          author: {
            data: {
              id: '1',
              type: 'people'
            }
          }
        }
      }
      const included = [
        {
          id: '1',
          type: 'people',
          attributes: {
            name: 'Joe'
          }
        }
      ]
      expect(linkRelationships(data, included)).toEqual({
        attributes: {
          author: 'Joe'
        },
        author: {
          data: {
            id: '1',
            name: 'Joe',
            type: 'people'
          }
        }
      })
    })

    it('does not deattribute key if theres a relationship (array) with same name (handle invalid JSON:API)', () => {
      expect.assertions(1)
      const data = {
        attributes: {
          authors: ['Joe', 'Mary']
        },
        relationships: {
          authors: {
            data: [
              {
                id: '1',
                type: 'people'
              },
              {
                id: '2',
                type: 'people'
              }
            ]
          }
        }
      }
      const included = [
        {
          id: '1',
          type: 'people',
          attributes: {
            name: 'Joe'
          }
        },
        {
          id: '2',
          type: 'people',
          attributes: {
            name: 'Mary'
          }
        }
      ]
      expect(linkRelationships(data, included)).toEqual({
        attributes: {
          authors: ['Joe', 'Mary']
        },
        authors: {
          data: [
            {
              id: '1',
              name: 'Joe',
              type: 'people'
            },
            {
              id: '2',
              name: 'Mary',
              type: 'people'
            }
          ]
        }
      })
    })

    it('accepts empty inputs', () => {
      expect.assertions(1)
      expect(linkRelationships({}, [])).toEqual({})
    })

    it('accepts empty inputs 2', () => {
      expect.assertions(1)
      expect(linkRelationships({})).toEqual({})
    })

    it('gracefully handles broken relationship syntax', () => {
      expect.assertions(1)
      const data = {
        relationships: {
          test: {}
        }
      }
      expect(linkRelationships(data)).toEqual({
        test: {}
      })
    })

    it('accepts link-only relationships', () => {
      expect.assertions(1)
      const data = {
        relationships: {
          test: {
            links: {
              self: 'https://kitsu.example'
            }
          }
        }
      }
      expect(linkRelationships(data)).toEqual({
        test: {
          links: {
            self: 'https://kitsu.example'
          }
        }
      })
    })

    it('accepts attribute.attribute in relationships', () => {
      expect.assertions(1)
      const data = {
        relationships: {
          author: {
            data: {
              id: '1',
              type: 'people'
            }
          }
        }
      }
      const included = [
        {
          id: '1',
          type: 'people',
          attributes: {
            attributes: 'Joe'
          }
        }
      ]
      expect(linkRelationships(data, included)).toEqual({
        author: {
          data: {
            id: '1',
            attributes: 'Joe',
            type: 'people'
          }
        }
      })
    })

    it('does not overwrite meta objects', () => {
      expect.assertions(1)
      const data = {
        type: 'node--article',
        id: '1',
        attributes: {
          field_slug: 'Tower of Pisa',
          field_standfirst: 'Article standfirst',
          quote: 'Example quote',
          quote_byline: 'Example source',
          last_revision_username: 'apisrijanstuff',
          stuff_asset_id: '600007070'
        },
        relationships: {
          field_content: {
            data: [
              {
                type: 'paragraph--assets',
                id: '6e0eca07-bc2e-4b2a-af42-7fc58138cb68',
                meta: {
                  target_revision_id: 84_829,
                  drupal_internal__target_id: 46_287
                }
              }
            ]
          },
          field_teaser: {
            data: {
              type: 'paragraph--teaser',
              id: '1b578e46-d0fb-4411-919a-aae07d70b5b0',
              meta: {
                target_revision_id: 84_822,
                drupal_internal__target_id: 46_280
              }
            }
          }
        }
      }
      const included = [
        {
          type: 'paragraph--assets',
          id: '6e0eca07-bc2e-4b2a-af42-7fc58138cb68',
          attributes: {
            drupal_internal__id: 46_287,
            drupal_internal__revision_id: 84_829,
            status: true,
            created: '2022-10-18T19:39:54+13:00',
            parent_id: '4382',
            parent_type: 'node',
            parent_field_name: 'field_content',
            behavior_settings: []
          },
          relationships: {
            field_media_override: {
              data: {
                type: 'media--image',
                id: '842b1824-2982-4fcb-8dc7-780c1ae71d81',
                meta: {
                  value: {
                    original:
                      'https://platform-admin-stage-media.staging.nebula-drupal.stuff.co.nz/s3fs-public/2022-10/eSO6cM0L8_-Zy6fFR0GXNaBNUg0_1.jpg',
                    crop_1_1: {
                      width: '100',
                      height: '100',
                      x: '10',
                      y: '10'
                    }
                  },
                  caption: 'Image Caption',
                  alt_txt: 'Image Alt',
                  credit: 'Image Credit',
                  author: '',
                  source: '',
                  focal_point: '10,10',
                  crop_used: '',
                  drupal_internal__target_id: 3775
                }
              }
            }
          }
        },
        {
          type: 'paragraph--teaser',
          id: '1b578e46-d0fb-4411-919a-aae07d70b5b0',
          attributes: {
            drupal_internal__id: 46_280,
            drupal_internal__revision_id: 84_822,
            status: true,
            created: '2022-10-18T19:39:54+13:00',
            parent_id: '4382',
            parent_type: 'node',
            parent_field_name: 'field_teaser',
            behavior_settings: [],
            field_intro: 'Teaser Intro',
            field_teaser_headline: 'Teaser Short Headline'
          },
          relationships: {
            field_media_override: {
              data: {
                type: 'media--image',
                id: '842b1824-2982-4fcb-8dc7-780c1ae71d81',
                meta: {
                  value: {
                    original:
                      'https://platform-admin-stage-media.staging.nebula-drupal.stuff.co.nz/s3fs-public/2022-10/eSO6cM0L8_-Zy6fFR0GXNaBNUg0_1.jpg',
                    crop_1_1: {
                      width: '100',
                      height: '100',
                      x: '50',
                      y: '50'
                    }
                  },
                  caption: 'Image Caption',
                  alt_txt: 'coronetpeak.jpeg',
                  credit: '',
                  author: '',
                  source: '',
                  focal_point: '20,20',
                  crop_used: '',
                  drupal_internal__target_id: 3775
                }
              }
            }
          }
        },
        {
          type: 'media--image',
          id: '842b1824-2982-4fcb-8dc7-780c1ae71d81',
          attributes: {
            drupal_internal__mid: 3775,
            drupal_internal__vid: 3757,
            status: true,
            name: 'coronetpeak.jpeg',
            created: '2022-10-18T15:47:12+13:00',
            changed: '2022-10-19T12:41:38+13:00'
          },
          relationships: {
            thumbnail: {
              data: {
                type: 'file--file',
                id: '2025398c-0197-4728-800b-21e4b96644e7',
                meta: {
                  alt: 'coronetpeak.jpeg',
                  title: null,
                  width: 1340,
                  height: 876
                }
              }
            },
            field_media_image: {
              data: {
                type: 'file--file',
                id: '2025398c-0197-4728-800b-21e4b96644e7',
                meta: {
                  alt: 'coronetpeak.jpeg',
                  title: null,
                  width: 1340,
                  height: 876
                }
              }
            }
          }
        }
      ]
      expect(linkRelationships(data, included)).toStrictEqual({
        type: 'node--article',
        id: '1',
        attributes: {
          field_slug: 'Tower of Pisa',
          field_standfirst: 'Article standfirst',
          quote: 'Example quote',
          quote_byline: 'Example source',
          last_revision_username: 'apisrijanstuff',
          stuff_asset_id: '600007070'
        },
        field_content: {
          data: [
            {
              type: 'paragraph--assets',
              id: '6e0eca07-bc2e-4b2a-af42-7fc58138cb68',
              field_media_override: {
                data: {
                  type: 'media--image',
                  id: '842b1824-2982-4fcb-8dc7-780c1ae71d81',
                  thumbnail: {
                    data: {
                      id: '2025398c-0197-4728-800b-21e4b96644e7',
                      type: 'file--file',
                      meta: {
                        alt: 'coronetpeak.jpeg',
                        title: null,
                        width: 1340,
                        height: 876
                      }
                    }
                  },
                  field_media_image: {
                    data: {
                      id: '2025398c-0197-4728-800b-21e4b96644e7',
                      type: 'file--file',
                      meta: {
                        alt: 'coronetpeak.jpeg',
                        title: null,
                        width: 1340,
                        height: 876
                      }
                    }
                  },
                  meta: {
                    value: {
                      original:
                        'https://platform-admin-stage-media.staging.nebula-drupal.stuff.co.nz/s3fs-public/2022-10/eSO6cM0L8_-Zy6fFR0GXNaBNUg0_1.jpg',
                      crop_1_1: {
                        width: '100',
                        height: '100',
                        x: '10',
                        y: '10'
                      }
                    },
                    caption: 'Image Caption',
                    alt_txt: 'Image Alt',
                    credit: 'Image Credit',
                    author: '',
                    source: '',
                    focal_point: '10,10',
                    crop_used: '',
                    drupal_internal__target_id: 3775
                  },
                  drupal_internal__mid: 3775,
                  drupal_internal__vid: 3757,
                  status: true,
                  name: 'coronetpeak.jpeg',
                  created: '2022-10-18T15:47:12+13:00',
                  changed: '2022-10-19T12:41:38+13:00'
                }
              },
              meta: {
                target_revision_id: 84_829,
                drupal_internal__target_id: 46_287
              },
              drupal_internal__id: 46_287,
              drupal_internal__revision_id: 84_829,
              status: true,
              created: '2022-10-18T19:39:54+13:00',
              parent_id: '4382',
              parent_type: 'node',
              parent_field_name: 'field_content',
              behavior_settings: []
            }
          ]
        },
        field_teaser: {
          data: {
            type: 'paragraph--teaser',
            id: '1b578e46-d0fb-4411-919a-aae07d70b5b0',
            field_media_override: {
              data: {
                type: 'media--image',
                id: '842b1824-2982-4fcb-8dc7-780c1ae71d81',
                thumbnail: {
                  data: {
                    id: '2025398c-0197-4728-800b-21e4b96644e7',
                    type: 'file--file',
                    meta: {
                      alt: 'coronetpeak.jpeg',
                      title: null,
                      width: 1340,
                      height: 876
                    }
                  }
                },
                field_media_image: {
                  data: {
                    id: '2025398c-0197-4728-800b-21e4b96644e7',
                    type: 'file--file',
                    meta: {
                      alt: 'coronetpeak.jpeg',
                      title: null,
                      width: 1340,
                      height: 876
                    }
                  }
                },
                meta: {
                  value: {
                    original:
                      'https://platform-admin-stage-media.staging.nebula-drupal.stuff.co.nz/s3fs-public/2022-10/eSO6cM0L8_-Zy6fFR0GXNaBNUg0_1.jpg',
                    crop_1_1: {
                      width: '100',
                      height: '100',
                      x: '50',
                      y: '50'
                    }
                  },
                  caption: 'Image Caption',
                  alt_txt: 'coronetpeak.jpeg',
                  credit: '',
                  author: '',
                  source: '',
                  focal_point: '20,20',
                  crop_used: '',
                  drupal_internal__target_id: 3775
                },
                drupal_internal__mid: 3775,
                drupal_internal__vid: 3757,
                status: true,
                name: 'coronetpeak.jpeg',
                created: '2022-10-18T15:47:12+13:00',
                changed: '2022-10-19T12:41:38+13:00'
              }
            },
            meta: {
              target_revision_id: 84_822,
              drupal_internal__target_id: 46_280
            },
            drupal_internal__id: 46_280,
            drupal_internal__revision_id: 84_822,
            status: true,
            created: '2022-10-18T19:39:54+13:00',
            parent_id: '4382',
            parent_type: 'node',
            parent_field_name: 'field_teaser',
            behavior_settings: [],
            field_intro: 'Teaser Intro',
            field_teaser_headline: 'Teaser Short Headline'
          }
        }
      })
    })
  })
})
