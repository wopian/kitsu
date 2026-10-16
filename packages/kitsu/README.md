<h1 align=center>Kitsu</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/kitsu"><img alt="kitsu on npm" src="https://flat.badgen.net/npm/v/kitsu?label=kitsu"></a>
  <a href="https://www.npmjs.com/package/kitsu"><img alt="kitsu monthly downloads" src="https://flat.badgen.net/npm/dm/kitsu"></a>
  <a href="https://packagephobia.com/result?p=kitsu"><img alt="Published kitsu installed size including dependencies" src="https://flat.badgen.net/packagephobia/install/kitsu"></a>
  <a href="https://www.npmjs.com/package/kitsu"><img alt="TypeScript declarations included" src="https://flat.badgen.net/npm/types/kitsu"></a>
</p>

<p align="center">
  <a href="https://github.com/wopian/kitsu/actions"><img alt="GitHub checks" src="https://flat.badgen.net/github/checks/wopian/kitsu/master"></a>
  <a href="https://github.com/wopian/kitsu/blob/master/LICENSE.md"><img alt="MIT license" src="https://flat.badgen.net/github/license/wopian/kitsu"></a>
  <a href="https://github.com/wopian/kitsu/network/dependents"><img alt="Dependent repositories" src="https://flat.badgen.net/github/dependents-repo/wopian/kitsu"></a>
  <a href="https://github.com/wopian/kitsu/graphs/contributors"><img alt="Contributors" src="https://flat.badgen.net/github/contributors/wopian/kitsu"></a>
  <a href="https://github.com/sponsors/wopian"><img alt="Sponsor this project" src="https://flat.badgen.net/static/sponsor/%E2%9D%A4/pink?icon=github"></a>
</p>

<p align="center">
  <a href="https://jsonapi.org/format/1.1/"><img alt="JSON:API 1.1 client support" src="https://flat.badgen.net/static/JSON%3AAPI/1.1/blue"></a>
  <a href="package.json"><img alt="Node.js 22, 24, and 26 or newer" src="https://flat.badgen.net/static/node/22%20%7C%2024%20%7C%2026%2B/green"></a>
  <a href="../../.github/workflows/ci.yml"><img alt="Tested with Bun" src="https://flat.badgen.net/static/Bun/tested/blue?icon=bun"></a>
  <a href="src/types.ts"><img alt="TypeScript declarations included" src="https://flat.badgen.net/static/types/included/blue?icon=typescript"></a>
  <a href="package.json"><img alt="ECMAScript modules" src="https://flat.badgen.net/static/module/ESM/blue"></a>
</p>

<p align=center>A simple, lightweight & framework agnostic <a href=http://jsonapi.org>JSON:API</a> client using Axios</p>

<p align=center><a href=https://github.com/wopian/kitsu/blob/master/packages/kitsu/MIGRATING.md>Migration guide</a> for v13 & previous major releases</p>

#

## JSON:API 1.1

Relationships are direct resources, arrays, or null. Resource metadata lives under `$`; document metadata stays at document level. See [migration guidance](MIGRATING.md) and [compliance boundaries](../../specification/compliance/README.md).

## Features

*   JSON:API 1.1 client document support
*   Automatically links relationships to data
*   Works in Node & browsers
*   Uses the [Promise] API

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

```typescript
const result = {
  data: {
    id: '1',
    type: 'articles',
    title: 'JSON API paints my bikeshed',
    author: { id: '42', type: 'people', name: 'John' }
  },
  included: [{ id: '42', type: 'people', name: 'John' }]
}
// data.author and included[0] reference the same object.
```

</details>

## Install

### Bun / npm / Yarn

```bash
bun add kitsu
npm install kitsu
yarn add kitsu
```

```typescript
import Kitsu from "kitsu";
```

## Quick Start

