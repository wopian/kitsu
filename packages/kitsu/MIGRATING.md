# Migration Guides

## Migrating to `13.0.0`

### Switch to native fetch if needed

`kitsu` continues to use Axios. The new `kitsu-native` package offers the same
resource methods through native fetch. Both default exports are classes named
`Kitsu`. Follow the [Axios-to-fetch migration guide](../kitsu-native/MIGRATING.md)
for options, headers, interceptors, cancellation, and error handling.

### Node.js support changes

Node.js 18, 19, 20, 21, 23, and 25 are no longer supported.

Move your application and CI to Node.js 22, 24, or 26 and later before upgrading.

Browser support remains available. TypeScript output targets ES2023.

### What has changed

Version 13 keeps attributes flat, removes relationship `data` wrappers, and puts
resource metadata under `$`. These examples use a fictional bakery API.

```js
import Kitsu from 'kitsu'

const api = new Kitsu({ baseURL: 'https://bakery.example/api' })
```

#### Read relationships directly

Suppose article `42`, "Moonlight Bread", has author Mina Reed:

```js
const result = await api.get('articles/42', { params: { include: 'author,tags' } })

// Before, with the default hoistData: false
result.data.author.data.name // 'Mina Reed'
result.data.tags.data[0].name // 'Baking'

// After, with hoistData enabled or disabled
result.data.author.name // 'Mina Reed'
result.data.tags[0].name // 'Baking'
result.data.editor // null when the server sends an empty to-one relationship
```

Included resources remain available in `result.included`. If Mina is both author
and reviewer, both properties point to the same decoded person. Local IDs (`lid`)
and cyclic relationships also resolve without changing your input objects.

#### Keep resource metadata under `$`

Document metadata describes the whole response. Resource metadata describes one
article. Version 13 keeps them separate from each other and from attributes.

For example, the bakery API sends:

```js
const serverDocument = {
  data: {
    type: 'articles', id: '42',
    attributes: {
      title: 'Moonlight Bread',
      meta: { summary: 'A recipe for night owls' }
    },
    meta: { reviewed: true },
    links: { self: '/articles/42' },
    relationships: {
      author: {
        data: { type: 'people', id: '9', meta: { role: 'writer' } },
        meta: { featured: true },
        links: { related: '/articles/42/author' }
      }
    }
  },
  included: [{ type: 'people', id: '9', attributes: { name: 'Mina Reed' }, meta: { verified: true } }],
  meta: { total: 1 },
  links: { next: null },
  jsonapi: { version: '1.1' }
}
```

Read it like this:

```js
const result = await api.get('articles/42')

result.data.title // 'Moonlight Bread'
result.data.meta.summary // 'A recipe for night owls': an ordinary attribute
result.data.$.meta.reviewed // true: metadata about this article
result.data.$.links.self // '/articles/42': a resource link
result.meta.total // 1: metadata about the whole response
result.links.next // null: a document link
result.jsonapi.version // '1.1': document information
result.status // 200: HTTP status
```

Before, an attribute named `meta` could hide the resource's metadata. Now the
attribute stays at `article.meta`, and resource metadata lives at `article.$.meta`.
Attributes named `links`, `lid`, or `attributes` stay ordinary attributes too.
Resources without extra metadata have no `$` object.

Relationship metadata stays with the article's connection to its author:

```js
const article = result.data

article.$.relationships.author.meta // { featured: true }: relationship metadata
article.$.relationships.author.links.related // URL for loading the author
article.$.relationships.author.data.meta // { role: 'writer' }: identifier metadata
article.author.$.meta // { verified: true }: metadata about Mina herself
```

Move resource metadata under `$` when saving too:

```js
// Before
await api.patch('articles', { id: '42', title: 'Moonlight Bread', meta: { reviewed: true } })

// After
await api.patch('articles', {
  id: '42',
  title: 'Moonlight Bread',
  $: { meta: { reviewed: true } }
})
```

