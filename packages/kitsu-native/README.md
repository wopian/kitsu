<h1 align=center>Kitsu Native</h1>

<p align=center>
  <a href=https://www.npmjs.com/package/kitsu-native><img alt=npm src=https://flat.badgen.net/npm/v/kitsu-native></a>
  <a href=https://www.npmjs.com/package/kitsu-native><img alt=npm src=https://flat.badgen.net/npm/dy/kitsu-native></a>
  <a href="https://bundlephobia.com/result?p=kitsu-native"><img alt=bundlephobia src='https://flat.badgen.net/bundlephobia/minzip/kitsu-native?label=library%20size'></a>
  <img alt=types src='https://flat.badgen.net/npm/types/kitsu-native'>
</p>

<p align=center>
  <a href=https://github.com/wopian/kitsu/actions><img alt=checks src=https://flat.badgen.net/github/checks/wopian/kitsu/master></a>
  <a href=https://github.com/wopian/kitsu/network/dependents><img alt=repoDependants src=https://flat.badgen.net/github/dependents-repo/wopian/kitsu></a>
  <a href=https://github.com/wopian/kitsu/graphs/contributors><img alt=contributors src=https://flat.badgen.net/github/contributors/wopian/kitsu></a>
  <a href=https://github.com/sponsors/wopian><img alt=sponsor src='https://flat.badgen.net/badge/sponsor/%E2%9D%A4/pink?icon=github'></a>
</p>

<p align=center>A fast, framework agnostic <a href=https://jsonapi.org>JSON:API</a> client for TypeScript and JavaScript, using native Fetch in browsers, Node.js, and Bun</p>

<p align=center><a href=MIGRATING.md>Migration guide</a> for moving from Axios-based kitsu to native Fetch</p>

#

## Features