```typescript
import Kitsu from 'kitsu'

// kitsu.app's API
const defaultApi = new Kitsu()

// Other JSON:API servers
const api = new Kitsu({
  baseURL: 'https://api.example/2'
})

// Using with async/await
interface Anime {
  id: string
  type: 'anime'
  canonicalTitle: string
}
const result = await api.get<Anime[]>('anime')
console.log(result.data?.[0]?.canonicalTitle)

// Using with Promises
api.get('anime')
  .then(result => console.log(result.data))
  .catch((error: unknown) => console.error(error))

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

If you're working with [kitsu.app]'s API, their [API docs][kitsu.app api docs] lists all available resources with their attributes & relationships

## Contributing

See [CONTRIBUTING]

## Releases

See [CHANGELOG]

## License

All code released under [MIT]

[kitsu.app]: https://kitsu.app

[json:api]: http://jsonapi.org

[promise]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises

[more examples]: https://github.com/wopian/kitsu/tree/master/packages/kitsu/example

[kitsu.app api docs]: https://kitsu.docs.apiary.io

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
    *   [plural](#plural)
        *   [Examples](#examples-7)
    *   [headers](#headers)
        *   [Examples](#examples-8)
    *   [interceptors](#interceptors)
        *   [Examples](#examples-9)
*   [RequestConfig](#requestconfig)
    *   [Properties](#properties)
    *   [Examples](#examples-10)
*   [KitsuOptions](#kitsuoptions)
    *   [Properties](#properties-1)
    *   [Examples](#examples-11)
*   [ArbitraryRequest](#arbitraryrequest)
    *   [Properties](#properties-2)
    *   [Examples](#examples-12)
*   [KitsuResponse](#kitsuresponse)
    *   [Properties](#properties-3)
    *   [Examples](#examples-13)

### Kitsu

JSON:API client using Axios, including adapters and interceptors.

Constructor options configure defaults. Pass params and document per request;
constructor params and document are accepted by the type but ignored.

#### Parameters

*   `options` **[KitsuOptions](#kitsuoptions)** Client defaults; see typed properties and individual examples in KitsuOptions (optional, default `{}`)

    *   `options.baseURL` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** API base URL for relative resource paths (optional, default `'https://kitsu.app/api/edge'`)
    *   `options.headers` **JsonObject?** Default headers. Accept and Content-Type initially use application/vnd.api+json. Media parameters and Accept alternatives are preserved.
    *   `options.query` **(`"traditional"` | `"modern"` | function (JsonObject?): [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String))** Traditional mode repeats array keys. Modern mode uses key\[]. A callback returns an encoded query string without ?. (optional, default `'traditional'`)
    *   `options.camelCaseTypes` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Convert inferred outgoing types to camelCase; decoded types stay unchanged (optional, default `true`)
    *   `options.resourceCase` **(`"kebab"` | `"snake"` | `"none"`)** Generated URL case: library-entries, library\_entries, or libraryEntries (optional, default `'kebab'`)
    *   `options.attributeCase` **(`"kebab"` | `"snake"` | `"none"`)** Keep attribute names by default. kebab and snake encode that case and decode camelCase. Nested JSON, relationships, metadata, extension attributes and queries stay unchanged. (optional, default `'none'`)
    *   `options.pluralize` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Pluralize generated resource URLs and inferred outgoing types (optional, default `true`)
    *   `options.timeout` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Timeout in milliseconds. Top-level 0 also selects 30000; use axiosOptions.timeout: 0 to disable. (optional, default `30000`)
    *   `options.hoistData` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Unwrap a single-resource document containing only data. Document metadata and included keep the wrapper; HTTP arrays and null stay under data. Resource metadata stays under $. (optional, default `false`)
    *   `options.axiosOptions` **AxiosRequestConfig?** Axios defaults, overriding generated baseURL, timeout and paramsSerializer when supplied.
    *   `options.params` **JsonObject?** Ignored at construction; pass config.params to a method
    *   `options.document` **JsonApiDocument?** Ignored at construction; pass config.document on writes

#### Examples

Configure every constructor option

```typescript
import Kitsu, { type KitsuOptions } from 'kitsu'
const options: KitsuOptions = {
  baseURL: 'https://bakery.example/api',
  headers: { Authorization: 'Bearer bakery-demo-token' },
  query: 'modern',
  camelCaseTypes: false,
  resourceCase: 'snake',
  attributeCase: 'kebab',
  pluralize: false,
  timeout: 10000,
  hoistData: false,
  axiosOptions: { withCredentials: true }
}
const api = new Kitsu(options)
await api.get('article', { params: { include: 'author' } })
```

Attribute casing enabled and disabled

```typescript
const unchanged = new Kitsu({ attributeCase: 'none' })
const converted = new Kitsu({ attributeCase: 'kebab' })
await unchanged.post('people', { firstName: 'Mina' }) // attributes: { firstName: 'Mina' }
await converted.post('people', { firstName: 'Mina' }) // attributes: { 'first-name': 'Mina' }
// For a response with attributes: { 'first-name': 'Mina' }:
// unchanged.get('people/9') keeps data['first-name']; converted.get('people/9') gives data.firstName.
```

Document metadata, resource metadata, and hoisting

```typescript
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