Use `config.document` for metadata about the whole request:

```js
await api.post('articles', { title: 'Moonlight Bread' }, {
  document: { meta: { source: 'bakery-editor' } }
})
// Sends:
// {
//   meta: { source: 'bakery-editor' },
//   data: { type: 'articles', attributes: { title: 'Moonlight Bread' } }
// }
```

#### Choose whether to unwrap the document

`hoistData` defaults to `false`. Suppose the server sends only this resource:

```js
const resourceDocument = {
  data: {
    type: 'articles', id: '42',
    attributes: { title: 'Moonlight Bread' },
    meta: { reviewed: true }
  }
}
```

Compare the two settings:

```js
import Kitsu from 'kitsu'

const wrappedApi = new Kitsu({ hoistData: false })
const wrapped = await wrappedApi.get('articles/42')
wrapped.data.title // 'Moonlight Bread'
wrapped.data.$.meta.reviewed // true
wrapped.status // 200

const flatApi = new Kitsu({ hoistData: true })
const flat = await flatApi.get('articles/42')
flat.title // 'Moonlight Bread'
flat.$.meta.reviewed // true
flat.status // 200
```

Resource metadata under `$` does not prevent hoisting. If the response also has
document metadata, such as `meta: { total: 1 }`, both clients keep the wrapper:

```js
const result = await flatApi.get('articles/42')
// For a response containing document meta: { total: 1 }
result.data.title // 'Moonlight Bread'
result.data.$.meta.reviewed // true: resource metadata
result.meta.total // 1: document metadata
result.status // 200
```

Document `links`, `jsonapi`, or preserved `included` also keep the wrapper, even if
empty. Relationship links and metadata never prevent relationship flattening.
HTTP responses always keep arrays and `null` under `data` so status and headers
remain available. Nested JSON attributes containing `data` never unwrap.

Before, `hoistData: true` could change `preferences: { data: { newsletter: true } }`
into `preferences: { newsletter: true }`. After upgrading, read
`article.preferences.data.newsletter` regardless of the hoisting setting.

#### Enable attribute casing when your API needs it

Suppose the bakery API uses `first-name`, but your application prefers `firstName`.
The new `attributeCase` option defaults to `'none'`, so existing names stay unchanged:

```js
const unchangedApi = new Kitsu({ attributeCase: 'none' }) // also the default
const unchanged = await unchangedApi.get('people/9')
unchanged.data['first-name'] // 'Mina'

const camelApi = new Kitsu({ attributeCase: 'kebab' })
const converted = await camelApi.get('people/9')
converted.data.firstName // 'Mina'

await unchangedApi.patch('people', { id: '9', firstName: 'Mina' })
// Sends attributes: { firstName: 'Mina' }

await camelApi.patch('people', { id: '9', firstName: 'Mina' })
// Sends attributes: { 'first-name': 'Mina' }
```

Use `'snake'` for an API that expects `first_name`. Both enabled modes read names
into camelCase. This option is independent of URL casing through `resourceCase`.

Conversion applies to resource attributes, including related and included
resources. Nested JSON keys, relationships, metadata, links, IDs, and extension
members stay unchanged. For example, `preferences['email-frequency']` stays unchanged.
Supply the server's names yourself in query parameters:

```js
await camelApi.get('people', {
  params: { fields: { people: 'first-name' }, sort: 'first-name' }
})
```

If two names become the same name, conversion throws instead of losing one value.
For example, `first-name` and `first_name` cannot both become `firstName`.

#### Send relationships without `data` wrappers

Change existing write bodies:

```js
// Before
await api.patch('articles', {
  id: '42', author: { data: { type: 'people', id: '9' } }
})

// After
await api.patch('articles', {
  id: '42', author: { type: 'people', id: '9' }
})
// Sends relationships: { author: { data: { type: 'people', id: '9' } } }
```

