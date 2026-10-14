import MockAdapter from 'axios-mock-adapter'
import Kitsu from 'kitsu'
import KitsuNative from 'kitsu-native'

/** Same HTTP assertions run against each client's actual conversion pipeline. */
export function httpClient(
  transport: 'axios' | 'native',
  options: { hoistData?: boolean } = {},
  defaults = false,
) {
  const settings = {
    ...(defaults
      ? {}
      : {
          baseURL: 'https://example.org',
          pluralize: false,
          camelCaseTypes: false,
          resourceCase: 'none' as const,
        }),
    ...options,
  }
  if (transport === 'axios') {
    const api = new Kitsu(settings)
    return {
      api,
      adapter: new MockAdapter(api.axios),
      uri: (config: any) => api.axios.getUri(config),
    }
  }
  const routes = new Map<string, any>()
  const adapter: any = { restore: () => routes.clear() }
  for (const method of ['Get', 'Post', 'Patch', 'Delete']) {
    adapter[`on${method}`] = (url: string) => ({
      reply: (...args: any[]) => {
        routes.set(
          `${method.toUpperCase()} ${url}`,
          typeof args[0] === 'function' ? args[0] : () => args,
        )
      },
    })
  }
  const api = new KitsuNative({
    ...settings,
    fetch: (async (url: string, options: RequestInit) => {
      const relative = url.slice((settings.baseURL || 'https://kitsu.app/api/edge').length)
      const route = routes.get(`${options.method} ${relative.split('?')[0]}`)
      if (!route) throw new Error(`Unexpected HTTP request: ${options.method} ${url}`)
      const headers = new Headers(options.headers)
      const [status, document, responseHeaders] = await route({
        url,
        data: options.body,
        headers: {
          ...Object.fromEntries(headers),
          Accept: headers.get('accept'),
          'Content-Type': headers.get('content-type'),
        },
      })
      return new Response(
        status === 204 || document === undefined || document === ''
          ? null
          : new TextEncoder().encode(JSON.stringify(document)),
        { status, headers: responseHeaders },
      )
    }) as typeof fetch,
  })
  return { api, adapter, uri: (config: any) => config.url }
}
