import test from 'ava'
import { camelCase } from 'case-anything'

import { serialise } from '../index'

const camel = camelCase
function plural(s: string) {
  if (['anime'].includes(s)) return s
  if (s.endsWith('y')) return `${s.slice(0, -1)}ies`
  if (s.endsWith('s')) return s

  return `${s}s`
}

test('accepts camelCaseTypes as an option (default)', t => {
  const input = serialise('library-entries', { id: '1' })
  t.deepEqual(input, {
    data: {
      id: '1',
      type: 'library-entries'
    }
  })
})

test('accepts camelCaseTypes as an option (value set)', t => {
  const input = serialise('library-entries', { id: '1' }, undefined, {
    camelCaseTypes: camel
  })
  t.deepEqual(input, {
    data: {
      id: '1',
      type: 'libraryEntries'
    }
  })
})

test('accepts pluralTypes  as an option (default)', t => {
  const input = serialise('libraryEntry', { id: '1' })
  t.deepEqual(input, {
    data: {
      id: '1',
      type: 'libraryEntry'
    }
  })
})

test('accepts pluralTypes as an option (value set)', t => {
  const input = serialise('libraryEntry', { id: '1' }, undefined, {
    pluralTypes: plural
  })
  t.deepEqual(input, {
    data: {
      id: '1',
      type: 'libraryEntries'
    }
  })
})

test('accepts typeTransform as an option (default)', t => {
  const input = serialise('library-entries', { id: '1' }, undefined, {})
  t.deepEqual(input, {
    data: {
      id: '1',
      type: 'library-entries'
    }
  })
})

test('accepts typeTransform as an option (value set)', t => {
  const input = serialise('library-entries', { id: '1' }, undefined, {
    typeTransform: s => s.toUpperCase()
  })
  t.deepEqual(input, {
    data: {
      id: '1',
      type: 'LIBRARY-ENTRIES'
    }
  })
})

test('serialises to a JSON API compliant object', t => {
  const input = serialise(
    'libraryEntries',
    {
      ratingTwenty: 20
    },
    undefined,
    {
      camelCaseTypes: camel,
      pluralTypes: plural
    }
  )
  t.deepEqual(input, {
    data: {
      attributes: {
        ratingTwenty: 20
      },
      type: 'libraryEntries'
    }
  })
})

test('serialises JSON API relationships', t => {
  const input = serialise(
    'libraryEntries',
    {
      user: {
        data: {
          id: '2'
        }
      }
    },
    undefined,
    {
      camelCaseTypes: camel,
      pluralTypes: plural
    }
  )
  t.deepEqual(input, {
    data: {
      relationships: {
        user: {
          data: {
            id: '2',
            type: 'users'
          }
        }
      },
      type: 'libraryEntries'
    }
  })
})

test('serialises JSON API array relationships', t => {
  const input = serialise(
    'libraryEntries',
    {
      user: {
        data: [
          {
            id: '2',
            type: 'users',
            content: 'yuzu'
          },
          {
            id: '3'
          }
        ]
      }
    },
    undefined,
    {
      camelCaseTypes: camel,
      pluralTypes: plural
    }
  )
  t.deepEqual(input, {
    data: {
      relationships: {
        user: {
          data: [
            {
              id: '2',
              type: 'users',
              attributes: {
                content: 'yuzu'
              }
            },
            {
              id: '3',
              type: 'users'
            }
          ]
        }
      },
      type: 'libraryEntries'
    }
  })
})

test('serialises JSON API with a client-generated ID', t => {
  const input = serialise(
    'libraryEntries',
    {
      id: '123456789',
      ratingTwenty: 20
    },
    undefined,
    {
      camelCaseTypes: camel,
      pluralTypes: plural
    }
  )
  t.deepEqual(input, {
    data: {
      id: '123456789',
      type: 'libraryEntries',
      attributes: {
        ratingTwenty: 20
      }
    }
  })
})

test('pluralises type', t => {
  const input = serialise(
    'libraryEntry',
    {
      rating: '1'
    },
    undefined,
    {
      camelCaseTypes: camel,
      pluralTypes: plural
    }
  )
  t.deepEqual(input, {
    data: {
      type: 'libraryEntries',
      attributes: {
        rating: '1'
      }
    }
  })
})