A `{ data: ... }` object now stays an ordinary JSON attribute. The library creates
the relationship wrapper. A bare identifier only creates linkage. A related
object with fields, such as `name: 'Mina Reed'`, is also collected in `included`.

Use `$` when a value could mean either an attribute or a relationship:

```js
await api.patch('articles', {
  id: '42',
  subtitle: null, // an attribute
  tags: [], // clear a to-many relationship
  $: {
    attributes: {
      shoppingList: [], // an attribute, not a relationship
      reference: { type: 'recipe-card', id: 7 } // ordinary JSON
    },
    relationships: { editor: { data: null } } // clear a to-one relationship
  }
})
```

Values in `$.attributes` are always attributes, even if they look like relationships.
They replace same-named values in the flat object. If you change `article.author`,
the new person wins over the old identifier saved under `$`. Old identifier
metadata is reused only when the type and ID or local ID still match.
Conflicting full objects with the same type and ID throw;
use one consistent author object instead of two different names for person `9`.

Numeric IDs, including `0`, become strings in outgoing JSON. New resources can use
`$: { lid: 'draft-article' }` until the server assigns an ID. Decoding and encoding
leave your input objects untouched and copy nested JSON into the result.

#### Relationship URLs, DELETE bodies, and query strings

Relationship writes use the relationship URL without adding the target person's ID:

```js
await api.patch('articles/42/relationships/author', { type: 'people', id: '9' })
// PATCH /articles/42/relationships/author
// Body: { data: { type: 'people', id: '9' } }

await api.patch('articles/42/relationships/author', null)
// Body: { data: null }

await api.delete('articles/42/relationships/tags', ['3', '4'])
// DELETE /articles/42/relationships/tags, with identifier data in the body

await api.delete('articles', '42')
// DELETE /articles/42, with no body
```

An explicit URL such as `articles/42` no longer gets another `/42` suffix when
PATCH receives a body with that ID. IDs keep their case. For custom relationship
URLs passed to `request()`, set `relationship: true` when the URL does not contain
`/relationships/`.

Query spaces now use `+`; a literal plus sign uses `%2B`. Searching for
`Tea + toast` sends `Tea+%2B+toast`. Traditional and modern array modes remain
available. Existing headers still configure extensions and profiles;
document `jsonapi.ext` and `jsonapi.profile` do not configure request headers.
Unknown members are ignored; extension and `@` members remain uninterpreted.
Atomic Operations is not included.

## Migrating to `12.0.0`

Both packages now publish ESM only. Replace `require()` with `import` and enable ESM in your application with `"type": "module"` or an `.mjs` file. CommonJS exports and UMD bundles, including the `kitsuCore` global, are removed.


## Migrating to `10.0.0`

### Exports

The compiled output of `kitsu` has been changed from `lib` to `dist`.

```js
// Legacy behaviour, any of:
import Kitsu from 'kitsu'
import Kitsu from 'kitsu/lib/index'

// New behaviour, any of:
import Kitsu from 'kitsu'
import Kitsu from 'kitsu/index' // Node 12+
import Kitsu from 'kitsu/dist/index'
```

### Parameter Changes

1. JSON:API query parameters can be set for `PATCH`, `POST` and `DELETE` requests.

2. All requests have had `params` and `headers` merged under one `config` parameter.

#### get

`Kitsu.get(model, params?, headers?)` is now `Kitsu.get(model, config? { params?, headers? })`

#### patch / post

`Kitsu.patch(model, body, headers?)` is now `Kitsu.patch(model, body, config? { params?, headers? })`

#### delete

`Kitsu.delete(model, id, headers?)` is now `Kitsu.delete(model, id, config? { params?, headers? })`

#### self

`Kitsu.self(params?, headers?)` is now `Kitsu.self(config? { params?, headers? })`

#### request

The `headers` parameter has been merged with the existing `config` parameter

`Kitsu.request(config?, headers?)` is now `Kitsu.request(config? { headers? })`

### Response Changes

