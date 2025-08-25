import { deserialise } from './'
import stringify from 'json-stringify-safe'

describe('kitsu-core', () => {
  describe('deserialise', () => {
    it('deserialises a resource without included relationships', () => {
      expect.assertions(1)
      expect(deserialise({
        data: {
          id: '9',
          type: 'roles',
          attributes: {
            name: 'mod'
          }
        }
      })).toEqual({
        data: {
          id: '9',
          type: 'roles',
          name: 'mod'
        }
      })
    })

    it('deserialises a collection without attributes and included relationships', () => {
      expect.assertions(1)
      expect(deserialise({
        data: [
          {
            id: '1',
            type: 'userRoles'
          },
          {
            id: '2',
            type: 'userRoles'
          }
        ]
      })).toEqual({
        data: [
          {
            id: '1',
            type: 'userRoles'
          },
          {
            id: '2',
            type: 'userRoles'
          }
        ]
      })
    })

    it('deserialises a collection of resources with included relationships', () => {
      expect.assertions(1)
      expect(deserialise({
        data: [
          {
            id: '1',
            type: 'users',
            attributes: {
              name: 'Josh'
            },
            relationships: {
              waifu: {
                data: {
                  id: '1',
                  type: 'characters'
                }
              }
            }
          }
        ],
        included: [
          {
            id: '1',
            type: 'characters',
            attributes: {
              name: 'Genkai'
            }
          }
        ]
      })).toEqual({
        data: [
          {
            name: 'Josh',
            waifu: {
              data: {
                name: 'Genkai',
                id: '1',
                type: 'characters'
              }
            },
            id: '1',
            type: 'users'
          }
        ]
      })
    })

    it('deserialises a single resource with included relationships', () => {
      expect.assertions(1)
      expect(deserialise({
        data: {
          id: '1',
          type: 'users',
          attributes: {
            name: 'Josh'
          },
          relationships: {
            waifu: {
              data: {
                id: '1',
                type: 'characters'
              }
            }
          }
        },
        included: [
          {
            id: '1',
            type: 'characters',
            attributes: {
              name: 'Genkai'
            }
          }
        ]
      })).toEqual({
        data: {
          name: 'Josh',
          waifu: {
            data: {
              name: 'Genkai',
              id: '1',
              type: 'characters'
            }
          },
          id: '1',
          type: 'users'
        }
      })
    })

    it('deserialises with empty data arrays', () => {
      expect.assertions(1)
      expect(deserialise({
        data: {
          id: '1',
          type: 'users',
          attributes: {
            data: []
          }
        }
      })).toEqual({
        data: {
          data: [],
          id: '1',
          type: 'users'
        }
      })
    })

    it('deserialises relationships with links', () => {
      expect.assertions(1)
      expect(deserialise({
        data: {
          id: '1',
          type: 'users',
          relationships: {
            followers: {
              links: {
                self: 'https://kitsu.example/users/1/relationships/followers',
                related: 'https://kitsu.example/users/1/followers'
              }
            }
          }
        }
      })).toEqual({
        data: {
          id: '1',
          type: 'users',
          followers: {
            links: {
              self: 'https://kitsu.example/users/1/relationships/followers',
              related: 'https://kitsu.example/users/1/followers'
            }
          }
        }
      })
    })

    it('deserialises relationships with meta', () => {
      expect.assertions(1)
      expect(deserialise({
        data: {
          id: '1',
          type: 'users',
          relationships: {
            followers: {
              meta: {
                follower_count: 200
              }
            }
          }
        }
      })).toEqual({
        data: {
          id: '1',
          type: 'users',
          followers: {
            meta: {
              follower_count: 200
            }
          }
        }
      })
    })

    it('deserialises relationships with links and data (array)', () => {
      expect.assertions(1)

      const input = deserialise({
        data: {
          id: '1',
          type: 'users',
          relationships: {
            followers: {
              links: {
                self: 'https://kitsu.example/users/1/relationships/followers',
                related: 'https://kitsu.example/users/1/followers'
              },
              data: [ {
                type: 'follows',
                id: '1'
              },
              {
                type: 'follows',
                id: '2'
              } ]
            }
          }
        },
        included: [
          {
            id: '1',
            type: 'follows',
            links: {
              self: 'https://kitsu.example/follows/1'
            },
            relationships: {
              follower: {
                links: {
                  self: 'https://kitsu.app/follows/1/relationships/follower',
                  related: 'https://kitsu.app/follows/1/follower'
                }
              },
              followed: {
                links: {
                  self: 'https://kitsu.app/follows/1/relationships/followed',
                  related: 'https://kitsu.app/follows/1/followed'
                }
              }
            }
          },
          {
            id: '2',
            type: 'follows',
            links: {
              self: 'https://kitsu.example/follows/2'
            },
            relationships: {
              follower: {
                links: {
                  self: 'https://kitsu.app/follows/2/relationships/follower',
                  related: 'https://kitsu.app/follows/2/follower'
                }
              },
              followed: {
                links: {
                  self: 'https://kitsu.app/follows/2/relationships/followed',
                  related: 'https://kitsu.app/follows/2/followed'
                }
              }
            }
          }
        ]
      })

      const output = {
        data: {
          id: '1',
          type: 'users',
          followers: {
            links: {
              self: 'https://kitsu.example/users/1/relationships/followers',
              related: 'https://kitsu.example/users/1/followers'
            },
            data: [
              {
                id: '1',
                type: 'follows',
                links: {
                  self: 'https://kitsu.example/follows/1'
                },
                follower: {
                  links: {
                    self: 'https://kitsu.app/follows/1/relationships/follower',
                    related: 'https://kitsu.app/follows/1/follower'
                  }
                },
                followed: {
                  links: {
                    self: 'https://kitsu.app/follows/1/relationships/followed',
                    related: 'https://kitsu.app/follows/1/followed'
                  }
                }
              },
              {
                id: '2',
                type: 'follows',
                links: {
                  self: 'https://kitsu.example/follows/2'
                },
                follower: {
                  links: {
                    self: 'https://kitsu.app/follows/2/relationships/follower',
                    related: 'https://kitsu.app/follows/2/follower'
                  }
                },
                followed: {
                  links: {
                    self: 'https://kitsu.app/follows/2/relationships/followed',
                    related: 'https://kitsu.app/follows/2/followed'
                  }
                }
              }
            ]
          }
        }
      }

      expect(input).toEqual(output)
    })

    it('deserialises relationships with links and data (object)', () => {
      expect.assertions(1)

      const input = deserialise({
        data: {
          id: '1',
          type: 'users',
          relationships: {
            waifu: {
              links: {
                self: 'https://kitsu.example/users/1/relationships/waifu',
                related: 'https://kitsu.example/users/1/waifu'
              },
              data: {
                type: 'characters',
                id: '1'
              }
            }
          }
        },
        included: [
          {
            id: '1',
            type: 'characters',
            links: {
              self: 'https://kitsu.example/characters/1'
            },
            relationships: {
              primaryMedia: {
                links: {
                  self: 'https://kitsu.app/characters/1/relationships/primary-media',
                  related: 'https://kitsu.app/characters/1/primary-media'
                }
              }
            }
          }
        ]
      })

      const output = {
        data: {
          id: '1',
          type: 'users',
          waifu: {
            links: {
              self: 'https://kitsu.example/users/1/relationships/waifu',
              related: 'https://kitsu.example/users/1/waifu'
            },
            data: {
              id: '1',
              type: 'characters',
              links: {
                self: 'https://kitsu.example/characters/1'
              },
              primaryMedia: {
                links: {
                  self: 'https://kitsu.app/characters/1/relationships/primary-media',
                  related: 'https://kitsu.app/characters/1/primary-media'
                }
              }
            }
          }
        }
      }

      expect(input).toEqual(output)
    })

    it('deserialises a relationship used twice or more', () => {
      expect.assertions(1)

      const input = deserialise({
        data: [
          {
            id: '1',
            type: 'anime',
            relationships: {
              categories: {
                links: {
                  self: 'https://kitsu.example/anime/1/relationships/categories',
                  related: 'https://kitsu.example/anime/1/categories'
                },
                data: [
                  {
                    type: 'categories',
                    id: '10'
                  }
                ]
              }
            }
          },
          {
            id: '2',
            type: 'anime',
            relationships: {
              categories: {
                links: {
                  self: 'https://kitsu.example/anime/2/relationships/categories',
                  related: 'https://kitsu.example/anime/2/categories'
                },
                data: [
                  {
                    type: 'categories',
                    id: '10'
                  }
                ]
              }
            }
          }
        ],
        included: [
          {
            id: '10',
            type: 'categories',
            links: {
              self: 'https://kitsu.example/categories/10'
            }
          }
        ]
      })

      const output = {
        data: [
          {
            id: '1',
            type: 'anime',
            categories: {
              links: {
                self: 'https://kitsu.example/anime/1/relationships/categories',
                related: 'https://kitsu.example/anime/1/categories'
              },
              data: [
                {
                  id: '10',
                  type: 'categories',
                  links: {
                    self: 'https://kitsu.example/categories/10'
                  }
                }
              ]
            }
          },
          {
            id: '2',
            type: 'anime',
            categories: {
              links: {
                self: 'https://kitsu.example/anime/2/relationships/categories',
                related: 'https://kitsu.example/anime/2/categories'
              },
              data: [
                {
                  id: '10',
                  type: 'categories',
                  links: {
                    self: 'https://kitsu.example/categories/10'
                  }
                }
              ]
            }
          }
        ]
      }

      expect(input).toEqual(output)
    })

    it('deserialises an empty object', () => {
      expect.assertions(1)
      expect(deserialise({})).toEqual({})
    })

    it('deserialises an empty array', () => {
      expect.assertions(1)
      expect(deserialise([])).toEqual([])
    })

    it('deserialises data correctly if null', () => {
      expect.assertions(1)
      expect(deserialise({ data: null })).toStrictEqual({ data: null })
    })

    it('keeps all relationships', () => {
      expect.assertions(1)
      expect(deserialise({
        data: {
          id: '1',
          type: 'users',
          relationships: {
            waifu: {
              links: {
                self: 'https://kitsu.example',
                related: 'https://kitsu.example'
              }
            },
            followers: {
              links: {
                self: 'https://kitsu.example',
                related: 'https://kitsu.example'
              },
              data: [
                {
                  id: '1',
                  type: 'follows'
                }
              ]
            }
          }
        },
        included: [
          {
            id: '1',
            type: 'follows'
          }
        ]
      })).toEqual({
        data: {
          id: '1',
          type: 'users',
          waifu: {
            links: {
              self: 'https://kitsu.example',
              related: 'https://kitsu.example'
            }
          },
          followers: {
            links: {
              self: 'https://kitsu.example',
              related: 'https://kitsu.example'
            },
            data: [
              {
                id: '1',
                type: 'follows'
              }
            ]
          }
        }
      })
    })

    it('deserialises nested relationships of same name', () => {
      expect.assertions(1)
      expect(deserialise({
        data: [
          {
            id: '1',
            type: 'episodes',
            attributes: {
              name: 'Episode 1'
            },
            relationships: {
              teams: {
                data: [
                  {
                    type: 'teams',
                    id: '1'
                  }
                ]
              }
            }
          },
          {
            id: '2',
            type: 'episodes',
            attributes: {
              name: 'Episode 2'
            },
            relationships: {
              teams: {
                data: [
                  {
                    type: 'teams',
                    id: '1'
                  }
                ]
              }
            }
          }
        ],
        included: [
          {
            id: '1',
            type: 'teams',
            attributes: {
              name: 'Team 1'
            },
            relationships: {
              artists: {
                data: [
                  {
                    type: 'artists',
                    id: '1'
                  }
                ]
              }
            }
          },
          {
            id: '1',
            type: 'artists',
            attributes: {
              name: 'Artist 1'
            }
          }
        ]
      })).toEqual({
        data: [
          {
            id: '1',
            type: 'episodes',
            name: 'Episode 1',
            teams: {
              data: [
                {
                  id: '1',
                  type: 'teams',
                  name: 'Team 1',
                  artists: {
                    data: [
                      {
                        id: '1',
                        type: 'artists',
                        name: 'Artist 1'
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            id: '2',
            type: 'episodes',
            name: 'Episode 2',
            teams: {
              data: [
                {
                  id: '1',
                  type: 'teams',
                  name: 'Team 1',
                  artists: {
                    data: [
                      {
                        id: '1',
                        type: 'artists',
                        name: 'Artist 1'
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      })
    })

    it('deserialises a relationship from the data key', () => {
      expect.assertions(1)

      const input = deserialise({
        data: [
          {
            id: '1',
            type: 'anime',
            attributes: { name: 'A' },
            relationships: {
              prequel: {
                data: {
                  type: 'anime',
                  id: '42'
                }
              }
            }
          },
          {
            id: '2',
            type: 'anime',
            attributes: { name: 'B' },
            relationships: {
              prequel: {
                data: {
                  type: 'anime',
                  id: '1'
                }
              }
            }
          },
          {
            id: '3',
            type: 'anime',
            attributes: { name: 'C' },
            relationships: {
              prequel: {
                data: {
                  type: 'anime',
                  id: '4'
                }
              }
            }
          }
        ],
        included: [
          {
            id: '4',
            type: 'anime',
            attributes: { name: 'D' },
            relationships: {
              prequel: {
                data: {
                  type: 'anime',
                  id: '42'
                }
              }
            }
          }
        ]
      })

      const output = {
        data: [
          {
            id: '1',
            type: 'anime',
            name: 'A',
            prequel: {
              data: {
                id: '42',
                type: 'anime'
              }
            }
          },
          {
            id: '2',
            type: 'anime',
            name: 'B',
            prequel: {
              data: {
                id: '1',
                type: 'anime',
                name: 'A',
                prequel: {
                  data: {
                    id: '42',
                    type: 'anime'
                  }
                }
              }
            }
          },
          {
            id: '3',
            type: 'anime',
            name: 'C',
            prequel: {
              data: {
                id: '4',
                type: 'anime',
                name: 'D',
                prequel: {
                  data: {
                    id: '42',
                    type: 'anime'
                  }
                }
              }
            }
          }
        ]
      }

      expect(input).toEqual(output)
    })

    it('merges meta from relationship object and resource object', () => {
      expect.assertions(1)

      const input = JSON.parse(stringify(deserialise({
        data: [
          {
            id: 1,
            type: 'anime',
            relationships: {
              primary_category: {
                meta: { qux: true },
                data: { id: 1, type: 'category', meta: { foo: true } }
              },
              categories: {
                meta: { qux: true },
                data: [ { id: 1, type: 'category', meta: { foo: true } } ]
              }
            }
          },
          {
            id: 2,
            type: 'anime',
            relationships: {
              primary_category: {
                meta: { quux: true },
                data: { id: 1, type: 'category', meta: { bar: true } }
              },
              categories: {
                meta: { quux: true },
                data: [ { id: 1, type: 'category', meta: { bar: true } } ]
              }
            }
          },
          {
            id: 3,
            type: 'anime',
            relationships: {
              primary_category: {
                meta: { corge: true },
                data: { id: 1, type: 'category' }
              },
              categories: {
                meta: { corge: true },
                data: [ { id: 1, type: 'category' } ]
              }
            }
          },
          {
            id: 4,
            type: 'anime',
            relationships: {
              primary_category: {
                meta: { grault: true },
                data: { id: 1, type: 'category', meta: { baz: false } }
              },
              categories: {
                meta: { grault: true },
                data: [ { id: 1, type: 'category', meta: { baz: false } } ]
              }
            }
          }
        ],
        included: [ { id: 1, type: 'category', attributes: { title: 'foobar' }, meta: { baz: true } } ]
      })))

      const output = {
        data: [
          {
            primary_category: {
              meta: { qux: true },
              data: {
                id: 1,
                type: 'category',
                title: 'foobar',
                meta: {
                  baz: true,
                  foo: true
                }
              }
            },
            categories: {
              meta: { qux: true },
              data: [
                {
                  id: 1,
                  meta: {
                    baz: true,
                    foo: true
                  },
                  title: 'foobar',
                  type: 'category'
                }
              ]
            },
            id: 1,
            type: 'anime'
          },
          {
            primary_category: {
              meta: { quux: true },
              data: {
                id: 1,
                type: 'category',
                title: 'foobar',
                meta: {
                  baz: true,
                  bar: true
                }
              }
            },
            categories: {
              meta: { quux: true },
              data: [
                {
                  id: 1,
                  meta: {
                    baz: true,
                    bar: true
                  },
                  title: 'foobar',
                  type: 'category'
                }
              ]
            },
            id: 2,
            type: 'anime'
          },
          {
            primary_category: {
              meta: { corge: true },
              data: {
                id: 1,
                type: 'category',
                title: 'foobar',
                meta: {
                  baz: true
                }
              }
            },
            categories: {
              meta: { corge: true },
              data: [
                {
                  id: 1,
                  title: 'foobar',
                  type: 'category',
                  meta: {
                    baz: true
                  }
                }
              ]
            },
            id: 3,
            type: 'anime'
          },
          {
            primary_category: {
              meta: { grault: true },
              data: {
                id: 1,
                type: 'category',
                title: 'foobar',
                meta: {
                  baz: false
                }
              }
            },
            categories: {
              meta: { grault: true },
              data: [
                {
                  id: 1,
                  title: 'foobar',
                  type: 'category',
                  meta: {
                    baz: false
                  }
                }
              ]
            },
            id: 4,
            type: 'anime'
          }
        ]
      }

      expect(input).toEqual(output)
    })

    it('preserves meta from included resource object', () => {
      expect.assertions(1)

      const input = JSON.parse(stringify(deserialise({
        data: {
          id: '1',
          type: 'users',
          relationships: {
            followers: {
              links: {
                self: 'https://kitsu.example/users/1/relationships/followers',
                related: 'https://kitsu.example/users/1/followers'
              },
              data: [ {
                type: 'follows',
                id: '1'
              } ]
            }
          }
        },
        included: [
          {
            id: '1',
            type: 'follows',
            attributes: { a: 123 },
            links: {
              self: 'https://kitsu.example/follows/1'
            },
            meta: { value: 1 },
            relationships: {
              follower: {
                links: {
                  self: 'https://kitsu.app/follows/1/relationships/follower',
                  related: 'https://kitsu.app/follows/1/follower'
                }
              }
            }
          }
        ]
      })))

      const output = {
        data: {
          id: '1',
          type: 'users',
          followers: {
            links: {
              self: 'https://kitsu.example/users/1/relationships/followers',
              related: 'https://kitsu.example/users/1/followers'
            },
            data: [
              {
                id: '1',
                type: 'follows',
                a: 123,
                links: {
                  self: 'https://kitsu.example/follows/1'
                },
                meta: {
                  value: 1
                },
                follower: {
                  links: {
                    self: 'https://kitsu.app/follows/1/relationships/follower',
                    related: 'https://kitsu.app/follows/1/follower'
                  }
                }
              }
            ]
          }
        }
      }

      expect(input).toEqual(output)
    })

    it('Deserializes nested single circular resource', () => {
      expect.assertions(1)

      const input = JSON.parse(stringify(deserialise({
        data: [
          {
            id: '1',
            type: 'anime',
            attributes: { name: 'A' },
            relationships: {
              user: {
                data: {
                  id: '1',
                  type: 'users'
                },
                links: {
                  self: 'https://kitsu.example/user',
                  related: 'https://kitsu.example/user'
                },
                meta: {
                  hello: 'world'
                }
              }
            }
          },
          {
            id: '2',
            type: 'anime',
            attributes: { name: 'B' },
            relationships: {
              user: {
                data: {
                  id: '1',
                  type: 'users'
                }
              }
            }
          }
        ],
        included: [
          {
            id: '1',
            type: 'users',
            attributes: { name: 'B' },
            relationships: {
              favorite_anime: {
                data: {
                  id: '1',
                  type: 'anime'
                },
                links: {
                  self: 'https://kitsu.example/favorite_anime',
                  related: 'https://kitsu.example/favorite_anime'
                },
                meta: {
                  test: '123123'
                }
              }
            }
          }
        ]
      })))

      const output = {
        data: [
          {
            id: '1',
            type: 'anime',
            name: 'A',
            user: {
              links: {
                self: 'https://kitsu.example/user',
                related: 'https://kitsu.example/user'
              },
              meta: {
                hello: 'world'
              },
              data: {
                id: '1',
                type: 'users',
                name: 'B',
                favorite_anime: {
                  meta: {
                    test: '123123'
                  },
                  links: {
                    self: 'https://kitsu.example/favorite_anime',
                    related: 'https://kitsu.example/favorite_anime'
                  },
                  data: {
                    id: '1',
                    type: 'anime',
                    name: 'A',
                    user: {
                      meta: {
                        hello: 'world'
                      },
                      data: '[Circular ~.data.0.user.data]',
                      links: {
                        self: 'https://kitsu.example/user',
                        related: 'https://kitsu.example/user'
                      }
                    }
                  }
                }
              }
            }
          },
          {
            id: '2',
            type: 'anime',
            name: 'B',
            user: {
              data: {
                id: '1',
                type: 'users',
                name: 'B',
                favorite_anime: {
                  meta: {
                    test: '123123'
                  },
                  links: {
                    self: 'https://kitsu.example/favorite_anime',
                    related: 'https://kitsu.example/favorite_anime'
                  },
                  data: {
                    id: '1',
                    type: 'anime',
                    name: 'A',
                    user: {
                      meta: {
                        hello: 'world'
                      },
                      data: '[Circular ~.data.1.user.data]',
                      links: {
                        self: 'https://kitsu.example/user',
                        related: 'https://kitsu.example/user'
                      }
                    }
                  }
                }
              }
            }
          }
        ]
      }

      expect(input).toEqual(output)
    })

    it('Deserializes nested array circular resource', () => {
      expect.assertions(1)

      const input = JSON.parse(stringify(deserialise({
        data: [
          {
            id: '1',
            type: 'anime',
            attributes: { name: 'A' },
            relationships: {
              users: {
                data: [
                  {
                    id: '1',
                    type: 'users'
                  }
                ],
                links: {
                  self: 'https://kitsu.example/user',
                  related: 'https://kitsu.example/user'
                },
                meta: {
                  hello: 'world'
                }
              }
            }
          },
          {
            id: '2',
            type: 'anime',
            attributes: { name: 'B' },
            relationships: {
              users: {
                data: [
                  {
                    id: '1',
                    type: 'users'
                  }
                ]
              }
            }
          }
        ],
        included: [
          {
            id: '1',
            type: 'users',
            attributes: { name: 'B' },
            relationships: {
              favorite_anime: {
                data: [
                  {
                    id: '1',
                    type: 'anime'
                  }
                ],
                links: {
                  self: 'https://kitsu.example/favorite_anime',
                  related: 'https://kitsu.example/favorite_anime'
                },
                meta: {
                  test: '123123'
                }
              }
            }
          }
        ]
      })))

      const output = {
        data: [
          {
            id: '1',
            type: 'anime',
            name: 'A',
            users: {
              links: {
                self: 'https://kitsu.example/user',
                related: 'https://kitsu.example/user'
              },
              meta: {
                hello: 'world'
              },
              data: [
                {
                  id: '1',
                  type: 'users',
                  name: 'B',
                  favorite_anime: {
                    meta: {
                      test: '123123'
                    },
                    links: {
                      self: 'https://kitsu.example/favorite_anime',
                      related: 'https://kitsu.example/favorite_anime'
                    },
                    data: [
                      {
                        id: '1',
                        type: 'anime',
                        name: 'A',
                        users: {
                          meta: {
                            hello: 'world'
                          },
                          data: [ '[Circular ~.data.0.users.data.0]' ],
                          links: {
                            self: 'https://kitsu.example/user',
                            related: 'https://kitsu.example/user'
                          }
                        }
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            id: '2',
            type: 'anime',
            name: 'B',
            users: {
              data: [
                {
                  id: '1',
                  type: 'users',
                  name: 'B',
                  favorite_anime: {
                    meta: {
                      test: '123123'
                    },
                    links: {
                      self: 'https://kitsu.example/favorite_anime',
                      related: 'https://kitsu.example/favorite_anime'
                    },
                    data: [
                      {
                        id: '1',
                        type: 'anime',
                        name: 'A',
                        users: {
                          meta: {
                            hello: 'world'
                          },
                          data: [ '[Circular ~.data.1.users.data.0]' ],
                          links: {
                            self: 'https://kitsu.example/user',
                            related: 'https://kitsu.example/user'
                          }
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }

      expect(input).toEqual(output)
    })
  })

  it('Deserializes first level resources after being serialized as a relationship', () => {
    expect.assertions(1)

    const input = JSON.parse(stringify(deserialise({
      data: [
        {
          id: '5',
          type: 'articles',
          attributes: { title: 'asd0' },
          relationships: {
            author: {
              data: {
                id: '11',
                type: 'authors'
              },
              links: { self: 'http://kitsu.example.com/authors' },
              meta: { authors: 'articles#5' }
            }
          }
        },
        {
          id: '6',
          type: 'articles',
          attributes: { title: 'asd1' },
          relationships: {
            author: {
              data: {
                id: '11',
                type: 'authors'
              },
              links: { self: 'http://kitsu.example.com/authors' },
              meta: { authors: 'articles#6' }
            }
          }
        }
      ],
      included: [
        {
          id: '11',
          type: 'authors',
          attributes: { first_name: 'Egon', last_name: 'Egonsen' },
          relationships: {
            articles: {
              data: [
                {
                  id: '5',
                  type: 'articles'
                },
                {
                  id: '6',
                  type: 'articles'
                }
              ]
            }
          }
        }
      ]
    })))

    const output = {
      data: [
        {
          id: '5',
          type: 'articles',
          title: 'asd0',
          author: {
            links: { self: 'http://kitsu.example.com/authors' },
            meta: { authors: 'articles#5' },
            data: {
              id: '11',
              type: 'authors',
              first_name: 'Egon',
              last_name: 'Egonsen',
              articles: {
                data: [
                  {
                    id: '5',
                    type: 'articles',
                    title: 'asd0',
                    author: {
                      data: '[Circular ~.data.0.author.data]',
                      links: { self: 'http://kitsu.example.com/authors' },
                      meta: { authors: 'articles#5' }
                    }
                  },
                  {
                    id: '6',
                    type: 'articles',
                    title: 'asd1',
                    author: {
                      data: '[Circular ~.data.0.author.data]',
                      links: { self: 'http://kitsu.example.com/authors' },
                      meta: { authors: 'articles#6' }
                    }
                  }
                ]
              }
            }
          }
        },
        {
          id: '6',
          type: 'articles',
          title: 'asd1',
          author: {
            links: { self: 'http://kitsu.example.com/authors' },
            meta: { authors: 'articles#6' },
            data: {
              id: '11',
              type: 'authors',
              first_name: 'Egon',
              last_name: 'Egonsen',
              articles: {
                data: [
                  {
                    id: '5',
                    type: 'articles',
                    title: 'asd0',
                    author: {
                      data: '[Circular ~.data.1.author.data]',
                      links: { self: 'http://kitsu.example.com/authors' },
                      meta: { authors: 'articles#5' }
                    }
                  },
                  {
                    id: '6',
                    type: 'articles',
                    title: 'asd1',
                    author: {
                      data: '[Circular ~.data.1.author.data]',
                      links: { self: 'http://kitsu.example.com/authors' },
                      meta: { authors: 'articles#6' }
                    }
                  }
                ]
              }
            }
          }
        }
      ]
    }

    expect(input).toEqual(output)
  })

  it('Deserialises with flattened response (hoistData)', () => {
    expect.assertions(2)

    const inputData = {
      data: [
        {
          id: '1',
          type: 'anime',
          attributes: { name: 'A' },
          relationships: {
            prequel: {
              data: {
                type: 'anime',
                id: '42'
              }
            },
            staff: {
              data: [
                { type: 'staff', id: '5' },
                { type: 'staff', id: '6' }
              ]
            }
          }
        },
        {
          id: '2',
          type: 'anime',
          attributes: { name: 'B' },
          relationships: {
            prequel: {
              data: {
                type: 'anime',
                id: '1'
              }
            }
          }
        },
        {
          id: '3',
          type: 'anime',
          attributes: { name: 'C' },
          relationships: {
            prequel: {
              data: {
                type: 'anime',
                id: '4'
              }
            }
          }
        }
      ],
      included: [
        {
          id: '4',
          type: 'anime',
          attributes: { name: 'D' },
          relationships: {
            prequel: {
              data: {
                type: 'anime',
                id: '42'
              }
            }
          }
        },
        {
          id: '5',
          type: 'staff',
          attributes: { name: 'Staff 1' }
        },
        {
          id: '6',
          type: 'staff',
          attributes: { name: 'Staff 2' },
          relationships: {
            works_on: {
              data: [
                { type: 'anime', id: '1' },
                { type: 'anime', id: '2' }
              ]
            }
          }
        },
        {
          id: '7',
          type: 'staff',
          attributes: { name: 'Staff 3' }
        }
      ]
    }

    const input = JSON.parse(stringify(deserialise(inputData, { hoistData: true })))

    const output = [
      {
        id: '1',
        type: 'anime',
        name: 'A',
        prequel: {
          id: '42',
          type: 'anime'
        },
        staff: [
          {
            id: '5',
            type: 'staff',
            name: 'Staff 1'
          },
          {
            id: '6',
            type: 'staff',
            name: 'Staff 2',
            works_on: [
              {
                id: '1',
                type: 'anime',
                name: 'A',
                prequel: {
                  id: '42',
                  type: 'anime'
                },
                staff: [
                  {
                    id: '5',
                    type: 'staff',
                    name: 'Staff 1'
                  },
                  '[Circular ~.0.staff.1]'
                ]
              },
              {
                id: '2',
                type: 'anime',
                name: 'B',
                prequel: {
                  id: '1',
                  type: 'anime',
                  name: 'A',
                  prequel: {
                    id: '42',
                    type: 'anime'
                  },
                  staff: [
                    {
                      id: '5',
                      type: 'staff',
                      name: 'Staff 1'
                    },
                    '[Circular ~.0.staff.1]'
                  ]
                }
              }
            ]
          }
        ]
      },
      {
        id: '2',
        type: 'anime',
        name: 'B',
        prequel: {
          id: '1',
          type: 'anime',
          name: 'A',
          prequel: {
            id: '42',
            type: 'anime'
          },
          staff: [
            {
              id: '5',
              type: 'staff',
              name: 'Staff 1'
            },
            {
              id: '6',
              type: 'staff',
              name: 'Staff 2',
              works_on: [
                '[Circular ~.1.prequel]',
                {
                  id: '2',
                  type: 'anime',
                  name: 'B',
                  prequel: '[Circular ~.1.prequel]'
                }
              ]
            }
          ]
        }
      },
      {
        id: '3',
        type: 'anime',
        name: 'C',
        prequel: {
          id: '4',
          type: 'anime',
          name: 'D',
          prequel: {
            id: '42',
            type: 'anime'
          }
        }
      }
    ]

    expect(input).toEqual(output)

    // sanity check to ensure sircular references are valid
    expect(input[0].staff[1].works_on[0].staff[0].id).toBe('5')
  })

  it('covers hasOwn property checks in hoistData', () => {
    expect.assertions(1)

    // @ts-ignore - intentionally modifying Object.prototype for this test
    // eslint-disable-next-line no-extend-native
    Object.prototype.inheritedProp = 'should not be copied'

    const input = {
      data: {
        id: '1',
        type: 'test',
        attributes: { name: 'Test' }
      }
    }

    const result = deserialise(input, { hoistData: true })

    expect(Object.prototype.hasOwnProperty.call(result, 'inheritedProp')).toBe(false)

    // @ts-ignore - intentionally modifying Object.prototype for this test
    delete Object.prototype.inheritedProp
  })

  it('covers non-enumerable property checks in hoistData', () => {
    expect.assertions(1)

    const input = {
      data: {
        id: '1',
        type: 'test',
        attributes: { name: 'Test' }
      }
    }

    Object.defineProperty(input, 'hidden', {
      value: 'secret',
      enumerable: false
    })

    const result = deserialise(input, { hoistData: true })

    expect(result).not.toHaveProperty('hidden')
  })

  it('keeps meta and links when hoistData is enabled', () => {
    expect.assertions(1)

    const input = {
      data: {
        id: '1',
        type: 'test',
        attributes: { name: 'Test' },
        links: { self: 'https://kitsu.example/test/1' },
        meta: { total: 1 }
      }
    }

    const result = deserialise(input, { hoistData: true })

    expect(result).toEqual({
      id: '1',
      type: 'test',
      name: 'Test',
      links: { self: 'https://kitsu.example/test/1' },
      meta: { total: 1 }
    })
  })

  it('prioritises attributes named meta or links when hoistData is enabled', () => {
    expect.assertions(1)

    const input = {
      data: {
        id: '1',
        type: 'test',
        attributes: {
          name: 'Test',
          links: 'https://should.be.attribute',
          meta: 'should also be attribute'
        },
        links: { self: 'https://kitsu.example/test/1' },
        meta: { total: 1 }
      }
    }

    const result = deserialise(input, { hoistData: true })

    expect(result).toEqual({
      id: '1',
      type: 'test',
      name: 'Test',
      links: 'https://should.be.attribute',
      meta: 'should also be attribute'
    })
  })

  /*
  describe.only('benchmark hoistData performance impact', () => {
    const inputData = {
      data: [
        {
          id: '1',
          type: 'anime',
          attributes: { name: 'A' },
          relationships: {
            prequel: {
              data: {
                type: 'anime',
                id: '42'
              }
            },
            staff: {
              data: [
                { type: 'staff', id: '5' },
                { type: 'staff', id: '6' }
              ]
            }
          }
        },
        {
          id: '2',
          type: 'anime',
          attributes: { name: 'B' },
          relationships: {
            prequel: {
              data: {
                type: 'anime',
                id: '1'
              }
            }
          }
        },
        {
          id: '3',
          type: 'anime',
          attributes: { name: 'C' },
          relationships: {
            prequel: {
              data: {
                type: 'anime',
                id: '4'
              }
            }
          }
        }
      ],
      included: [
        {
          id: '4',
          type: 'anime',
          attributes: { name: 'D' },
          relationships: {
            prequel: {
              data: {
                type: 'anime',
                id: '42'
              }
            }
          }
        },
        {
          id: '5',
          type: 'staff',
          attributes: { name: 'Staff 1' }
        },
        {
          id: '6',
          type: 'staff',
          attributes: { name: 'Staff 2' },
          relationships: {
            works_on: {
              data: [
                { type: 'anime', id: '1' },
                { type: 'anime', id: '2' }
              ]
            }
          }
        },
        {
          id: '7',
          type: 'staff',
          attributes: { name: 'Staff 3' }
        }
      ]
    }

    it('hoistData: true', () => {
      expect.assertions(1)
      const start = performance.now()
      for (let i = 0; i < 1000; i++) {
        deserialise(inputData, { hoistData: true })
      }
      const end = performance.now()
      console.log(`hoistData: true took ${end - start} ms`)
      expect(end - start).toBeLessThan(500)
    })

    it('hoistData: false', () => {
      expect.assertions(1)
      const start = performance.now()
      for (let i = 0; i < 1000; i++) {
        deserialise(inputData, { hoistData: false })
      }
      const end = performance.now()
      console.log(`hoistData: false took ${end - start} ms`)
      expect(end - start).toBeLessThan(500)
    })
  })
  */
})