```typescript
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

    *   `config.headers` **JsonObject?** Override default headers without changing client defaults
    *   `config.params` **JsonObject?** Encoded query parameters: include, fields, sort, page, filter and extension families.
    *   `config.document` **JsonApiDocument?** Ignored by this read method; use document on writes.
    *   `config.axiosOptions` **AxiosRequestConfig?** Axios overrides, applied after generated headers and params. request() also permits method, url and data overrides. Use signal for cancellation.

##### Examples

```typescript
await api.get('articles', {
  headers: { 'Accept-Language': 'en' },
  params: { include: 'author', fields: { articles: 'title,author' }, sort: '-createdAt', page: { number: 2, size: 10 }, filter: { title: 'Bread' } },
  axiosOptions: { timeout: 10000, signal: new AbortController().signal }
})
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[KitsuResponse](#kitsuresponse)>** Decoded document with HTTP details

#### patch

Update a resource or replace relationship linkage. Alias: update.

##### Parameters

*   `model` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Resource or relationship path. With a bare resource name, body.id is appended to the URL.
*   `body` **(JsonObject | [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)\<JsonObject> | null)** Flat resources or relationship identifiers. Use null to clear to-one linkage at a relationship endpoint.
*   `config` **[RequestConfig](#requestconfig)** Per-request options (optional, default `{}`)

    *   `config.headers` **JsonObject?** Override default headers without changing client defaults
    *   `config.params` **JsonObject?** Encoded query parameters: include, fields, sort, page, filter and extension families.
    *   `config.document` **JsonApiDocument?** Extra write document members: meta, links, jsonapi, included and extensions. No data or errors. Ignored by bodyless resource DELETE.
    *   `config.axiosOptions` **AxiosRequestConfig?** Axios overrides, applied after generated headers and params. request() also permits method, url and data overrides. Use signal for cancellation.

##### Examples

Resource and document metadata

```typescript
await api.patch('articles', {
  id: '42', title: 'Moonlight Bread', $: { meta: { editable: true } }
}, { document: { meta: { requestId: 'demo-42' } } })
```

Clear relationships

```typescript
await api.patch('articles/42/relationships/author', null)
await api.patch('articles/42/relationships/tags', [])
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[KitsuResponse](#kitsuresponse)>** Decoded response with HTTP details

#### post

Create resources or add relationship linkage. Alias: create. Resource arrays require server support; no Atomic Operations processing.

##### Parameters

*   `model` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Resource or relationship path
*   `body` **(JsonObject | [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)\<JsonObject> | null)** Flat resources or relationship identifiers; full related resources generate included
*   `config` **[RequestConfig](#requestconfig)** Per-request options (optional, default `{}`)

    *   `config.headers` **JsonObject?** Override default headers without changing client defaults
    *   `config.params` **JsonObject?** Encoded query parameters: include, fields, sort, page, filter and extension families.
    *   `config.document` **JsonApiDocument?** Extra write document members: meta, links, jsonapi, included and extensions. No data or errors. Ignored by bodyless resource DELETE.
    *   `config.axiosOptions` **AxiosRequestConfig?** Axios overrides, applied after generated headers and params. request() also permits method, url and data overrides. Use signal for cancellation.

##### Examples

```typescript
await api.post('articles', { title: 'Moonlight Bread', author: { type: 'people', id: '9' } }, {
  document: { meta: { requestId: 'demo-42' } }
})
await api.post('articles/42/relationships/tags', [{ type: 'tags', id: '3' }])
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[KitsuResponse](#kitsuresponse)>** Decoded response with HTTP details

#### delete

Delete a resource or remove relationship identifiers. Alias: remove. Resource DELETE sends no body.
Relationship DELETE sends identifiers without appending their IDs to the URL. Legacy bulk resource DELETE requires server support.

##### Parameters

*   `model` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Resource name or relationship path. For a resource, pass its ID separately.
*   `id` **([string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) | [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<([string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number))>)** Resource ID, including 0, or IDs for relationship/bulk deletion
*   `config` **[RequestConfig](#requestconfig)** Per-request options (optional, default `{}`)

    *   `config.headers` **JsonObject?** Override default headers without changing client defaults
    *   `config.params` **JsonObject?** Encoded query parameters: include, fields, sort, page, filter and extension families.
    *   `config.document` **JsonApiDocument?** Extra write document members: meta, links, jsonapi, included and extensions. No data or errors. Ignored by bodyless resource DELETE.
    *   `config.axiosOptions` **AxiosRequestConfig?** Axios overrides, applied after generated headers and params. request() also permits method, url and data overrides. Use signal for cancellation.

##### Examples

```typescript
await api.delete('articles', '42') // DELETE /articles/42; no body
await api.delete('articles/42/relationships/tags', ['3'], { document: { meta: { requestId: 'demo-42' } } })
// DELETE /articles/42/relationships/tags; body: { data: [{ type: 'tags', id: '3' }] }
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[KitsuResponse](#kitsuresponse)>** Decoded response; empty responses retain HTTP details

#### self

Fetch the first authenticated user. Server must support filter\[self]=true; supplied filter is replaced.

##### Parameters

*   `config` **[RequestConfig](#requestconfig)** Per-request options (optional, default `{}`)

    *   `config.headers` **JsonObject?** Override default headers without changing client defaults
    *   `config.params` **JsonObject?** Encoded query parameters: include, fields, sort, page, filter and extension families. self() replaces filter with { self: true }.
    *   `config.document` **JsonApiDocument?** Ignored by this read method; use document on writes.
    *   `config.axiosOptions` **AxiosRequestConfig?** Legacy self() forwards this object as outer get configuration. Use get() for transport overrides.

##### Examples

```typescript
const result = await api.self({ headers: { Authorization: 'Bearer bakery-demo-token' }, params: { fields: { users: 'name' } } })
console.log(result.data?.name)
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[KitsuResponse](#kitsuresponse)>** First user under data, plus response headers. Legacy self() omits status and other document members.

#### request

Send an arbitrary JSON:API request without generated URL casing or pluralization.

##### Parameters

*   `config` **[ArbitraryRequest](#arbitraryrequest)** Request options; inherits all RequestConfig members

    *   `config.body` **(JsonObject | [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)\<JsonObject> | null)** Flat data or relationship identifiers. GET and resource DELETE send no body. (optional, default `{}`)
    *   `config.method` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** HTTP method, case-insensitive; commonly GET, POST, PATCH or DELETE (optional, default `'GET'`)
    *   `config.params` **JsonObject?** Query parameters, including nested JSON:API families and extension parameters
    *   `config.type` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** Encoding type, required for nonempty resource input even when body contains type; omitted for bodyless requests, null or empty linkage
    *   `config.url` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Relative or absolute URL, used as supplied
    *   `config.headers` **JsonObject?** Per-request header overrides
    *   `config.axiosOptions` **AxiosRequestConfig?** Axios overrides, applied after generated headers and params. request() also permits method, url and data overrides. Use signal for cancellation.
    *   `config.document` **JsonApiDocument?** Additional document members for body-bearing requests; no data or errors
    *   `config.relationship` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)?** Encode primary data as identifiers. Defaults to whether url contains /relationships/. (optional, default `url?.includes('/relationships/')??false`)

##### Examples

Custom relationship endpoint

```typescript
await api.request({
  method: 'PATCH', url: 'articles/42/byline', type: 'people', relationship: true,
  body: { id: '9' }, headers: { 'Accept-Language': 'en' }, params: { include: 'author' },
  document: { meta: { requestId: 'demo-42' } },
  axiosOptions: { withCredentials: true }
})
```

Bodyless resource DELETE

```typescript
await api.request({ method: 'DELETE', url: 'articles/42' })
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[KitsuResponse](#kitsuresponse)>** Decoded document with HTTP details

#### plural

*   **See**: <https://www.npmjs.com/package/pluralize> for documentation
*   **See**: [Kitsu](#kitsu) constructor options for disabling pluralization

If pluralization is enabled (default, see Kitsu constructor docs) then pluralization rules can be added

##### Examples

Adding an uncountable pluralization rule

```typescript
api.plural.plural('paper') //=> 'papers'
api.plural.addUncountableRule('paper')
api.plural.plural('paper') //=> 'paper'
```

#### headers

Get the current headers or add additional headers

##### Examples

Get all headers

```typescript
api.headers
```

Get a single header's value

```typescript
api.headers['User-Agent']
```

Add or update a header's value

```typescript
api.headers['Authorization'] = 'Bearer 1234567890'
```

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** All the current headers

#### interceptors

*   **See**: <https://github.com/axios/axios#interceptors> for documentation

Axios Interceptors (alias of `axios.interceptors`)

You can intercept responses before they are handled by `get`, `post`, `patch` and `delete` and before requests are sent to the API server.

##### Examples

Request Interceptor

```typescript
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

```typescript
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

```typescript
const myInterceptor = api.interceptors.request.use(config => config)
api.interceptors.request.eject(myInterceptor)
```

### RequestConfig

Per-request options. headers and transport options also configure constructor defaults. params and document apply only per request.

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

#### Properties

*   `document` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** Extra top-level members for writes: meta, links, jsonapi, included and extensions. Default: none. included contains wire resources. Generated data cannot be replaced; data and errors throw. Ignored by GET and bodyless resource DELETE. Constructor document is not applied. TypeScript: `Omit<JsonApiDocument, 'data'>`. Example: `{ meta: { requestId: 'demo-42' }, jsonapi: { version: '1.1' } }`.
*   `headers` **JsonObject?** Header name/value object. Default: client headers. Request values merge over client headers. Accept and Content-Type initially use application/vnd.api+json; media parameters and Accept alternatives are retained. TypeScript: `JsonObject`. Example: `{ Authorization: 'Bearer bakery-demo-token' }`.
*   `params` **JsonObject?** Query parameters, including include, fields, sort, page, filter and extension families. Default: none. Encoded by the selected query serializer. Empty include and field strings are retained. Constructor params are not applied. TypeScript: `JsonObject`. Example: `{ include: 'author', fields: { articles: 'title,author' }, sort: '-createdAt', page: { number: 2, size: 10 }, filter: { title: 'Bread' } }`.
*   `axiosOptions` **AxiosRequestConfig?** AxiosRequestConfig passed to Axios. Default: none. Constructor options override generated Axios defaults; request options override generated headers and params, and request() method, url and data. Use signal for cancellation or timeout: 0 to disable Axios timeout. Legacy self() forwards this object as outer get configuration; use get() for transport overrides. TypeScript: `AxiosRequestConfig`. Example: `{ withCredentials: true, timeout: 10000, signal: new AbortController().signal }`.

#### Examples

```typescript
const config: RequestConfig = { params: { include: 'author' }, axiosOptions: { withCredentials: true } }
```

### KitsuOptions

Client defaults, including inherited headers and transport options from RequestConfig. Inherited params and document are accepted by the type but ignored by the constructor; pass them per request.

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

#### Properties

*   `document` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** Extra top-level members for writes: meta, links, jsonapi, included and extensions. Default: none. included contains wire resources. Generated data cannot be replaced; data and errors throw. Ignored by GET and bodyless resource DELETE. Constructor document is not applied. TypeScript: `Omit<JsonApiDocument, 'data'>`. Example: `{ meta: { requestId: 'demo-42' }, jsonapi: { version: '1.1' } }`.
*   `headers` **JsonObject?** Header name/value object. Default: client headers. Request values merge over client headers. Accept and Content-Type initially use application/vnd.api+json; media parameters and Accept alternatives are retained. TypeScript: `JsonObject`. Example: `{ Authorization: 'Bearer bakery-demo-token' }`.
*   `params` **JsonObject?** Query parameters, including include, fields, sort, page, filter and extension families. Default: none. Encoded by the selected query serializer. Empty include and field strings are retained. Constructor params are not applied. TypeScript: `JsonObject`. Example: `{ include: 'author', fields: { articles: 'title,author' }, sort: '-createdAt', page: { number: 2, size: 10 }, filter: { title: 'Bread' } }`.
*   `axiosOptions` **AxiosRequestConfig?** AxiosRequestConfig passed to Axios. Default: none. Constructor options override generated Axios defaults; request options override generated headers and params, and request() method, url and data. Use signal for cancellation or timeout: 0 to disable Axios timeout. Legacy self() forwards this object as outer get configuration; use get() for transport overrides. TypeScript: `AxiosRequestConfig`. Example: `{ withCredentials: true, timeout: 10000, signal: new AbortController().signal }`.
*   `baseURL` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** API base URL for relative paths. Default: <https://kitsu.app/api/edge>. TypeScript: `string`. Example: `'https://bakery.example/api'`.
*   `query` **(`"traditional"` | `"modern"` | function (JsonObject?): [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String))?** Query serializer. Default: 'traditional' repeats array keys. 'modern' uses bracketed keys (tag\[]). A callback receives parameters and returns an encoded query string without ?. No parameter casing conversion. TypeScript: `'traditional' | 'modern' | ((params?: JsonObject) => string)`. Example: `(params) => new URLSearchParams({ title: String(params?.title ?? '') }).toString()`.
*   `camelCaseTypes` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)?** Convert inferred outgoing resource types from kebab-case or snake\_case to camelCase. Default: true. Does not change decoded types. TypeScript: `boolean`. Example: `false`.
*   `resourceCase` **(`"kebab"` | `"snake"` | `"none"`)?** Generated resource URL case. Default: 'kebab' (library-entries). 'snake' gives library\_entries; 'none' keeps libraryEntries. Explicit request() URLs are unchanged. TypeScript: `'kebab' | 'snake' | 'none'`. Example: `'snake'`.
*   `attributeCase` **(`"kebab"` | `"snake"` | `"none"`)?** Attribute wire case. Default: 'none' keeps names unchanged. 'kebab' or 'snake' encodes that case and decodes camelCase. Nested JSON, relationships, metadata, extension attributes and queries stay unchanged. Converted name collisions throw Error. TypeScript: `'kebab' | 'snake' | 'none'`. Example: `'kebab'`.
*   `pluralize` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)?** Pluralize generated resource URLs and inferred outgoing types. Default: true. Disable for APIs using singular names. TypeScript: `boolean`. Example: `false`.
*   `timeout` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)?** Axios timeout in milliseconds. Default: 30000. A top-level 0 also selects the default; set axiosOptions.timeout to 0 to disable. Request axiosOptions.timeout overrides this default. TypeScript: `number`. Example: `10000`.
*   `hoistData` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)?** Unwrap a single-resource document containing only data. Default: false. Resource metadata stays in $. Document meta, links, jsonapi or included keep the wrapper. HTTP arrays and null stay under data. TypeScript: `boolean`. Example: `true`.

#### Examples

```typescript
const options: KitsuOptions = { baseURL: 'https://bakery.example/api', attributeCase: 'kebab', timeout: 10000 }
```

### ArbitraryRequest

Arbitrary request options plus all RequestConfig fields. Generated JSON:API bodies use flat resources and direct relationship values.

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

#### Properties

*   `document` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** Extra top-level members for writes: meta, links, jsonapi, included and extensions. Default: none. included contains wire resources. Generated data cannot be replaced; data and errors throw. Ignored by GET and bodyless resource DELETE. Constructor document is not applied. TypeScript: `Omit<JsonApiDocument, 'data'>`. Example: `{ meta: { requestId: 'demo-42' }, jsonapi: { version: '1.1' } }`.
*   `headers` **JsonObject?** Header name/value object. Default: client headers. Request values merge over client headers. Accept and Content-Type initially use application/vnd.api+json; media parameters and Accept alternatives are retained. TypeScript: `JsonObject`. Example: `{ Authorization: 'Bearer bakery-demo-token' }`.
*   `params` **JsonObject?** Query parameters, including include, fields, sort, page, filter and extension families. Default: none. Encoded by the selected query serializer. Empty include and field strings are retained. Constructor params are not applied. TypeScript: `JsonObject`. Example: `{ include: 'author', fields: { articles: 'title,author' }, sort: '-createdAt', page: { number: 2, size: 10 }, filter: { title: 'Bread' } }`.
*   `axiosOptions` **AxiosRequestConfig?** AxiosRequestConfig passed to Axios. Default: none. Constructor options override generated Axios defaults; request options override generated headers and params, and request() method, url and data. Use signal for cancellation or timeout: 0 to disable Axios timeout. Legacy self() forwards this object as outer get configuration; use get() for transport overrides. TypeScript: `AxiosRequestConfig`. Example: `{ withCredentials: true, timeout: 10000, signal: new AbortController().signal }`.
*   `relationship` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)?** Encode the body as relationship identifiers. Default: whether url contains /relationships/. Set explicitly for custom relationship endpoints. Direct values control linkage. TypeScript: `boolean`. Example: `true`.
*   `url` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Relative or absolute URL. Required. Used as supplied; resourceCase and pluralize do not rewrite this URL. TypeScript: `string`. Example: `'articles/42/relationships/author'`.
*   `type` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** Resource type required for encoding nonempty resource input, even when body contains type. Not needed for bodyless GET, resource DELETE, null or empty linkage. TypeScript: `string`. Example: `'people'`.
*   `body` **(JsonObject | [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)\<JsonObject> | null)?** Flat resource, array of resources, or null for to-one relationship clearing. Default: empty data on body-bearing requests. GET and resource DELETE send no body. Put resource metadata under $; document metadata belongs in document. TypeScript: `JsonObject | JsonObject[] | null`. Example: `{ type: 'articles', id: '42', title: 'Moonlight Bread', $: { meta: { editable: true } } }`.
*   `method` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** HTTP method, case-insensitive. Default: GET. Common values are GET, POST, PATCH and DELETE; other method strings are passed to the transport. TypeScript: `string`. Example: `'PATCH'`.

#### Examples

```typescript
const request: ArbitraryRequest = { method: 'PATCH', url: 'articles/42', type: 'articles', body: { id: '42', title: 'Moonlight Bread' } }
```

### KitsuResponse

Decoded JSON:API document with HTTP details. T describes primary data, not the surrounding document.
Additional members (`[attribute: string]: any;`): Other decoded document members, such as included, jsonapi, errors and extension members. With hoistData enabled, single-resource fields can appear here. TypeScript: `any`. Example: `{ jsonapi: { version: '1.1' } }`.

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

#### Properties

*   `data` **T?** Decoded primary data with flat attributes and direct relationships. Absent after single-resource hoisting or for empty responses. TypeScript: `T`. Example: `{ type: 'articles', id: '42', title: 'Moonlight Bread' }`.
*   `status` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)?** HTTP response status from resource methods and request(). Legacy self() returns only data and headers. TypeScript: `number`. Example: `200`.
*   `headers` **JsonObject?** Axios response headers, omitted when empty. TypeScript: `JsonObject`. Example: `{ 'content-type': 'application/vnd.api+json' }`.
*   `links` **JsonObject?** Document links beside data. Resource links live under resource.$.links. TypeScript: `JsonObject`. Example: `{ next: '/articles?page[number]=2' }`.
*   `meta` **JsonObject?** Document metadata beside data. Resource metadata lives under resource.$.meta. TypeScript: `JsonObject`. Example: `{ total: 42 }`.

#### Examples

```typescript
const result: KitsuResponse<{ title: string }> = { status: 200, data: { title: 'Moonlight Bread' } }
```