1. The header object is now returned in requests when headers are returned by the API. You can now do the following for all requests:

    `const { data, headers } = await api.get('products')`

2. `api.self` now returns data within a `data` object to support the header object without conflicting with attribute names:

    `await api.self()` now returns `{ data: { name: 'wopian' }, headers?: {} }` instead of `{ name: 'wopian' }`

### Serialisation Changes

This change does not affect `Kitsu.get`.

`kitsu-core` serialisation internals have been refactored to match the deserialisation behaviour introduced in v9. This was intended for the v9 release, however it slipped though the net and resulted in broken relationship serialisation in v9.

Relationships in the `body` of `PATCH` and `POST` requests are now always an object containing either a `data` object or a `data` array. This allows for optional top-level relationship `links` and `meta` objects to be serialised into the JSON:API format.

Exemptions:
- `links` that are not objects or do not contain `self` or `related` will become attributes as normal
- `meta` that are not objects will become attributes as normal

#### Legacy PATCH/POST Input

`body` parameter of PATCH/POST requests

```js
{
  id: '1',
  type: 'libraryEntries',
  links: { self: 'library-entries/1' }
  user: { // one-to-one relationship
    id: '2',
    type: 'users',
    links: { self: 'users/2' }
    name: 'Example'
  },
  unit: [ // one-to-many relationship
    {
      id: '3',
      type: 'episodes',
      links: { self: 'episodes/3' }
      number: 12
    }
  ]
}
```

##### Legacy Output

JSON data sent to the API server

```js
data: {
  id: '1',
  type: 'libraryEntries',
  attributes: {
    links: { self: 'library-entries/1' }
  },
  relationships: {
    user: {
      data: {
        id: '2',
        type: 'users',
        attributes: {
          links: { self: 'users/2' }
          name: 'Example'
        }
      }
    },
    unit: {
      data: [
        {
          id: '3',
          type: 'episodes',
          attributes: {
            links: { self: 'episodes/3' }
            number: 12
          }
        }
      ]
    }
  }
}
```

#### New Input

`body` parameter of PATCH/POST requests

```js
{
  id: '1',
  type: 'libraryEntries',
  links: { self: 'library-entries/1' }
  user: { // one-to-one relationship
    links: {
      self: 'library-entries/1/relationships/user'
      related: 'libary-entries/1/user'
    },
    data: {
      id: '2',
      type: 'users',
      links: { self: 'users/2' }
      name: 'Example'
    }
  },
  unit: { // one-to-many relationship
    links: {
      self: 'library-entries/1/relationships/unit',
      related: 'library-entries/1/unit'
    },
    data: [
      {
        id: '3',
        type: 'episodes',
        links: { self: 'episodes/3' },
        number: 12
      }
    ]
  }
}
```

##### New Output

JSON data sent to the API server

```
data: {
  id: '1',
  type: 'libraryEntries',
  links: { self: 'library-entries/1' },
  relationships: {
    user: {
      links: {
        self: 'library-entries/1/relationships/user'
        related: 'libary-entries/1/user'
      },
      data: {
        id: '2',
        type: 'users',
        links: { self: 'users/2' },
        attributes: {
          name: 'Example'
        }
      }
    },
    unit: {
      links: {
        self: 'library-entries/1/relationships/unit',
        related: 'library-entries/1/unit'
      },
      data: [
        {
          id: '3',
          type: 'episodes',
          links: { self: 'episodes/3' },
          attributes: {
            number: 12
          }
        }
      ]
    }
  }
}
```


## Migrating to `9.0.0`

### Link objects

`kitsu-core` internals have been refactored and `link` objects from root `data` object/array and relationships are now preserved instead of being omitted.
- Root `data` self links are avaiable as `data.links` or `data[].links`
- Relationship objects are now `relationshipName.data.id` from `relationshipName.id`
- Relationship arrays are now `relationshipName.data[].id` from `relationshipName[].id`
- Relationship links are avaiable as `relationshipName.links`

