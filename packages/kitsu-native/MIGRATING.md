# Migration Guides

## Migrating from `kitsu` to `kitsu-native`

`kitsu` sends requests with Axios. `kitsu-native` uses the browser, Node.js, or Bun
fetch implementation instead. Both default exports are classes named `Kitsu`.

Install the new package with `bun add kitsu-native` or `npm install kitsu-native`.
If you use ordinary resource methods, start by changing the package import:

```js
// Before: Axios
import Kitsu from 'kitsu'

const api = new Kitsu({ baseURL: 'https://bakery.example/api' })
const { data } = await api.get('articles/42')
console.log(data.title) // 'Moonlight Bread'
```

```js
// After: native fetch
import Kitsu from 'kitsu-native'

const api = new Kitsu({ baseURL: 'https://bakery.example/api' })
const { data } = await api.get('articles/42')
console.log(data.title) // 'Moonlight Bread'
```

The methods `get`, `post`, `patch`, `delete`, `self`, and `request` remain available.
Their aliases `fetch`, `create`, `update`, and `remove` remain available too.
`api.fetch('articles/42')` is an alias for `api.get`; it is not the fetch transport.

### Keep resource and JSON:API options

Keep `baseURL`, `headers`, `params`, `timeout`, `query`, `resourceCase`,
`camelCaseTypes`, `pluralize`, `attributeCase`, `hoistData`, and `document` in their
existing supported locations. For example, request queries still use `params`:

```js
const api = new Kitsu({
  baseURL: 'https://bakery.example/api',
  attributeCase: 'kebab'
})

const result = await api.get('people', {
  params: { filter: { 'first-name': 'Mina' }, sort: 'first-name' }
})
result.data[0].firstName // 'Mina': response attribute was first-name

await api.post('articles', { title: 'Moonlight Bread' }, {
  document: { meta: { source: 'bakery-editor' } }
})
```

