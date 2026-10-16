import { describe, expect, it } from 'bun:test'
import Kitsu, { KitsuNativeError, type KitsuNativeOptions } from './index.js'

function client(
  options: KitsuNativeOptions = {},
  reply: (url: string, options: RequestInit) => Response | Promise<Response> = () =>
    new Response(null, { status: 204 }),
) {
  const calls: { url: string; options: RequestInit }[] = []
  const api = new Kitsu({
    ...options,
    fetch: (async (url: string, options: RequestInit) => {
      calls.push({ url, options })
      return reply(url, options)
    }) as typeof fetch,
  })
  return { api, calls }
}

describe('kitsu-native', () => {
  it('keeps transport and request internals private at runtime', async () => {
    expect(Kitsu.name).toBe('Kitsu')
    const { api, calls } = client({ baseURL: 'https://private.invalid', timeout: 0 })
    for (const name of ['transport', 'baseURL', 'timeout', 'fetchOptions', 'model', 'send'])
      expect(name in api).toBe(false)
    Object.assign(api, {
      transport: () => {
        throw new Error('Public property must not replace private transport')
      },
      baseURL: 'https://wrong.invalid',
      model: null,
      send: null,
      fetchOptions: { credentials: 'omit' },
    })
    await api.post('articles', { title: 'Private elements' })
    expect(calls[0].url).toBe('https://private.invalid/articles')
    expect(calls[0].options.credentials).toBeUndefined()
  })
  it('keeps synchronous conversion and injected transport failures as rejected promises', async () => {
    const failure = new Error('Synchronous failure')
    const direct = new Kitsu({
      fetch: (() => {
        throw failure
      }) as unknown as typeof fetch,
    })
    await expect(direct.get('articles')).rejects.toBe(failure)
    const { api } = client()
    api.resCase = () => {
      throw failure
    }
    for (const operation of [
      () => api.get('articles'),
      () => api.patch('articles', { id: '1' }),
      () => api.post('articles', {}),
      () => api.delete('articles', '1'),
      () =>
        api.request({
          url: 'articles',
          get method(): string {
            throw failure
          },
        }),
    ]) {
      const pending = operation()
      expect(pending).toBeInstanceOf(Promise)
      await expect(pending).rejects.toBe(failure)
    }
  })
  it('isolates concurrent options and clears successful request timeout signals', async () => {
    const controller = new AbortController()
    const signals: AbortSignal[] = []
    const replies: (() => void)[] = []
    const requests: Request[] = []
    const { api, calls } = client(
      { timeout: 20, fetchOptions: { credentials: 'include', signal: controller.signal } },
      (url, options) => {
        signals.push(options.signal as AbortSignal)
        requests.push(new Request(url, options))
        return new Promise((resolve) =>
          replies.push(() => resolve(new Response(null, { status: 204 }))),
        )
      },
    )
    const first = api.get('articles', {
      headers: { 'X-Request': 'first' },
      fetchOptions: { credentials: 'omit', signal: undefined },
    })
    const second = api.get('articles', { headers: { 'X-Request': 'second' } })
    replies[1]()
    replies[0]()
    await Promise.all([first, second])
    await Bun.sleep(40)
    expect(signals.every((signal) => !signal.aborted)).toBe(true)
    expect(requests.map((request) => request.headers.get('x-request'))).toEqual(['first', 'second'])
    expect(calls.map((call) => call.options.credentials)).toEqual(['omit', 'include'])
    expect(api.headers.has('x-request')).toBe(false)
    controller.abort()
    expect(signals[0].aborted).toBe(false)
    expect(signals[1].aborted).toBe(true)
    const reason = new Error('Default canceled')
    const defaults = client({ timeout: 0, fetchOptions: { signal: AbortSignal.abort(reason) } })
    await defaults.api.get('articles', { fetchOptions: { signal: undefined } })
    expect(defaults.calls[0].options.signal).toBeUndefined()
    await defaults.api.get('articles', {
      fetchOptions: Object.create({ signal: controller.signal }),
    })
    expect(defaults.calls[1].options.signal?.reason).toBe(reason)
  })
  it('keeps aliases and helpers with default, snake and unchanged resource names', async () => {
    const { api, calls } = client()
    expect(api.fetch).toBe(api.get)
    expect(api.update).toBe(api.patch)
    expect(api.create).toBe(api.post)
    expect(api.remove).toBe(api.delete)
    expect(api.camel('library-entry')).toBe('libraryEntry')
    await api.fetch('libraryEntry/Aa/relatedThing/moreStuff')
    expect(calls[0].url).toBe(
      'https://kitsu.app/api/edge/library-entries/Aa/related-thing/more-stuff',
    )
    const snake = client({ resourceCase: 'snake', query: 'modern' })
    await snake.api.get('libraryEntry/Aa/relatedThing', { params: { id: [1, 2] } })
    expect(snake.calls[0].url).toBe(
      'https://kitsu.app/api/edge/library_entries/Aa/related_thing?id%5B%5D=1&id%5B%5D=2',
    )
    const flat = client({ resourceCase: 'none', camelCaseTypes: false, pluralize: false })
    await flat.api.get('libraryEntry', { params: { id: [1, 2] } })
    expect(flat.calls[0].url).toEndWith('/libraryEntry?id=1&id=2')
  })
  it('merges RequestInit and headers while generated method and document remain authoritative', async () => {
    const { api, calls } = client({
      timeout: 0,
      baseURL: 'https://example.org/api/',
      headers: {
        Accept: 'application/vnd.api+json;profile="https://example.org/p"',
        'X-Default': 'yes',
      },
      fetchOptions: { credentials: 'include', mode: 'cors' },
    })
    api.headers.set('X-Mutable', 'current')
    await api.request({
      url: '/articles?existing=1',
      method: 'pAtCh',
      type: 'articles',
      body: { id: 0 },
      params: { page: { offset: 0 } },
      headers: new Headers({ 'X-Default': 'override' }),
      fetchOptions: {
        mode: 'same-origin',
        method: 'DELETE',
        body: 'wrong',
        headers: { Wrong: 'yes' },
      } as any,
    })
    const { url, options } = calls[0]
    expect(url).toBe('https://example.org/api/articles?existing=1&page%5Boffset%5D=0')
    expect(options).toMatchObject({ credentials: 'include', mode: 'same-origin', method: 'PATCH' })
    expect(new Headers(options.headers).get('x-default')).toBe('override')
    expect(new Headers(options.headers).get('x-mutable')).toBe('current')
    expect(new Headers(options.headers).has('wrong')).toBe(false)
    expect(JSON.parse(options.body as string)).toEqual({ data: { type: 'articles', id: '0' } })
    expect(options.signal).toBeUndefined()
    await api.get('articles', { params: {} })
    expect(calls[1].url).toBe('https://example.org/api/articles')
    expect(new Headers(calls[1].options.headers).get('x-default')).toBe('yes')
    const custom = client({ query: () => 'custom=yes' })
    await custom.api.request({ url: 'https://other.example/articles', params: {} })
    expect(custom.calls[0].url).toBe('https://other.example/articles?custom=yes')
  })
  it('lets fetch snapshot default headers while isolating caller headers and request overrides', async () => {
    const supplied = new Headers({ 'X-Default': 'initial' })
    const requests: Request[] = []
    const { api } = client({ headers: supplied }, (url, options) => {
      requests.push(new Request(url, options))
      return new Response(null, { status: 204 })
    })
    await api.get('articles')
    api.headers.set('X-Default', 'changed')
    await api.get('articles', { headers: { 'X-Default': 'request' } })
    await api.get('articles')
    expect(supplied.get('x-default')).toBe('initial')
    expect(requests.map((request) => request.headers.get('x-default'))).toEqual([
      'initial',
      'request',
      'changed',
    ])
  })
  it('preserves helper URLs and legacy bulk DELETE separately from resource DELETE', async () => {
    const { api, calls } = client()
    await api.post('libraryEntry', { title: 'Hello' })
    expect(calls[0].url).toEndWith('/library-entries')
    expect(JSON.parse(calls[0].options.body as string).data.type).toBe('libraryEntries')
    await api.patch('articles/1/relationships/author', { type: 'people', id: '9' })
    expect(calls[1].url).toEndWith('/articles/1/relationships/author')
    await api.delete('articles', ['1', '2'])
    expect(calls[2].url).toEndWith('/articles')
    expect(JSON.parse(calls[2].options.body as string)).toEqual({
      data: [
        { type: 'articles', id: '1' },
        { type: 'articles', id: '2' },
      ],
    })
    await api.remove('articles', 'a/b')
    expect(calls[3].url).toEndWith('/articles/a%2Fb')
    expect(calls[3].options.body).toBeUndefined()
    await expect(api.delete('articles', undefined as any)).rejects.toThrow('DELETE requires an ID')
    await expect(api.post('articles', { id: {} } as any)).rejects.toThrow('Invalid resource id')
  })
  it('returns first authenticated user and handles empty 202/205 responses', async () => {
    const { api, calls } = client({}, () => Response.json({ data: [{ type: 'users', id: '9' }] }))
    expect((await api.self({ params: { include: 'roles' } })).data).toEqual({
      type: 'users',
      id: '9',
    })
    expect(calls[0].url).toEndWith('/users?include=roles&filter%5Bself%5D=true')
    expect((await client({}, () => Response.json({ data: [] })).api.self()).data).toBeUndefined()
    for (const status of [202, 205])
      expect(await client({}, () => new Response(null, { status })).api.get('articles')).toEqual({
        status,
      })
  })
  it('preserves HTTP error documents and parsing failures without wrapping transport failures', async () => {
    const document = {
      errors: [{ status: '409', source: { header: 'Accept' } }],
      meta: { trace: 'id' },
    }
    const { api } = client({}, () =>
      Response.json(document, {
        status: 409,
        statusText: 'Conflict',
        headers: { 'X-Trace': 'id' },
      }),
    )
    try {
      await api.get('articles')
      throw new Error('Expected rejection')
    } catch (error) {
      expect(error).toBeInstanceOf(KitsuNativeError)
      const failure = error as KitsuNativeError
      expect(failure.name).toBe('KitsuNativeError')
      expect(failure.message).toBe('HTTP 409 Conflict')
      expect(failure.status).toBe(409)
      expect(failure.headers.get('x-trace')).toBe('id')
      expect(failure.document).toEqual(document)
      expect(failure.errors).toEqual(document.errors)
      expect(failure.response).toBeInstanceOf(Response)
    }
    await expect(
      client({}, () => new Response(null, { status: 500 })).api.get('articles'),
    ).rejects.toThrow('HTTP 500')
    try {
      await client({}, () => new Response('{bad')).api.get('articles')
      throw new Error('Expected rejection')
    } catch (error) {
      expect(error).toBeInstanceOf(KitsuNativeError)
      expect((error as KitsuNativeError).cause).toBeInstanceOf(SyntaxError)
      expect((error as KitsuNativeError).document).toBeUndefined()
    }
    const network = new TypeError('Network offline')
    const stream = new ReadableStream({
      start(controller) {
        controller.error(network)
      },
    })
    await expect(client({}, () => new Response(stream)).api.get('articles')).rejects.toBe(network)
    await expect(
      client({}, () => {
        throw network
      }).api.get('articles'),
    ).rejects.toBe(network)
  })
  it('combines cancellation with timeout and allows timeout to be disabled', async () => {
    const controller = new AbortController()
    const reason = new Error('Caller canceled')
    const blocked = client(
      { fetchOptions: { signal: controller.signal } },
      (_url, options) =>
        new Promise((_resolve, reject) => {
          options.signal?.addEventListener('abort', () => reject(options.signal?.reason), {
            once: true,
          })
        }),
    )
    const pending = blocked.api.get('articles')
    controller.abort(reason)
    await expect(pending).rejects.toBe(reason)
    expect(blocked.calls[0].options.signal).not.toBe(controller.signal)
    const timed = client(
      { timeout: 5 },
      (_url, options) =>
        new Promise((_resolve, reject) => {
          options.signal?.addEventListener('abort', () => reject(options.signal?.reason), {
            once: true,
          })
        }),
    )
    await expect(timed.api.get('articles')).rejects.toMatchObject({ name: 'TimeoutError' })
    const disabled = client(
      { timeout: 0, fetchOptions: { signal: AbortSignal.abort(reason) } },
      (_url, options) => {
        throw options.signal?.reason
      },
    )
    await expect(disabled.api.get('articles')).rejects.toBe(reason)
  })
  it('uses global fetch when no injected transport is supplied', async () => {
    const original = globalThis.fetch
    globalThis.fetch = (async () => new Response(null, { status: 204 })) as unknown as typeof fetch
    try {
      expect(await new Kitsu().get('articles')).toEqual({ status: 204 })
    } finally {
      globalThis.fetch = original
    }
  })
})