For the full change in behaviour, see the legacy and new outputs below.

#### Legacy Behaviour

JSON:API Response:

```js
data: {
  id: '1',
  type: 'libraryEntries'
  links: {
    self: 'https://kitsu.app/api/edge/library-entries/1'
  },
  attributes: {
    ratingTwenty: 10
  },
  relationships: {
    user: {
      links: {
        self: 'https://kitsu.app/api/edge/library-entries/1/relationships/user',
        related: 'https://kitsu.app/api/edge/library-entries/1/user'
      },
      data: {
        id: '2',
        type: 'users'
      }
    }
  }
},
included: [
  {
    id: '2',
    type: 'users',
    links: {
      self: 'https://kitsu.app/api/edge/users/2'
    },
    attributes: {
      name: 'Example'
    }
  }
```

Output:

```js
data: {
  id: '1',
  type: 'libraryEntries',
  ratingTwenty: 10,
  user: {
    id: '2',
    type: 'users',
    name: 'Example'
  }
}
```

#### New Behaviour


Output with same JSON:API response data as legacy behaviour:

```js
data: {
  id: '1',
  type: 'libraryEntries',
  links: {
    self: 'https://kitsu.app/api/edge/library-entries/1'
  },
  ratingTwenty: 10,
  user: {
    links: {
      self: 'https://kitsu.app/api/edge/library-entries/1/relationships/user',
      related: 'https://kitsu.app/api/edge/library-entries/1/user'
    }
    data: {
      id: '2',
      type: 'users',
      links: {
        self: 'https://kitsu.app/api/edge/users/2'
      },
      name: 'Example'
    }
  }
}
```

### Non-breaking changes of significance

Accessing relationship resources in requests are now better supported:

```js
import Kitsu from 'kitsu'

const api = new Kitsu()

api.get('posts/1/comments')
api.patch('post/1/comments', { id: '1', body: 'An updated comment'})
api.post('post/1/comments', { body: 'A new comment'})
api.delete('post/1/comments', 1)
```

## Migrating to `8.0.0`

Dropped Node 8 suppsort. Lowest supported version is now Node 10.

`kitsu/node` has been removed as it is now identical to`kitsu`.

- Replace `kitsu/node` imports with `kitsu`
- Replace `kitsu/node/index.mjs` imports with `kitsu/lib/index.mjs`

## Migrating to `7.0.0`

Dropped Node 6 support. Lowest supported version is now Node 8.

~~`kitsu/node` now exists as a standalone package called `kitsu-node`. This has no dependency on Babel Runtime, as it's required only by the browser version of `kitsu`.~~ Change reverted.

## Migrating to `6.0.0`

### Babel 7

Kitsu now depends on Babel 7 with a significantly lower package size (over 50% reduction for the node variant). If your web app depends on Babel 6 you may want to hold off upgrading as you'll have two runtimes in your web bundles.

### Legacy Bundle

`kitsu/legacy` has been removed as it didn't see any usage.

### Nested Query Parameters

Query parameters handling has been rewritten to support nested parameters. This should not be a breaking change for daily use, but edge cases may be effected.

```js
// Requests /resources?filter[myFilter][content][name]=filter_name
api.get('resource', {
  filter: {
    myFilter: {
      content: {
        name: 'filter_name'
    }
  }
})
```

## Migrating to `5.0.0`

Internal functions of `kitsu` was split into a standalone package, `kitsu-core`, which allows serialisation and deserialsation of JSON:API resources with other HTTP clients (built-in, got) or with WebSocket connections.

### Removed Features

- `isAuth()` was deprecated in 4.5.0 and removed in this major release as it didn't guarantee client is genuinely authenticated with the API.
  - With oAuth2, use the `expires_in` property to check when your `access_token` needs refreshing in the `Authorization` header.

### Legacy/Node Changes

