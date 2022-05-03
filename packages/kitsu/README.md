<h1 align=center>Kitsu</h1>

<p align=center>
  <a href=https://www.npmjs.com/package/kitsu><img alt=npm src=https://flat.badgen.net/npm/v/kitsu></a>
  <a href=https://www.npmjs.com/package/kitsu><img alt=npm src=https://flat.badgen.net/npm/dt/kitsu></a>
  <a href="https://david-dm.org/wopian/kitsu?path=packages/kitsu"><img alt=deps src="https://flat.badgen.net/david/dep/wopian/kitsu/packages/kitsu"></a>
  <a href="https://bundlephobia.com/result?p=kitsu"><img alt=bundlephobia src='https://flat.badgen.net/bundlephobia/minzip/kitsu?label=library%20size'></a>
  <img alt=types src='https://flat.badgen.net/npm/types/kitsu'>
</p>

<p align=center>
  <a href=https://github.com/wopian/kitsu/actions><img alt=checks src=https://flat.badgen.net/github/checks/wopian/kitsu></a>
  <a href=https://codeclimate.com/github/wopian/kitsu/code?sort=test_coverage><img alt=coverage src=https://flat.badgen.net/codeclimate/coverage/wopian/kitsu></a>
  <a href=https://codeclimate.com/github/wopian/kitsu/code?sort=maintainability><img alt=maintainability src=https://flat.badgen.net/codeclimate/maintainability/wopian/kitsu></a>
  <a href=https://github.com/wopian/kitsu/network/dependents><img alt=repoDependants src=https://flat.badgen.net/github/dependents-repo/wopian/kitsu></a>
</p>

<p align=center>
  <a href=https://github.com/wopian/kitsu/graphs/contributors><img alt=contributors src=https://flat.badgen.net/github/contributors/wopian/kitsu></a>
  <a href=https://github.com/sponsors/wopian><img alt=sponsor src='https://flat.badgen.net/badge/sponsor/%E2%9D%A4/pink?icon=github'></a>
</p>

<p align=center>A simple, lightweight & framework agnostic <a href=http://jsonapi.org>JSON:API</a> client using Axios</p>

<p align=center><a href=https://github.com/wopian/kitsu/blob/master/packages/kitsu/MIGRATING.md>Migration guide</a> for v10 & previous major releases</p>

#

## Features

*   JSON-API 1.0 compliant
*   Automatically links relationships to data
*   Works in Node & browsers
*   Uses the [Promise] API

## Node / Browser Support

| Package | Package<br> Size\* | ESM Size† | Node | Chrome | Firefox | Safari | Edge |
| ------: | :----------------: | :-------: | :--: | :----: | :-----: | :----: | :--: |
| `kitsu` |      ≤ 8.7 kb      | ≤ 8.6 KB  | 14+  |  83+   |   78+   | 13.1+  | 95+  |

\* Including all dependencies & minified with brotli
† EcmaScript Modules package size\*

## Response Comparison

<details>
<summary>Object from a GET Response by a JSON:API Server</summary>

```json5
{
  data: {
    id: '1'
    type: 'articles'
    attributes: {
      title: 'JSON API paints my bikeshed'
    }
    relationships: {
      author: {
        data: {
          id: '42'
          type: 'people'
        }
      }
    }
  }
  included: [
    {
      id: '42'
      type: 'people'
      attributes: {
        name: 'John'
      }
    }
  ]
}
```

</details>

<details open>
<summary>Object from a GET Response with kitsu:</summary>

```json5
{
  data: {
    id: '1'
    type: 'articles'
    title: 'JSON API paints my bikeshed'
    author: {
      data: {
        id: '42'
        type: 'people'
        name: 'John'
      }
    }
  }
}
```

</details>

## Install

### Yarn / NPM

```bash
yarn add kitsu
npm install kitsu
```

```js
import Kitsu from "kitsu"; // ES Modules & Babel
const Kitsu = require("kitsu"); // CommonJS & Browserify
```

