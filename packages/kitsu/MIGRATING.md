# Migration Guides

## Migrating to `10.0.0`

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

`Kitsu.request(config?, headers?)` is now `Kitsu.self(config? { headers? })`

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
    self: 'https://kitsu.io/api/edge/library-entries/1'
  },
  attributes: {
    ratingTwenty: 10
  },
  relationships: {
    user: {
      links: {
        self: 'https://kitsu.io/api/edge/library-entries/1/relationships/user',
        related: 'https://kitsu.io/api/edge/library-entries/1/user'
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
      self: 'https://kitsu.io/api/edge/users/2'
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
    self: 'https://kitsu.io/api/edge/library-entries/1'
  },
  ratingTwenty: 10,
  user: {
    links: {
      self: 'https://kitsu.io/api/edge/library-entries/1/relationships/user',
      related: 'https://kitsu.io/api/edge/library-entries/1/user'
    }
    data: {
      id: '2',
      type: 'users',
      links: {
        self: 'https://kitsu.io/api/edge/users/2'
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