- `/lib/` from the legacy and node version paths has been removed:

  ```diff
  - import Kitsu from 'kitsu/lib/legacy'
  + import Kitsu from 'kitsu/legacy'
  ```

## Migrating to `4.0.0`

Major overhaul of the codebase and further bundle size optimization - now 14kb gzipped!

- Dropped support for IE in the main package
  - Import/require `kitsu/lib/legacy` to use with IE8+
- Changed default behavior of request URL formatting
  - In `3.x` the model/resource was mistakenly converted from `camelCase` into `snake_case`
  - In `4.x` the default behavior is now converting it into `kebab-case`
- The JSON:API `errors` object can now be destructured for easier error handling
  - Previously exposed as an anonymous object
- Sending a `POST` or `PATCH` request with relationships containing an array of data is fixed - they now correctly go into the `relationships` object instead of `attributes`

### Constructor Options

Many new options have been added inside `new Kitsu({ options })`

- Removed `version` - use the existing `baseURL` instead
- Added pluralization option
  - `pluralization: false` to disable pluralization
- Added option to camelCase the resource `type` value
  - `camelCaseTypes: true` - default, `library-entries` and `library_entries` become `libraryEntries`
  - `camelCaseTypes: false` - types are not modified
- Added option to change the model/resource request URL case conversion
  - `resourceCase: 'kebab'` - default behavior, `/libraryEntries/1` becomes `/library-entries/1`
  - `resourceCase: 'snake'` - previous behavior, `/libraryEntries/1` becomes `/library_entries/1`
  - `resourceCase: 'none'` - new behavior, `/libraryEntries/1` is not modified

### Error Handling
#### Network Errors (Axios)

Network errors contain the request and response settings used by Axios. Accessing these from `kitsu` errors in `4.5` and above:

```js
catch (err) {
	err.name // 'Error'
	err.message // 'Request failed with status code 404'
	err.config // Object containing everything used to send the request
	err.response // Same as config, but for response
}
```

#### JSON:API Errors

In `4.5` and above, if a JSON:API error is found in this, `kitsu` copies them to the error's top level for destructuring. They're also accessible from `err.response.data.errors`:

```js
catch (err) {
	err.name // 'Error'
	err.message // 'Request failed with status code 404'
	err.config // Object containing everything used to send the request
	err.response // Same as config, but for response
	err.errors // Array of JSON:API errors: { title, detail, code, status }
}
```

In `3.x` and before `4.5``, JSON:API errors are found and replace the axios error entirely, but were not thrown:

```js
const { data, errors } = await api.get(...)
errors // Undefined or an array of JSON:API errors
```

#### `kitsu` Errors

Unchanged from `3.x`, if there is an error thrown by `kitsu` itself, then you only have:

```js
catch (err) {
	err.name // 'Error'
	err.message // 'POST requires an object or array body'
}

## Migrating to `3.0.0`

Major update focusing on bundle size optimization. `2.0.4` was 48kb gzipped - `3.0.0` is 20kb

- Removed built-in oAuth2 authentication - use the `client-oauth2` package directly.
- Removed `compact` option in `whoAmI()`
- Removed network failure retry ability (side-effect of switching from `got` to `axios`)
- Some `new Kitsu()` constructor options have been renamed
  - `apiUrl` is now `baseURL`
  - `apiVer` is now `version`

## Migrating to `2.0.0`

- Remove `attributes` from object traversing
  - `data.attributes.canonicalTitle` is now `data.canonicalTitle`
- Use the relationship name to access relationships
  - In `1.x` the `waifu` relationship erroneously became `characters: { type: 'characters' }`
  - In `2.x` the `waifu` relationship is `waifu: { type: 'characters' }`
- Use an integer to delete resources
  - `kitsu.remove('model', { id: 1 })` is now `kitsu.remove('model', 1)`
- `kitsu.header('key', 'value')` has been removed
  - Use the existing `kitsu.headers['key'] = 'value'`