## Quick Start

```javascript
// Kitsu.io's API
const api = new Kitsu()

// Other JSON:API servers
const api = new Kitsu({
  baseURL: 'https://api.example/2'
})

// Using with async/await
const res = await api.get('anime')

// Using with Promises
api.get('anime')
  .then(res => { ... })
  .catch(err => { ... })

// Fetching resources (get/fetch)
api.fetch('anime')
api.fetch('anime', { params: { filter: { id: 1 } } })
api.fetch('anime/1/episodes')
api.fetch('anime/1/relationships/episodes')

// Creating resources (post/create)
api.create('post', {
  content: 'some content'
})

// Updating resources (patch/update)
api.update('post', {
  id: '1',
  content: 'new content'
})

// Deleting resources (delete/remove)
api.remove('post', 1)

// JSON:API parameters
api.get('users', {
  params: {
    include: 'followers,waifu.character',
    fields: {
      users: 'slug,followers,waifu'
    },
    filter: {
      slug: 'wopian'
    },
    sort: '-id',
    page: {
      limit: 5,
      offset: 0
    }
  }
})
```

[More Examples]

If you're working with [Kitsu.io]'s API, their [API docs][kitsu.io api docs] lists all available resources with their attributes & relationships

## Contributing

See [CONTRIBUTING]

## Releases

See [CHANGELOG]

## License

All code released under [MIT]

[kitsu.io]: https://kitsu.io

[json:api]: http://jsonapi.org

[promise]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises

[more examples]: https://github.com/wopian/kitsu/tree/master/packages/kitsu/example

[kitsu.io api docs]: https://kitsu.docs.apiary.io

[migration guide]: https://github.com/wopian/kitsu/blob/master/packages/kitsu/MIGRATING.md

[changelog]: https://github.com/wopian/kitsu/blob/master/packages/kitsu/CHANGELOG.md

[contributing]: https://github.com/wopian/kitsu/blob/master/CONTRIBUTING.md

[mit]: https://github.com/wopian/kitsu/blob/master/LICENSE.md

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