test('does not pluralise mass nouns', t => {
  const input = serialise(
    'anime',
    {
      slug: 'Cowboy Bebop 2'
    },
    undefined,
    {
      camelCaseTypes: camel,
      pluralTypes: plural
    }
  )
  t.deepEqual(input, {
    data: {
      type: 'anime',
      attributes: {
        slug: 'Cowboy Bebop 2'
      }
    }
  })
})

test('does not pluralise type', t => {
  const input = serialise('libraryEntry', {
    rating: '1'
  })
  t.deepEqual(input, {
    data: {
      type: 'libraryEntry',
      attributes: {
        rating: '1'
      }
    }
  })
})

test('throws an error if obj is missing', t => {
  t.throws(() => serialise('post'), {
    message: 'POST requires an object or array body'
  })
})

test('throws an error if obj is not an Object', t => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t.throws(() => serialise('post', 'id: 1' as any, 'DELETE'), {
    message: 'DELETE requires an object or array body'
  })
})

test('throws an error when missing ID', t => {
  t.throws(() => serialise('user', { theme: 'dark' }, 'PATCH'), {
    message: 'PATCH requires an ID for the user type'
  })
})

test('throws an error when missing ID in array', t => {
  t.throws(() => serialise('user', [{ theme: 'dark' }], 'PATCH'), {
    message: 'PATCH requires an ID for the user type'
  })
})

test('serialises strings/numbers/booleans into attributes', t => {
  const input = serialise('resourceModel', {
    string: 'shark',
    number: 1,
    boolean: true
  })
  t.deepEqual(input, {
    data: {
      type: 'resourceModel',
      attributes: {
        string: 'shark',
        number: 1,
        boolean: true
      }
    }
  })
})

test('serialises bare objects into attributes', t => {
  const input = serialise('resourceModel', {
    object: {
      string: 'shark'
    },
    blank: {}
  })
  t.deepEqual(input, {
    data: {
      type: 'resourceModel',
      attributes: {
        object: {
          string: 'shark'
        },
        blank: {}
      }
    }
  })
})

test('serialises type objects into relationships', t => {
  const input = serialise('resourceModel', {
    myRelationship: {
      data: {
        id: '1',
        type: 'relationshipModel',
        content: 'Hello',
        attributes: 'Keep me'
      }
    }
  })
  t.deepEqual(input, {
    data: {
      type: 'resourceModel',
      relationships: {
        myRelationship: {
          data: {
            id: '1',
            type: 'relationshipModel',
            attributes: {
              content: 'Hello',
              attributes: 'Keep me'
            }
          }
        }
      }
    }
  })
})

test('serialises type objects into relationships inside arrays', t => {
  const input = serialise('resourceModel', [
    {
      myRelationship: {
        data: {
          id: '1',
          type: 'relationshipModel',
          content: 'Hello'
        }
      }
    }
  ])
  t.deepEqual(input, {
    data: [
      {
        type: 'resourceModel',
        relationships: {
          myRelationship: {
            data: {
              id: '1',
              type: 'relationshipModel',
              attributes: {
                content: 'Hello'
              }
            }
          }
        }
      }
    ]
  })
})

test('serialises bare arrays into attributes', t => {
  const input = serialise('resourceModel', {
    array: [0],
    deepArray: [[0]],
    arrayObject: [{ string: 'shark' }],
    blank: []
  })
  t.deepEqual(input, {
    data: {
      type: 'resourceModel',
      attributes: {
        array: [0],
        deepArray: [[0]],
        arrayObject: [{ string: 'shark' }],
        blank: []
      }
    }
  })
})

test('serialises type arrays into relationships', t => {
  const input = serialise('resourceModels', {
    arrayRelation: {
      data: [
        {
          id: '1',
          type: 'arrayRelations',
          content: 'Hey',
          attributes: 'Keep me'
        }
      ]
    }
  })
  t.deepEqual(input, {
    data: {
      type: 'resourceModels',
      relationships: {
        arrayRelation: {
          data: [
            {
              id: '1',
              type: 'arrayRelations',
              attributes: {
                content: 'Hey',
                attributes: 'Keep me'
              }
            }
          ]
        }
      }
    }
  })
})

test('serialises relationship clearing (to-one)', t => {
  const input = serialise('resourceModel', null) // eslint-disable-line unicorn/no-null
  t.deepEqual(input, {
    data: null // eslint-disable-line unicorn/no-null
  })
})

test('serialises relationship clearing (to-many)', t => {
  const input = serialise('resourceModel', [])
  t.deepEqual(input, {
    data: []
  })
})