*   Uses the native Fetch implementation in browsers, Node.js, and Bun
*   TypeScript types and ESM JavaScript exports
*   JSON:API 1.1 client document support
*   Automatically links relationships to data
*   Same resource methods and aliases as kitsu, with no Axios dependency
*   Fastest measured resource writes in shared [client benchmarks](#performance)
*   Uses the [Promise] API, with cancellation and a 30,000 ms default timeout

Requires a modern browser, Bun, or Node.js 22, 24, or 26 and later.

## Performance

**The fastest measured JSON:API client for resource writes** in this repository's
shared Node.js and Bun benchmarks. Across two complete runs, `kitsu-native` leads
all 16 shared write cases per run against Axios-based `kitsu`, fetchja, and devour.
Across reads, writes, and combined operations, it ranks first in 44–45 of 60 shared
client cases per run.

**Approximately 2-4× faster than Axios-based `kitsu` in selected single-resource
read and combined scenarios.** For example, the final run measures 3.8× for Bun
reads without relationships, 2.4× for Node.js combined operations without
relationships, and 3.3× for Bun combined operations with nested relationships.
Large collections and other scenarios have different results, including cases
where another client is faster.

Measurements cover client processing with mocked transport on Node.js and Bun.
See the [complete benchmark matrix and methodology](../../README.md#benchmarks)
for every scenario, runtime version and library version.

## Response Comparison

<details>
<summary>Object from a GET Response by a JSON:API Server</summary>

```json
{
  "data": {
    "id": "42",
    "type": "articles",
    "attributes": { "title": "Moonlight Bread" },
    "meta": { "reviewed": true },
    "relationships": {
      "author": { "data": { "id": "9", "type": "people" } }
    }
  },
  "included": [
    { "id": "9", "type": "people", "attributes": { "name": "Mina Reed" } }
  ],
  "meta": { "total": 1 }
}
```

</details>

<details open>
<summary>Object from a GET Response with kitsu-native</summary>

```js
const author = { id: '9', type: 'people', name: 'Mina Reed' }

const response = {
  data: {
    id: '42',
    type: 'articles',
    title: 'Moonlight Bread',
    author,
    $: { meta: { reviewed: true } }
  },
  included: [author],
  meta: { total: 1 },
  status: 200,
  headers: new Headers({ 'Content-Type': 'application/vnd.api+json' })
}

response.data.author === response.included[0] // true: same decoded person
```

</details>

## Install

### Bun / npm / Yarn

```bash
bun add kitsu-native
npm install kitsu-native
yarn add kitsu-native
```

```js
import Kitsu from 'kitsu-native'
```

## Quick Start

```js
import Kitsu from 'kitsu-native'

// kitsu.app's API
const api = new Kitsu()
const anime = await api.get('anime')

// Other JSON:API servers
const api = new Kitsu({ baseURL: 'https://bakery.example/api' })

// Using async/await
const result = await api.get('articles/42')
console.log(result.data.title) // 'Moonlight Bread'

// Using Promises
api.get('articles/42')
  .then(result => console.log(result.data.title))
  .catch(error => console.error(error))

// Fetching resources (get/fetch)
await api.fetch('articles')
await api.fetch('articles', { params: { filter: { id: '42' } } })
await api.fetch('articles/42/author')
await api.fetch('articles/42/relationships/author')

// Creating resources (post/create)
await api.create('articles', { title: 'Moonlight Bread' })

// Updating resources (patch/update)
await api.update('articles', { id: '42', title: 'Sunrise Bread' })

// Deleting resources (delete/remove)
await api.remove('articles', '42')

// JSON:API parameters
await api.get('articles', {
  params: {
    include: 'author,tags',
    fields: { articles: 'title,author,tags' },
    filter: { title: 'Moonlight Bread' },
    sort: '-id',
    page: { limit: 5, offset: 0 }
  }
})
```

### Native Fetch options

Inject a Fetch implementation with the constructor's `fetch` option. Pass native
request options through `fetchOptions`; request values override constructor
defaults.

```js
const api = new Kitsu({
  baseURL: 'https://bakery.example/api',
  fetch: globalThis.fetch,
  fetchOptions: { credentials: 'include' },
  timeout: 30_000
})

api.headers.set('Authorization', 'Bearer bakery-demo-token')

const result = await api.get('articles/42', {
  fetchOptions: { cache: 'no-store' },
  headers: { 'X-Request-Source': 'recipe-editor' }
})

result.headers?.get('content-type') // 'application/vnd.api+json'
```

The client generates method, headers, and serialized body. `fetchOptions` cannot
override them. Per-request headers do not change client defaults. Set `timeout: 0`
to disable the timer, or pass `fetchOptions.signal` to cancel a request.

HTTP and JSON parsing failures throw `KitsuNativeError`, preserving the original
`Response`, status, headers, JSON:API document, errors, and parsing cause.
Network and cancellation errors propagate from Fetch. See the
[Axios-to-Fetch migration guide](MIGRATING.md) for interceptors, options, and errors.

[More Examples]

For kitsu.app's API, its [API docs][kitsu.app api docs] list resources, attributes,
and relationships. Shared kitsu examples use the same resource methods; change
the import to `kitsu-native` and follow migration guidance for transport options.

## Contributing

See [CONTRIBUTING]

## Releases

See [CHANGELOG]

## License

All code released under [MIT]

[promise]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises

[more examples]: https://github.com/wopian/kitsu/tree/master/packages/kitsu/example

[kitsu.app api docs]: https://kitsu.docs.apiary.io

[changelog]: https://github.com/wopian/kitsu/blob/master/packages/kitsu-native/CHANGELOG.md

[contributing]: https://github.com/wopian/kitsu/blob/master/CONTRIBUTING.md

[mit]: https://github.com/wopian/kitsu/blob/master/LICENSE.md

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

*   [Kitsu](#kitsu)
    *   [Parameters](#parameters)
    *   [Examples](#examples)
    *   [get](#get)
        *   [Parameters](#parameters-1)
    *   [patch](#patch)
        *   [Parameters](#parameters-2)
    *   [post](#post)
        *   [Parameters](#parameters-3)
    *   [delete](#delete)
        *   [Parameters](#parameters-4)
    *   [self](#self)
        *   [Parameters](#parameters-5)
    *   [request](#request)
        *   [Parameters](#parameters-6)
*   [KitsuNativeError](#kitsunativeerror)
    *   [Parameters](#parameters-7)

### Kitsu

JSON:API client using native fetch, with kitsu resource methods and aliases.

#### Parameters

*   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** Client options; fetch defaults to globalThis.fetch (optional, default `{}`)

    *   `options.attributeCase` **(`"none"` | `"kebab"` | `"snake"`)** Convert resource attribute names to camelCase on reads and selected wire case on writes. Nested JSON, relationships, and queries stay unchanged. (optional, default `none`)

#### Examples

```javascript
const api = new Kitsu({ baseURL: 'https://kitsu.app/api/edge' })
const response = await api.get('anime')
```

#### get

Fetch resources.

##### Parameters

*   `model` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Resource path
*   `config` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** Request options (optional, default `{}`)

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)>** Decoded document with HTTP status and headers

#### patch

Update resources or relationship linkage.

##### Parameters

*   `model` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Resource path
*   `body` **([Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object) | [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)> | null)** Flat resources or identifiers
*   `config` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** Request options (optional, default `{}`)

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)>** Decoded response

#### post

Create resources or add relationship linkage.

##### Parameters

*   `model` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Resource path
*   `body` **([Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object) | [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)> | null)** Flat resources or identifiers
*   `config` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** Request options (optional, default `{}`)

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)>** Decoded response

#### delete

Delete resources or remove relationship identifiers.

##### Parameters

*   `model` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Resource path
*   `id` **([string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) | [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array))** Resource identifiers
*   `config` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** Request options (optional, default `{}`)

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)>** Decoded response

#### self

Fetch authenticated user.

##### Parameters

*   `config` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** Request options (optional, default `{}`)

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)>** First user with HTTP metadata

#### request

Send an arbitrary JSON:API request.

##### Parameters

*   `config` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Request, document and fetch options

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)>** Decoded document with HTTP status and headers

### KitsuNativeError

**Extends Error**

HTTP and JSON parsing failures retain the original fetch response and JSON:API document.

#### Parameters

*   `message` &#x20;
*   `response` &#x20;
*   `document` &#x20;
*   `options` &#x20;