For changes when upgrading an older `kitsu` release, first read
[Migrating to 13.0.0](../kitsu/MIGRATING.md#migrating-to-1300). Both clients use
the same flat resources, `$` metadata, casing, and hoisting rules.

### Replace Axios options with fetch options

Axios request options and fetch options use different names. For example,
`withCredentials: true` becomes `credentials: 'include'`:

```js
// Before
const api = new Kitsu({
  baseURL: 'https://bakery.example/api',
  axiosOptions: { withCredentials: true }
})
await api.get('articles', { axiosOptions: { withCredentials: false } })
```

```js
// After
const api = new Kitsu({
  baseURL: 'https://bakery.example/api',
  fetchOptions: { credentials: 'include' }
})
await api.get('articles', { fetchOptions: { credentials: 'omit' } })
```

For browser requests, `omit` sends no cookies, even for the same origin.
Use `same-origin` if you want cookies only for requests to the current origin.

`fetchOptions` accepts native `RequestInit` options such as `credentials`,
`cache`, `redirect`, and `signal`. Per-request values override constructor defaults.
Set headers through `headers`, and pass resource bodies to `post` or `patch`.
The client generates the final method, headers, and JSON body; `fetchOptions`
cannot override them.

### Update headers with `Headers`

Constructor and request `headers` still accept ordinary objects:

```js
const api = new Kitsu({ headers: { Authorization: 'Bearer bakery-demo-token' } })
await api.get('articles', { headers: { 'X-Request-Source': 'recipe-editor' } })
```

The native client's stored headers are a native `Headers` object. Change property
access to method calls:

```js
// Before
api.headers.Authorization = 'Bearer refreshed-demo-token'
console.log(api.headers.Authorization)

// After
api.headers.set('Authorization', 'Bearer refreshed-demo-token')
console.log(api.headers.get('Authorization'))
api.headers.delete('Authorization')
```

Per-request header overrides do not change the client's default headers.

### Replace interceptors with a fetch wrapper

There is no `api.axios` or `api.interceptors` on the native client.
For example, replace an Axios authentication interceptor:

```js
// Before
api.interceptors.request.use(config => {
  config.headers.Authorization = 'Bearer bakery-demo-token'
  return config
})
```

```js
// After
import Kitsu from 'kitsu-native'

const api = new Kitsu({
  baseURL: 'https://bakery.example/api',
  fetch: async (input, options) => {
    const headers = new Headers(options?.headers)
    headers.set('Authorization', 'Bearer bakery-demo-token')

    const response = await globalThis.fetch(input, { ...options, headers })
    console.log('Bakery response status:', response.status)
    return response
  }
})
```

This wrapper can inspect request options and response status. Return the
`Response` without reading its body; the client reads and decodes it afterward.
You can also inject a mock fetch function for tests instead of an Axios adapter.
If your application requires Axios-specific adapters or transforms, keep using
`kitsu` until that behavior has an equivalent fetch wrapper.

### Read native response headers

Resource data and HTTP status keep the same response shape:

```js
const result = await api.get('articles/42')
result.data.title // 'Moonlight Bread'
result.status // 200
result.meta // document metadata, if the API supplies it
```

Response headers also use `Headers`. Before:

```js
const requestId = result.headers?.['x-request-id']
```

After:

```js
const requestId = result.headers?.get('x-request-id')
```

An absent header returns `null` from `Headers.get`. The whole `headers` property
can be absent when the response has no headers.

### Update error handling

For Axios HTTP errors, you might read `error.response.status` and
`error.response.data`. Native HTTP errors use `KitsuNativeError`:

```js
// Before
try {
  await api.get('articles/999')
} catch (error) {
  console.log(error.response?.status)
  console.log(error.response?.data?.errors?.[0]?.detail)
}
```

```js
// After
import Kitsu, { KitsuNativeError } from 'kitsu-native'

const api = new Kitsu({ baseURL: 'https://bakery.example/api' })

try {
  await api.get('articles/999')
} catch (error) {
  if (error instanceof KitsuNativeError) {
    console.log(error.status) // 404
    console.log(error.errors?.[0]?.detail) // 'Recipe not found'
    console.log(error.document?.meta) // metadata from the error document
    console.log(error.response) // original native Response
  } else {
    throw error // network, cancellation, or other errors
  }
}
```

HTTP failures retain the parsed JSON:API document, errors, status, and headers.
Invalid JSON responses also throw `KitsuNativeError`; `cause` contains the parsing
error and `document` is absent. Native network and abort errors pass through
without becoming `KitsuNativeError`.

The error name stays `KitsuNativeError`. Exported TypeScript names
`KitsuNativeOptions`, `KitsuNativeResponse`, `RequestConfig`, and `FetchOptions`
also remain available; the default client class is named `Kitsu`.

### Keep timeouts and move cancellation into `fetchOptions`

Both clients default to a 30,000 ms timeout. The native client accepts the same
constructor timeout in milliseconds; `timeout: 0` disables its timer:

```js
const api = new Kitsu({ timeout: 10_000 })
```

Move a per-request Axios signal into `fetchOptions`. Before:

```js
const controller = new AbortController()
const pending = api.get('articles', { axiosOptions: { signal: controller.signal } })
controller.abort()
```

After:

```js
const controller = new AbortController()
const pending = api.get('articles', { fetchOptions: { signal: controller.signal } })
controller.abort()

try {
  await pending
} catch (error) {
  if (error.name !== 'AbortError') throw error
}
```

The native client combines the caller's signal with its timeout. A timeout rejects
with a native `TimeoutError`; caller cancellation rejects with the signal's abort
reason. Handle the rejected promise as you would a native fetch request.

### Runtime support

Use Node.js 22, 24, or 26 and later, Bun, or a modern browser with fetch.
The native package has no Axios dependency. Installing both clients in the same
application still keeps Axios available through `kitsu`.