*   [Kitsu](#kitsu)
    *   [Parameters](#parameters)
    *   [Examples](#examples)
    *   [plural](#plural)
        *   [Examples](#examples-1)
    *   [headers](#headers)
        *   [Examples](#examples-2)
    *   [interceptors](#interceptors)
        *   [Examples](#examples-3)
    *   [get](#get)
        *   [Parameters](#parameters-1)
        *   [Examples](#examples-4)
    *   [patch](#patch)
        *   [Parameters](#parameters-2)
        *   [Examples](#examples-5)
    *   [post](#post)
        *   [Parameters](#parameters-3)
        *   [Examples](#examples-6)
    *   [delete](#delete)
        *   [Parameters](#parameters-4)
        *   [Examples](#examples-7)
    *   [self](#self)
        *   [Parameters](#parameters-5)
        *   [Examples](#examples-8)
    *   [request](#request)
        *   [Parameters](#parameters-6)
        *   [Examples](#examples-9)

### Kitsu

[packages/kitsu/src/index.js:30-523](https://github.com/wopian/kitsu/blob/87bad7afcbde28b236428f4af5f77a6b1123a993/packages/kitsu/src/index.js#L30-L523 "Source code on GitHub")

Creates a new `kitsu` instance

#### Parameters

*   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** Options (optional, default `{}`)

    *   `options.baseURL` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Set the API endpoint (optional, default `https://kitsu.io/api/edge`)
    *   `options.headers` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** Additional headers to send with the requests
    *   `options.camelCaseTypes` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** If enabled, `type` will be converted to camelCase from kebab-casae or snake_case (optional, default `true`)
    *   `options.resourceCase` **(`"kebab"` | `"snake"` | `"none"`)** Case to convert camelCase to. `kebab` - `/library-entries`; `snake` - /library_entries` ;  `none`-`/libraryEntries\` (optional, default `kebab`)
    *   `options.pluralize` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** If enabled, `/user` will become `/users` in the URL request and `type` will be pluralized in POST, PATCH and DELETE requests (optional, default `true`)
    *   `options.timeout` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Set the request timeout in milliseconds (optional, default `30000`)
    *   `options.axiosOptions` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** Additional options for the axios instance (see [axios/axios#request-config](https://github.com/axios/axios#request-config) for details)

#### Examples

Using with Kitsu.io's API

```javascript
const api = new Kitsu()
```

Using another API server

```javascript
const api = new Kitsu({
  baseURL: 'https://api.example.org/2'
})
```

Setting headers

```javascript
const api = new Kitsu({
  headers: {
    'User-Agent': 'MyApp/1.0.0 (github.com/username/repo)',
    Authorization: 'Bearer 1234567890'
  }
})
```

#### plural

[packages/kitsu/src/index.js:52-53](https://github.com/wopian/kitsu/blob/87bad7afcbde28b236428f4af5f77a6b1123a993/packages/kitsu/src/index.js#L52-L53 "Source code on GitHub")

*   **See**: <https://www.npmjs.com/package/pluralize> for documentation
*   **See**: [Kitsu](#kitsu) constructor options for disabling pluralization

If pluralization is enabled (default, see Kitsu constructor docs) then pluralization rules can be added

##### Examples

Adding an uncountable pluralization rule

```javascript
api.plural.plural('paper') //=> 'papers'
api.plural.addUncountableRule('paper')
api.plural.plural('paper') //=> 'paper'
```

#### headers

[packages/kitsu/src/index.js:67-67](https://github.com/wopian/kitsu/blob/87bad7afcbde28b236428f4af5f77a6b1123a993/packages/kitsu/src/index.js#L67-L67 "Source code on GitHub")

Get the current headers or add additional headers

##### Examples

Get all headers

```javascript
api.headers
```

Get a single header's value

```javascript
api.headers['User-Agent']
```

Add or update a header's value

```javascript
api.headers['Authorization'] = 'Bearer 1234567890'
```

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** All the current headers

#### interceptors

[packages/kitsu/src/index.js:113-113](https://github.com/wopian/kitsu/blob/87bad7afcbde28b236428f4af5f77a6b1123a993/packages/kitsu/src/index.js#L113-L113 "Source code on GitHub")

*   **See**: <https://github.com/axios/axios#interceptors> for documentation

Axios Interceptors (alias of `axios.interceptors`)

You can intercept responses before they are handled by `get`, `post`, `patch` and `delete` and before requests are sent to the API server.

##### Examples

Request Interceptor

```javascript
// Add a request interceptor
api.interceptors.request.use(config => {
   // Do something before request is sent
   return config
}, error => {
   // Do something with the request error
   return Promise.reject(error)
})
```

Response Interceptor

```javascript
// Add a response interceptor
api.interceptors.response.use(response => {
   // Any status code that lie within the range of 2xx cause this function to trigger
   // Do something with response data
   return response
}, error => {
   // Any status codes that falls outside the range of 2xx cause this function to trigger
   // Do something with response error
   return Promise.reject(error)
})
```

Removing Interceptors

```javascript
const myInterceptor = api.interceptors.request.use(function () {...})
api.interceptors.request.eject(myInterceptor)
```

#### get

[packages/kitsu/src/index.js:211-240](https://github.com/wopian/kitsu/blob/87bad7afcbde28b236428f4af5f77a6b1123a993/packages/kitsu/src/index.js#L211-L240 "Source code on GitHub")

Fetch resources (alias `fetch`)

##### Parameters

*   `model` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Resource to fetch data from. Expected formats are [`:resource`](https://jsonapi.org/format/#document-resource-objects), [`:resource/:id`](https://jsonapi.org/format/#document-resource-objects), [`:resource/:id/:relationship`](https://jsonapi.org/format/#document-resource-object-relationships) or [`:resource/:id/relationships/:relationship`](https://jsonapi.org/format/#document-resource-object-linkage)
*   `config` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** Additional configuration (optional, default `{}`)

    *   `config.headers` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** Additional headers to send with the request
    *   `config.params` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** JSON:API request queries. JSON:API query parameters not listed are supported

        *   `config.params.fields` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** Return a sparse fieldset with only the included attributes/relationships - [JSON:API Sparse Fieldsets](http://jsonapi.org/format/#fetching-sparse-fieldsets)
        *   `config.params.filter` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** Filter dataset by attribute values - [JSON:API Filtering](http://jsonapi.org/format/#fetching-filtering)
        *   `config.params.include` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** Include relationship data - [JSON:API Includes](http://jsonapi.org/format/#fetching-includes)
        *   `config.params.sort` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** Sort dataset by one or more comma separated attributes (prepend `-` for descending order) - [JSON:API Sorting](http://jsonapi.org/format/#fetching-sorting)
        *   `config.params.page` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** [JSON:API Pagination](http://jsonapi.org/format/#fetching-pagination). All pagination strategies are supported, even if they are not listed below.

            *   `config.params.page.limit` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)?** Number of resources to return in request (Offset-based) - **Note:** For Kitsu.io, max is `20` except on `libraryEntries` which has a max of `500`
            *   `config.params.page.offset` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)?** Number of resources to offset the dataset by (Offset-based)
            *   `config.params.page.number` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)?** Page of resources to return in request (Page-based) - **Note:** Not supported on Kitsu.io
            *   `config.params.page.size` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)?** Number of resources to return in request (Page-based and cursor-based) - **Note:** Not supported on Kitsu.io
            *   `config.params.page.before` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** Get the previous page of resources (Cursor-based) - **Note:** Not Supported on Kitsu.io
            *   `config.params.page.after` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** Get the next page of resources (Cursor-based) - **Note:** Not Supported on Kitsu.io
    *   `config.axiosOptions` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** Additional options for the axios instance (see [axios/axios#request-config](https://github.com/axios/axios#request-config) for details)

##### Examples

Getting a resource with JSON:API parameters

```javascript
api.get('users', {
  params: {
    fields: {
      users: 'name,birthday'
    },
    filter: {
      name: 'wopian'
    }
  }
})
```

Getting a collection of resources with their relationships

```javascript
api.get('anime', {
  params: {
    include: 'categories'
  }
})
```

Getting a single resource by ID (method one)

```javascript
api.get('anime/2', {
  params: {
    include: 'categories'
  }
})
```

Getting a single resource by ID (method two)

```javascript
api.get('anime', {
  params: {
    include: 'categories',
    filter: { id: '2' }
 }
})
```

Getting a resource's relationship data only

```javascript
api.get('anime/2/categories')
```

Getting a resource with nested JSON:API filters (not supported by Kitsu.io's API)

```javascript
// resource?filter[x][y]=value
api.get('resource', {
  params: {
    filter: {
      x: {
        y: 'value'
      }
    }
  }
}
```

Handling errors (async/await)

```javascript
try {
  const { data } = await api.get('anime')
} catch (err) {
  // Array of JSON:API errors: http://jsonapi.org/format/#error-objects
  if (err.errors) err.errors.forEach(error => { ... })
  // Error type (Error, TypeError etc.)
  err.name
  // Error message
  err.message
  // Axios request parameters
  err.config
  // Axios response parameters
  err.response
}
```

Handling errors (Promises)

```javascript
api.get('anime')
  .then(({ data }) => { ... })
  .catch(err => {
    // Array of JSON:API errors: http://jsonapi.org/format/#error-objects
    if (err.errors) err.errors.forEach(error => { ... })
    // Error type (Error, TypeError etc.)
    err.name
    // Error message
    err.message
    // Axios request parameters
    err.config
    // Axios response parameters
    err.response
  })
```

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** JSON-parsed response

#### patch

[packages/kitsu/src/index.js:276-304](https://github.com/wopian/kitsu/blob/87bad7afcbde28b236428f4af5f77a6b1123a993/packages/kitsu/src/index.js#L276-L304 "Source code on GitHub")

Update a resource (alias `update`)

##### Parameters

*   `model` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Resource to update data in. Expected formats are [`:resource`](https://jsonapi.org/format/#document-resource-objects), [`:resource/:id`](https://jsonapi.org/format/#document-resource-objects), [`:resource/:id/:relationship`](https://jsonapi.org/format/#document-resource-object-relationships) or [`:resource/:id/relationships/:relationship`](https://jsonapi.org/format/#document-resource-object-linkage)
*   `body` **([Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object) | [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)>)** Data to send in the request
*   `config` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** Additional configuration (optional, default `{}`)

    *   `config.params` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** JSON:API request queries. See [#get](#get) for documentation
    *   `config.headers` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** Additional headers to send with the request
    *   `config.axiosOptions` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** Additional options for the axios instance (see [axios/axios#request-config](https://github.com/axios/axios#request-config) for details)

##### Examples

Update a resource

```javascript
api.update('posts', {
  id: '1',
  content: 'Goodbye World'
})
```

Update a resource with relationships

```javascript
api.update('posts', {
  content: 'Hello World',
  uploads: {
    id: '167585',
    type: 'uploads'
  }
})
```

Clear to-one relationships from a resource

```javascript
api.update('posts/1/relationships/uploads', null)
```

Clear to-many relationships from a resource

```javascript
api.update('posts/1/relationships/uploads', [])
```

Update multiple resources (API must support the Bulk Extension)

```javascript
api.update('posts', [
  { id: '1', content: 'Hello World' },
  { id: '2', content: 'Another post' }
])
```

Returns **([Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object) | [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)>)** JSON-parsed response

#### post

[packages/kitsu/src/index.js:334-360](https://github.com/wopian/kitsu/blob/87bad7afcbde28b236428f4af5f77a6b1123a993/packages/kitsu/src/index.js#L334-L360 "Source code on GitHub")

Create a new resource (alias `create`)

##### Parameters

*   `model` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Resource to create. Expected formats are [`:resource`](https://jsonapi.org/format/#document-resource-objects), [`:resource/:id`](https://jsonapi.org/format/#document-resource-objects), [`:resource/:id/:relationship`](https://jsonapi.org/format/#document-resource-object-relationships) or [`:resource/:id/relationships/:relationship`](https://jsonapi.org/format/#document-resource-object-linkage)
*   `body` **([Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object) | [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)>)** Data to send in the request
*   `config` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** Additional configuration (optional, default `{}`)

    *   `config.params` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** JSON:API request queries. See [#get](#get) for documentation
    *   `config.headers` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** Additional headers to send with the request

##### Examples

Create a post on a user's profile feed

```javascript
api.create('posts', {
  content: 'Hello World',
  targetUser: {
    id: '42603',
    type: 'users'
  },
  user: {
    id: '42603',
    type: 'users'
  }
})
```

Create multiple resources (API must support the Bulk Extension)

```javascript
api.create('posts', [
  { content: 'Hello World' },
  { content: 'Another post' }
])
```

Returns **([Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object) | [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)>)** JSON-parsed response

#### delete

[packages/kitsu/src/index.js:378-412](https://github.com/wopian/kitsu/blob/87bad7afcbde28b236428f4af5f77a6b1123a993/packages/kitsu/src/index.js#L378-L412 "Source code on GitHub")

Remove a resource (alias `remove`)

##### Parameters

*   `model` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Resource to remove. Expected formats are [`:resource`](https://jsonapi.org/format/#document-resource-objects), [`:resource/:id/:relationship`](https://jsonapi.org/format/#document-resource-object-relationships) or [`:resource/:id/relationships/:relationship`](https://jsonapi.org/format/#document-resource-object-linkage)
*   `id` **([string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) | [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>)** Resource ID to remove. Pass an array of IDs to delete multiple resources (Bulk Extension)
*   `config` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** Additional configuration (optional, default `{}`)

    *   `config.params` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** JSON:API request queries. See [#get](#get) for documentation
    *   `config.headers` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** Additional headers to send with the request
    *   `config.axiosOptions` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** Additional options for the axios instance (see [axios/axios#request-config](https://github.com/axios/axios#request-config) for details)

##### Examples

Remove a single resource

```javascript
api.delete('posts', 123)
```

Remove multiple resources (API must support the Bulk Extension)

```javascript
api.delete('posts', [ 1, 2 ])
```

Returns **([Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object) | [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)>)** JSON-parsed response

#### self

[packages/kitsu/src/index.js:436-445](https://github.com/wopian/kitsu/blob/87bad7afcbde28b236428f4af5f77a6b1123a993/packages/kitsu/src/index.js#L436-L445 "Source code on GitHub")

Get the authenticated user's data

**Note** Requires the JSON:API server to support `filter[self]=true`

##### Parameters

*   `config` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** Additional configuration (optional, default `{}`)

    *   `config.params` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** JSON:API request queries. See [#get](#get) for documentation
    *   `config.headers` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** Additional headers to send with the request
    *   `config.axiosOptions` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** Additional options for the axios instance (see [axios/axios#request-config](https://github.com/axios/axios#request-config) for details)

##### Examples

Get the authenticated user's resource

```javascript
api.self()
```

Using JSON:API parameters

```javascript
api.self({
  params: {
    fields: {
      users: 'name,birthday'
    }
  }
})
```

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** JSON-parsed response

#### request

[packages/kitsu/src/index.js:500-522](https://github.com/wopian/kitsu/blob/87bad7afcbde28b236428f4af5f77a6b1123a993/packages/kitsu/src/index.js#L500-L522 "Source code on GitHub")

Send arbitrary requests

**Note** Planned changes to the `get`, `patch`, `post` and `delete` methods in a future major release may make this method redundent. See <https://github.com/wopian/kitsu/issues/415> for details.

##### Parameters

*   `config` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** Request configuration

    *   `config.body` **([Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object) | [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)>)?** Data to send in the request
    *   `config.method` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** Request method - `GET`, `PATCH`, `POST` or `DELETE` (defaults to `GET`, case-insensitive)
    *   `config.params` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** JSON:API request queries. See [#get](#get) for documentation
    *   `config.type` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The resource type
    *   `config.url` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The URL path of the resource
    *   `config.headers` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** Additional headers to send with the request
    *   `config.axiosOptions` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** Additional options for the axios instance (see [axios/axios#request-config](https://github.com/axios/axios#request-config) for details)

##### Examples

Raw GET request

```javascript
api.request({
  url: 'anime/1/mappings',
  type: 'mappings',
  params: { filter: { externalSite: 'aozora' } }
})
```

Raw PATCH request

```javascript
api.request({
  method: 'PATCH',
  url: 'anime',
  type: 'anime',
  body: { id: '1', subtype: 'tv' }
})
```

Raw POST request

```javascript
api.request({
  method: 'PATCH',
  url: 'anime',
  type: 'anime',
  body: { subtype: 'tv' }
})
```

Raw DELETE request

```javascript
api.request({
  method: 'DELETE',
  url: 'anime/1',
  type: 'anime',
  body: { id: '1' }
})
```

Bulk Extension support (`PATCH`, `POST` & `DELETE`)

```javascript
api.request({
  method: 'PATCH',
  url: 'anime',
  type: 'anime',
  body: [
    { id: '1', subtype: 'tv' }
    { id: '2', subtype: 'ona' }
  ]
})
```

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** JSON-parsed response
