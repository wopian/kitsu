import { deserialise } from './'

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
                  self: 'https://kitsu.io/follows/1/relationships/follower',
                  related: 'https://kitsu.io/follows/1/follower'
                }
              },
              followed: {
                links: {
                  self: 'https://kitsu.io/follows/1/relationships/followed',
                  related: 'https://kitsu.io/follows/1/followed'
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
                  self: 'https://kitsu.io/follows/2/relationships/follower',
                  related: 'https://kitsu.io/follows/2/follower'
                }
              },
              followed: {
                links: {
                  self: 'https://kitsu.io/follows/2/relationships/followed',
                  related: 'https://kitsu.io/follows/2/followed'
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
                    self: 'https://kitsu.io/follows/1/relationships/follower',
                    related: 'https://kitsu.io/follows/1/follower'
                  }
                },
                followed: {
                  links: {
                    self: 'https://kitsu.io/follows/1/relationships/followed',
                    related: 'https://kitsu.io/follows/1/followed'
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
                    self: 'https://kitsu.io/follows/2/relationships/follower',
                    related: 'https://kitsu.io/follows/2/follower'
                  }
                },
                followed: {
                  links: {
                    self: 'https://kitsu.io/follows/2/relationships/followed',
                    related: 'https://kitsu.io/follows/2/followed'
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
                  self: 'https://kitsu.io/characters/1/relationships/primary-media',
                  related: 'https://kitsu.io/characters/1/primary-media'
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
                  self: 'https://kitsu.io/characters/1/relationships/primary-media',
                  related: 'https://kitsu.io/characters/1/primary-media'
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

    // TODO: https://github.com/wopian/kitsu/issues/579
    it.skip('deserialises nested relationships of same name', () => {
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
  })
})