test('serialises a data array without ID (POST)', t => {
  const resource = { content: 'some new content' }
  const resourceOutput = {
    type: 'posts',
    attributes: { content: 'some new content' }
  }
  const input = serialise('posts', [resource, resource])
  t.deepEqual(input, {
    data: [resourceOutput, resourceOutput]
  })
})

test('serialises a data array with ID (PATCH/DELETE)', t => {
  const resource = { id: '1', content: 'some new content' }
  const resourceOutput = {
    id: '1',
    type: 'posts',
    attributes: { content: 'some new content' }
  }
  const input = serialise('posts', [resource, resource])
  t.deepEqual(input, {
    data: [resourceOutput, resourceOutput]
  })
})

test('does not error with an invalid JSON value (undefined)', t => {
  const resource = { id: '1', content: undefined }
  const resourceOutput = {
    id: '1',
    type: 'posts',
    attributes: { content: undefined }
  }
  const input = serialise('posts', resource)
  t.deepEqual(input, { data: resourceOutput })
})

test('serialises object and array relationships', t => {
  const input = {
    id: '1',
    type: 'libraryEntries',
    links: { self: 'library-entries/1' },
    meta: { extra: true },
    ratingTwenty: 10,
    user: {
      links: {
        self: 'library-entries/1/relationships/user',
        related: 'library-entries/1/user'
      },
      meta: { some: 'meta info' },
      data: {
        id: '2',
        type: 'users',
        name: 'Example',
        links: { self: 'users/2' }
      }
    },
    unit: {
      links: {
        self: 'library-entries/1/relationships/unit',
        related: 'library-entries/1/unit'
      },
      meta: { extra: 'info' },
      data: [
        {
          id: '3',
          type: 'episodes',
          number: 12,
          links: { self: 'episodes/3' }
        }
      ]
    }
  }
  const output = {
    data: {
      id: '1',
      type: 'libraryEntries',
      links: { self: 'library-entries/1' },
      meta: { extra: true },
      attributes: { ratingTwenty: 10 },
      relationships: {
        user: {
          links: {
            self: 'library-entries/1/relationships/user',
            related: 'library-entries/1/user'
          },
          meta: { some: 'meta info' },
          data: {
            id: '2',
            type: 'users',
            attributes: { name: 'Example' },
            links: { self: 'users/2' }
          }
        },
        unit: {
          links: {
            self: 'library-entries/1/relationships/unit',
            related: 'library-entries/1/unit'
          },
          meta: { extra: 'info' },
          data: [
            {
              id: '3',
              type: 'episodes',
              attributes: { number: 12 },
              links: { self: 'episodes/3' }
            }
          ]
        }
      }
    }
  }
  t.deepEqual(serialise('libraryEntries', input), output)
})

test('keeps non-JSON:API links/meta properties in attributes', t => {
  const input = {
    id: '1',
    type: 'libraryEntries',
    links: 'Not JSON:API link object',
    meta: 'Not JSON:API meta object',
    user: {
      data: {
        id: '1',
        links: 'Not JSON:API link object',
        meta: 'Not JSON:API meta object'
      }
    }
  }
  const output = {
    data: {
      id: '1',
      type: 'libraryEntries',
      attributes: {
        links: 'Not JSON:API link object',
        meta: 'Not JSON:API meta object'
      },
      relationships: {
        user: {
          data: {
            id: '1',
            type: 'user',
            attributes: {
              links: 'Not JSON:API link object',
              meta: 'Not JSON:API meta object'
            }
          }
        }
      }
    }
  }
  t.deepEqual(serialise('libraryEntries', input), output)
})

test('deletes a to-one relationship', t => {
  const input = {
    id: '1',
    type: 'libraryEntries',
    user: {
      data: null // eslint-disable-line unicorn/no-null
    }
  }
  const output = {
    data: {
      id: '1',
      type: 'libraryEntries',
      relationships: {
        user: {
          data: null // eslint-disable-line unicorn/no-null
        }
      }
    }
  }
  t.deepEqual(serialise('libraryEntries', input), output)
})

test('deletes a to-many relationship', t => {
  const input = {
    id: '1',
    type: 'libraryEntries',
    user: {
      data: []
    }
  }
  const output = {
    data: {
      id: '1',
      type: 'libraryEntries',
      relationships: {
        user: {
          data: []
        }
      }
    }
  }
  t.deepEqual(serialise('libraryEntries', input), output)
})
