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
        *   [Examples](#examples-1)
    *   [patch](#patch)
        *   [Parameters](#parameters-2)
        *   [Examples](#examples-2)
    *   [post](#post)
        *   [Parameters](#parameters-3)
        *   [Examples](#examples-3)
    *   [delete](#delete)
        *   [Parameters](#parameters-4)
        *   [Examples](#examples-4)
    *   [self](#self)
        *   [Parameters](#parameters-5)
        *   [Examples](#examples-5)
    *   [request](#request)
        *   [Parameters](#parameters-6)
        *   [Examples](#examples-6)
*   [KitsuNativeError](#kitsunativeerror)
    *   [Parameters](#parameters-7)
    *   [Properties](#properties)
    *   [Examples](#examples-7)
    *   [status](#status)
        *   [Examples](#examples-8)
    *   [headers](#headers)
        *   [Examples](#examples-9)
    *   [errors](#errors)
        *   [Examples](#examples-10)
*   [FetchOptions](#fetchoptions)
    *   [Examples](#examples-11)
*   [RequestConfig](#requestconfig)
    *   [Properties](#properties-1)
    *   [Examples](#examples-12)
*   [KitsuNativeOptions](#kitsunativeoptions)
    *   [Properties](#properties-2)
    *   [Examples](#examples-13)
*   [ArbitraryRequest](#arbitraryrequest)
    *   [Properties](#properties-3)
    *   [Examples](#examples-14)
*   [KitsuNativeResponse](#kitsunativeresponse)
    *   [Properties](#properties-4)
    *   [Examples](#examples-15)

### Kitsu

JSON:API client using native Fetch in browsers, Node and Bun.

Constructor options configure defaults. Pass params and document per request;
constructor params and document are accepted by the type but ignored.

#### Parameters

*   `options` **[KitsuNativeOptions](#kitsunativeoptions)** Client defaults; see typed properties and individual examples in KitsuNativeOptions (optional, default `{}`)

    *   `options.baseURL` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** API base URL for relative resource paths (optional, default `'https://kitsu.app/api/edge'`)
    *   `options.headers` **HeadersInit?** Default headers. Accept and Content-Type initially use application/vnd.api+json. Media parameters and Accept alternatives are preserved.
    *   `options.query` **(`"traditional"` | `"modern"` | function (JsonObject?): [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String))** Traditional mode repeats array keys. Modern mode uses key\[]. A callback returns an encoded query string without ?. (optional, default `'traditional'`)
    *   `options.camelCaseTypes` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Convert inferred outgoing types to camelCase; decoded types stay unchanged (optional, default `true`)
    *   `options.resourceCase` **(`"kebab"` | `"snake"` | `"none"`)** Generated URL case: library-entries, library\_entries, or libraryEntries (optional, default `'kebab'`)
    *   `options.attributeCase` **(`"kebab"` | `"snake"` | `"none"`)** Keep attribute names by default. kebab and snake encode that case and decode camelCase. Nested JSON, relationships, metadata, extension attributes and queries stay unchanged. (optional, default `'none'`)
    *   `options.pluralize` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Pluralize generated resource URLs and inferred outgoing types (optional, default `true`)
    *   `options.timeout` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Timeout in milliseconds. Set 0 to disable. Combines with caller cancellation. (optional, default `30000`)
    *   `options.hoistData` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Unwrap a single-resource document containing only data. Document metadata and included keep the wrapper; HTTP arrays and null stay under data. Resource metadata stays under $. (optional, default `false`)
    *   `options.fetchOptions` **[FetchOptions](#fetchoptions)?** Default native RequestInit options, excluding method, headers and body. Request options win.
    *   `options.fetch` **function (([string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | [URL](https://developer.mozilla.org/docs/Web/API/URL/URL) | [Request](https://developer.mozilla.org/Add-ons/SDK/High-Level_APIs/request)), RequestInit?): [Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[Response](https://developer.mozilla.org/docs/Web/Guide/HTML/HTML5)>** Inject transport. api.fetch remains an alias for api.get. (optional, default `globalThis.fetch`)
    *   `options.params` **JsonObject?** Ignored at construction; pass config.params to a method
    *   `options.document` **JsonApiDocument?** Ignored at construction; pass config.document on writes

#### Examples

Configure every constructor option

```javascript
import Kitsu from 'kitsu-native'
const api = new Kitsu({
  baseURL: 'https://bakery.example/api',
  headers: { Authorization: 'Bearer bakery-demo-token' },
  query: 'modern',
  camelCaseTypes: false,
  resourceCase: 'snake',
  attributeCase: 'kebab',
  pluralize: false,
  timeout: 10000,
  hoistData: false,
  fetch: (input, init) => globalThis.fetch(input, init),
  fetchOptions: { credentials: 'include', cache: 'no-store' }
})
await api.get('article', { params: { include: 'author' } })
```

Attribute casing enabled and disabled

```javascript
const unchanged = new Kitsu({ attributeCase: 'none' })
const converted = new Kitsu({ attributeCase: 'kebab' })
await unchanged.post('people', { firstName: 'Mina' }) // attributes: { firstName: 'Mina' }
await converted.post('people', { firstName: 'Mina' }) // attributes: { 'first-name': 'Mina' }
// For a response with attributes: { 'first-name': 'Mina' }:
// unchanged.get('people/9') keeps data['first-name']; converted.get('people/9') gives data.firstName.
```

Document metadata, resource metadata, and hoisting

```javascript
const wrapped = new Kitsu({ hoistData: false })
const hoisted = new Kitsu({ hoistData: true })
// Server body: { data: { type: 'people', id: '9', meta: { editable: true } } }
const first = await wrapped.get('people/9')
console.log(first.data.$.meta.editable) // true
const second = await hoisted.get('people/9')
console.log(second.$.meta.editable) // true; status and headers remain available
// If that body also contains meta: { total: 1 }, both clients retain data:
// result.meta.total describes the document; result.data.$.meta.editable describes the person.
```

Custom query serializer

```javascript
const custom = new Kitsu({
  query: (params) => new URLSearchParams({ title: String(params?.title ?? '') }).toString()
})
await custom.get('articles', { params: { title: 'Moonlight Bread' } })
// URL ends with ?title=Moonlight+Bread
```

#### get

Fetch a resource, collection, related resources, or relationship linkage. Alias: fetch.

##### Parameters

*   `model` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Resource path: articles, articles/42, articles/42/author, or articles/42/relationships/author
*   `config` **[RequestConfig](#requestconfig)** Per-request options (optional, default `{}`)

    *   `config.headers` **HeadersInit?** Override default headers without changing client defaults
    *   `config.params` **JsonObject?** Encoded query parameters: include, fields, sort, page, filter and extension families.
    *   `config.document` **JsonApiDocument?** Ignored by this read method; use document on writes.
    *   `config.fetchOptions` **[FetchOptions](#fetchoptions)?** Native RequestInit overrides. Request options win over constructor defaults; generated method, headers and body remain authoritative. Use signal for cancellation.

##### Examples

```javascript
await api.get('articles', {
  headers: { 'Accept-Language': 'en' },
  params: { include: 'author', fields: { articles: 'title,author' }, sort: '-createdAt', page: { number: 2, size: 10 }, filter: { title: 'Bread' } },
  fetchOptions: { cache: 'no-store', signal: new AbortController().signal }
})
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[KitsuNativeResponse](#kitsunativeresponse)>** Decoded document with HTTP details

#### patch

Update a resource or replace relationship linkage. Alias: update.

##### Parameters

*   `model` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Resource or relationship path. With a bare resource name, body.id is appended to the URL.
*   `body` **(JsonObject | [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)\<JsonObject> | null)** Flat resources or relationship identifiers. Use null to clear to-one linkage at a relationship endpoint.
*   `config` **[RequestConfig](#requestconfig)** Per-request options (optional, default `{}`)

    *   `config.headers` **HeadersInit?** Override default headers without changing client defaults
    *   `config.params` **JsonObject?** Encoded query parameters: include, fields, sort, page, filter and extension families.
    *   `config.document` **JsonApiDocument?** Extra write document members: meta, links, jsonapi, included and extensions. No data or errors. Ignored by bodyless resource DELETE.
    *   `config.fetchOptions` **[FetchOptions](#fetchoptions)?** Native RequestInit overrides. Request options win over constructor defaults; generated method, headers and body remain authoritative. Use signal for cancellation.

##### Examples

Resource and document metadata

```javascript
await api.patch('articles', {
  id: '42', title: 'Moonlight Bread', $: { meta: { editable: true } }
}, { document: { meta: { requestId: 'demo-42' } } })
```

Clear relationships

```javascript
await api.patch('articles/42/relationships/author', null)
await api.patch('articles/42/relationships/tags', [])
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[KitsuNativeResponse](#kitsunativeresponse)>** Decoded response with HTTP details

#### post

Create resources or add relationship linkage. Alias: create. Resource arrays require server support; no Atomic Operations processing.

##### Parameters

*   `model` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Resource or relationship path
*   `body` **(JsonObject | [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)\<JsonObject> | null)** Flat resources or relationship identifiers; full related resources generate included
*   `config` **[RequestConfig](#requestconfig)** Per-request options (optional, default `{}`)

    *   `config.headers` **HeadersInit?** Override default headers without changing client defaults
    *   `config.params` **JsonObject?** Encoded query parameters: include, fields, sort, page, filter and extension families.
    *   `config.document` **JsonApiDocument?** Extra write document members: meta, links, jsonapi, included and extensions. No data or errors. Ignored by bodyless resource DELETE.
    *   `config.fetchOptions` **[FetchOptions](#fetchoptions)?** Native RequestInit overrides. Request options win over constructor defaults; generated method, headers and body remain authoritative. Use signal for cancellation.

##### Examples

```javascript
await api.post('articles', { title: 'Moonlight Bread', author: { type: 'people', id: '9' } }, {
  document: { meta: { requestId: 'demo-42' } }
})
await api.post('articles/42/relationships/tags', [{ type: 'tags', id: '3' }])
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[KitsuNativeResponse](#kitsunativeresponse)>** Decoded response with HTTP details

#### delete

Delete a resource or remove relationship identifiers. Alias: remove. Resource DELETE sends no body.
Relationship DELETE sends identifiers without appending their IDs to the URL. Legacy bulk resource DELETE requires server support.

##### Parameters

*   `model` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Resource name or relationship path. For a resource, pass its ID separately.
*   `id` **([string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) | [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<([string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number))>)** Resource ID, including 0, or IDs for relationship/bulk deletion
*   `config` **[RequestConfig](#requestconfig)** Per-request options (optional, default `{}`)

    *   `config.headers` **HeadersInit?** Override default headers without changing client defaults
    *   `config.params` **JsonObject?** Encoded query parameters: include, fields, sort, page, filter and extension families.
    *   `config.document` **JsonApiDocument?** Extra write document members: meta, links, jsonapi, included and extensions. No data or errors. Ignored by bodyless resource DELETE.
    *   `config.fetchOptions` **[FetchOptions](#fetchoptions)?** Native RequestInit overrides. Request options win over constructor defaults; generated method, headers and body remain authoritative. Use signal for cancellation.

##### Examples

```javascript
await api.delete('articles', '42') // DELETE /articles/42; no body
await api.delete('articles/42/relationships/tags', ['3'], { document: { meta: { requestId: 'demo-42' } } })
// DELETE /articles/42/relationships/tags; body: { data: [{ type: 'tags', id: '3' }] }
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[KitsuNativeResponse](#kitsunativeresponse)>** Decoded response; empty responses retain HTTP details

#### self

Fetch the first authenticated user. Server must support filter\[self]=true; supplied filter is replaced.

##### Parameters

*   `config` **[RequestConfig](#requestconfig)** Per-request options (optional, default `{}`)

    *   `config.headers` **HeadersInit?** Override default headers without changing client defaults
    *   `config.params` **JsonObject?** Encoded query parameters: include, fields, sort, page, filter and extension families. self() replaces filter with { self: true }.
    *   `config.document` **JsonApiDocument?** Ignored by this read method; use document on writes.
    *   `config.fetchOptions` **[FetchOptions](#fetchoptions)?** Native RequestInit overrides. Request options win over constructor defaults; generated method, headers and body remain authoritative. Use signal for cancellation.

##### Examples

```javascript
const result = await api.self({ headers: { Authorization: 'Bearer bakery-demo-token' }, params: { fields: { users: 'name' } } })
console.log(result.data?.name)
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[KitsuNativeResponse](#kitsunativeresponse)>** First user with HTTP details

#### request

Send an arbitrary JSON:API request without generated URL casing or pluralization.

##### Parameters

*   `config` **[ArbitraryRequest](#arbitraryrequest)** Request options; inherits all RequestConfig members

    *   `config.url` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Relative or absolute URL, used as supplied
    *   `config.method` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** HTTP method, case-insensitive; commonly GET, POST, PATCH or DELETE (optional, default `'GET'`)
    *   `config.type` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** Encoding type; may be omitted when body supplies type or no body is sent
    *   `config.body` **(JsonObject | [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)\<JsonObject> | null)** Flat data or relationship identifiers. GET and resource DELETE send no body. (optional, default `{}`)
    *   `config.relationship` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)?** Encode primary data as identifiers. Defaults to whether url contains /relationships/.
    *   `config.headers` **HeadersInit?** Per-request header overrides
    *   `config.params` **JsonObject?** Query parameters, including nested JSON:API families and extension parameters
    *   `config.document` **JsonApiDocument?** Additional document members for body-bearing requests; no data or errors
    *   `config.fetchOptions` **[FetchOptions](#fetchoptions)?** Native RequestInit overrides. Request options win over constructor defaults; generated method, headers and body remain authoritative. Use signal for cancellation.

##### Examples

Custom relationship endpoint

```javascript
await api.request({
  method: 'PATCH', url: 'articles/42/byline', type: 'people', relationship: true,
  body: { id: '9' }, headers: { 'Accept-Language': 'en' }, params: { include: 'author' },
  document: { meta: { requestId: 'demo-42' } },
  fetchOptions: { credentials: 'include' }
})
```

Bodyless resource DELETE

```javascript
await api.request({ method: 'DELETE', url: 'articles/42' })
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[KitsuNativeResponse](#kitsunativeresponse)>** Decoded document with HTTP details

### KitsuNativeError

**Extends Error**

HTTP and JSON parsing failures retain the original fetch response and JSON:API document.

#### Parameters

*   `message` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Error message
*   `response` **[Response](https://developer.mozilla.org/docs/Web/Guide/HTML/HTML5)** Original native Fetch response, including HTTP status and headers
*   `document` **JsonApiDocument?** Parsed JSON:API error document, when available
*   `options` **ErrorOptions?** Native Error constructor options

    *   `options.cause` **any?** Underlying cause, such as the SyntaxError from an invalid JSON response

#### Properties

*   `status` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** HTTP status copied from response
*   `headers` **[Headers](https://developer.mozilla.org/docs/Web/HTML/Element/header)** Native response headers
*   `errors` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)\<JsonApiError>?** JSON:API errors from document.errors
*   `response` **[Response](https://developer.mozilla.org/docs/Web/Guide/HTML/HTML5)** Original native Fetch response
*   `document` **JsonApiDocument?** Parsed error document, including document metadata

#### Examples

Handle HTTP and response-parsing errors

```javascript
import Kitsu, { KitsuNativeError } from 'kitsu-native'
const api = new Kitsu({ baseURL: 'https://bakery.example/api' })
try {
  await api.get('articles/42')
} catch (error) {
  if (error instanceof KitsuNativeError) {
    console.log(error.status, error.headers.get('content-type'))
    console.log(error.errors, error.document?.meta, error.cause)
  } else {
    throw error // Native network and abort errors propagate unchanged.
  }
}
```

Preserve a parsing cause

```javascript
const response = new Response('invalid JSON', { status: 200 })
const error = new KitsuNativeError('Invalid JSON response', response, undefined, {
  cause: new SyntaxError('Invalid JSON')
})
```

#### status

HTTP status copied from response.

##### Examples

```javascript
422
```

#### headers

Native Headers from response, without conversion to a plain object.

##### Examples

```javascript
error.headers.get('content-type')
```

#### errors

JSON:API errors from document.errors, absent for malformed JSON.

##### Examples

```javascript
[{ status: '422', source: { header: 'Accept' } }]
```

### FetchOptions

Native RequestInit excluding method, headers and body. Includes credentials (omit, same-origin, include), cache (default, no-store, reload, no-cache, force-cache, only-if-cached), redirect (follow, error, manual), mode (cors, no-cors, same-origin, navigate), signal, integrity, keepalive, referrer, referrerPolicy and other platform RequestInit fields. Omitted fields use Fetch defaults. Request fields shallowly override constructor fields.
TypeScript: `Omit<RequestInit, 'method' | 'headers' | 'body'>`.

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

#### Examples

```javascript
const options = { credentials: 'include', cache: 'no-store', redirect: 'error', signal: new AbortController().signal };
```

### RequestConfig

Per-request options. headers and transport options also configure constructor defaults. params and document apply only per request.

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

#### Properties

*   `document` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** Extra top-level members for writes: meta, links, jsonapi, included and extensions. Default: none. included contains wire resources. Generated data cannot be replaced; data and errors throw. Ignored by GET and bodyless resource DELETE. Constructor document is not applied. TypeScript: `Omit<JsonApiDocument, 'data'>`. Example: `{ meta: { requestId: 'demo-42' }, jsonapi: { version: '1.1' } }`.
*   `headers` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** Request headers as Headers, a name/value object, or pairs. Default: client headers. Request values override matching defaults without changing client defaults. Accept and Content-Type initially use application/vnd.api+json; media parameters and Accept alternatives are retained. TypeScript: `RequestInit['headers']`. Example: `{ Authorization: 'Bearer bakery-demo-token' }`.
*   `params` **JsonObject?** Query parameters, including include, fields, sort, page, filter and extension families. Default: none. Encoded by the selected query serializer. Empty include and field strings are retained. Constructor params are not applied. TypeScript: `JsonObject`. Example: `{ include: 'author', fields: { articles: 'title,author' }, sort: '-createdAt', page: { number: 2, size: 10 }, filter: { title: 'Bread' } }`.
*   `fetchOptions` **[FetchOptions](#fetchoptions)?** Native RequestInit defaults or per-request overrides. Default: none. Request options shallowly override constructor options. method, headers and body are generated afterward and cannot be supplied here. A request signal replaces the default signal and combines with the timeout. TypeScript: `FetchOptions`. Example: `{ credentials: 'include', cache: 'no-store', signal: new AbortController().signal }`.

#### Examples

```javascript
const config = { params: { include: 'author' }, fetchOptions: { cache: 'no-store' } };
```

### KitsuNativeOptions

Client defaults, including inherited headers and transport options from RequestConfig. Inherited params and document are accepted by the type but ignored by the constructor; pass them per request.

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

#### Properties

*   `document` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** Extra top-level members for writes: meta, links, jsonapi, included and extensions. Default: none. included contains wire resources. Generated data cannot be replaced; data and errors throw. Ignored by GET and bodyless resource DELETE. Constructor document is not applied. TypeScript: `Omit<JsonApiDocument, 'data'>`. Example: `{ meta: { requestId: 'demo-42' }, jsonapi: { version: '1.1' } }`.
*   `headers` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** Request headers as Headers, a name/value object, or pairs. Default: client headers. Request values override matching defaults without changing client defaults. Accept and Content-Type initially use application/vnd.api+json; media parameters and Accept alternatives are retained. TypeScript: `RequestInit['headers']`. Example: `{ Authorization: 'Bearer bakery-demo-token' }`.
*   `params` **JsonObject?** Query parameters, including include, fields, sort, page, filter and extension families. Default: none. Encoded by the selected query serializer. Empty include and field strings are retained. Constructor params are not applied. TypeScript: `JsonObject`. Example: `{ include: 'author', fields: { articles: 'title,author' }, sort: '-createdAt', page: { number: 2, size: 10 }, filter: { title: 'Bread' } }`.
*   `fetchOptions` **[FetchOptions](#fetchoptions)?** Native RequestInit defaults or per-request overrides. Default: none. Request options shallowly override constructor options. method, headers and body are generated afterward and cannot be supplied here. A request signal replaces the default signal and combines with the timeout. TypeScript: `FetchOptions`. Example: `{ credentials: 'include', cache: 'no-store', signal: new AbortController().signal }`.
*   `baseURL` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** API base URL for relative paths. Default: <https://kitsu.app/api/edge>. TypeScript: `string`. Example: `'https://bakery.example/api'`.
*   `query` **(`"traditional"` | `"modern"` | function (JsonObject?): [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String))?** Query serializer. Default: 'traditional' repeats array keys. 'modern' uses bracketed keys (tag\[]). A callback receives parameters and returns an encoded query string without ?. No parameter casing conversion. TypeScript: `'traditional' | 'modern' | ((params?: JsonObject) => string)`. Example: `(params) => new URLSearchParams({ title: String(params?.title ?? '') }).toString()`.
*   `camelCaseTypes` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)?** Convert inferred outgoing resource types from kebab-case or snake\_case to camelCase. Default: true. Does not change decoded types. TypeScript: `boolean`. Example: `false`.
*   `resourceCase` **(`"kebab"` | `"snake"` | `"none"`)?** Generated resource URL case. Default: 'kebab' (library-entries). 'snake' gives library\_entries; 'none' keeps libraryEntries. Explicit request() URLs are unchanged. TypeScript: `'kebab' | 'snake' | 'none'`. Example: `'snake'`.
*   `attributeCase` **(`"kebab"` | `"snake"` | `"none"`)?** Attribute wire case. Default: 'none' keeps names unchanged. 'kebab' or 'snake' encodes that case and decodes camelCase. Nested JSON, relationships, metadata, extension attributes and queries stay unchanged. Converted name collisions throw TypeError. TypeScript: `'kebab' | 'snake' | 'none'`. Example: `'kebab'`.
*   `pluralize` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)?** Pluralize generated resource URLs and inferred outgoing types. Default: true. Disable for APIs using singular names. TypeScript: `boolean`. Example: `false`.
*   `timeout` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)?** Request timeout in milliseconds. Default: 30000. Set 0 to disable. Caller cancellation and timeout both cancel the request; timer is cleared after completion. TypeScript: `number`. Example: `10000`.
*   `hoistData` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)?** Unwrap a single-resource document containing only data. Default: false. Resource metadata stays in $. Document meta, links, jsonapi or included keep the wrapper. HTTP arrays and null stay under data. TypeScript: `boolean`. Example: `true`.
*   `fetch` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** Injected Fetch-compatible transport. Default: globalThis.fetch. Keep the Fetch signature and return a Promise<Response>. Does not replace api.fetch, which remains a get alias. TypeScript: `typeof globalThis.fetch`. Example: `(input, init) => globalThis.fetch(input, init)`.

#### Examples

```javascript
const options = { baseURL: 'https://bakery.example/api', attributeCase: 'kebab', timeout: 10000 };
```

### ArbitraryRequest

Arbitrary request options plus all RequestConfig fields. Generated JSON:API bodies use flat resources and direct relationship values.

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

#### Properties

*   `document` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** Extra top-level members for writes: meta, links, jsonapi, included and extensions. Default: none. included contains wire resources. Generated data cannot be replaced; data and errors throw. Ignored by GET and bodyless resource DELETE. Constructor document is not applied. TypeScript: `Omit<JsonApiDocument, 'data'>`. Example: `{ meta: { requestId: 'demo-42' }, jsonapi: { version: '1.1' } }`.
*   `headers` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** Request headers as Headers, a name/value object, or pairs. Default: client headers. Request values override matching defaults without changing client defaults. Accept and Content-Type initially use application/vnd.api+json; media parameters and Accept alternatives are retained. TypeScript: `RequestInit['headers']`. Example: `{ Authorization: 'Bearer bakery-demo-token' }`.
*   `params` **JsonObject?** Query parameters, including include, fields, sort, page, filter and extension families. Default: none. Encoded by the selected query serializer. Empty include and field strings are retained. Constructor params are not applied. TypeScript: `JsonObject`. Example: `{ include: 'author', fields: { articles: 'title,author' }, sort: '-createdAt', page: { number: 2, size: 10 }, filter: { title: 'Bread' } }`.
*   `fetchOptions` **[FetchOptions](#fetchoptions)?** Native RequestInit defaults or per-request overrides. Default: none. Request options shallowly override constructor options. method, headers and body are generated afterward and cannot be supplied here. A request signal replaces the default signal and combines with the timeout. TypeScript: `FetchOptions`. Example: `{ credentials: 'include', cache: 'no-store', signal: new AbortController().signal }`.
*   `relationship` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)?** Encode the body as relationship identifiers. Default: whether url contains /relationships/. Set explicitly for custom relationship endpoints. Direct values control linkage. TypeScript: `boolean`. Example: `true`.
*   `url` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Relative or absolute URL. Required. Used as supplied; resourceCase and pluralize do not rewrite this URL. TypeScript: `string`. Example: `'articles/42/relationships/author'`.
*   `type` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** Resource type for encoding the body. May be omitted when the body supplies type. Not needed for bodyless GET or resource DELETE. TypeScript: `string`. Example: `'people'`.
*   `body` **(JsonObject | [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)\<JsonObject> | null)?** Flat resource, array of resources, or null for to-one relationship clearing. Default: empty data on body-bearing requests. GET and resource DELETE send no body. Put resource metadata under $; document metadata belongs in document. TypeScript: `JsonObject | JsonObject[] | null`. Example: `{ type: 'articles', id: '42', title: 'Moonlight Bread', $: { meta: { editable: true } } }`.
*   `method` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** HTTP method, case-insensitive. Default: GET. Common values are GET, POST, PATCH and DELETE; other method strings are passed to the transport. TypeScript: `string`. Example: `'PATCH'`.

#### Examples

```javascript
const request = { method: 'PATCH', url: 'articles/42', type: 'articles', body: { id: '42', title: 'Moonlight Bread' } };
```

### KitsuNativeResponse

Decoded JSON:API document with HTTP details. T describes primary data, not the surrounding document.
Additional members (`[attribute: string]: any;`): Other decoded document members, such as included, jsonapi, errors and extension members. With hoistData enabled, single-resource fields can appear here. TypeScript: `any`. Example: `{ jsonapi: { version: '1.1' } }`.

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

#### Properties

*   `data` **T?** Decoded primary data with flat attributes and direct relationships. Absent after single-resource hoisting or for empty responses. TypeScript: `T`. Example: `{ type: 'articles', id: '42', title: 'Moonlight Bread' }`.
*   `status` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** HTTP response status, including empty 202/204 responses. TypeScript: `number`. Example: `200`.
*   `headers` **[Headers](https://developer.mozilla.org/docs/Web/HTML/Element/header)?** Native response Headers, omitted when empty. Read values with headers.get(name). TypeScript: `Headers`. Example: `new Headers({ 'content-type': 'application/vnd.api+json' })`.
*   `links` **JsonObject?** Document links beside data. Resource links live under resource.$.links. TypeScript: `JsonObject`. Example: `{ next: '/articles?page[number]=2' }`.
*   `meta` **JsonObject?** Document metadata beside data. Resource metadata lives under resource.$.meta. TypeScript: `JsonObject`. Example: `{ total: 42 }`.

#### Examples

```javascript
const result = { status: 200, data: { title: 'Moonlight Bread' } };
```
