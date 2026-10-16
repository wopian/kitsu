import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { flatView, plainNative, wrappedView } from '../graph.ts'
import { transport } from '../transport.ts'
import type { Adapter } from '../types.ts'

export async function create(root: string, source = false, mock = transport()): Promise<Adapter> {
  const filename = source ? 'packages/kitsu/src/index.ts' : 'packages/kitsu/dist/index.mjs'
  const { default: Kitsu } = await import(pathToFileURL(resolve(root, filename)).href)
  const client = new Kitsu({
    baseURL: 'https://benchmark.invalid',
    pluralize: false,
    camelCaseTypes: false,
    axiosOptions: { adapter: mock.axios },
  })
  // Probe the actual client-bound core before timed work, including comparison checkouts.
  mock.response({ data: { type: 'probe', id: '1', relationships: { target: { data: null } } } })
  const flat = (await client.request({ method: 'GET', url: '/probe' })).data.target === null
  return {
    view: flat ? { ...flatView, roots: (output) => output.data } : wrappedView,
    decode: () => client.request({ method: 'GET', url: '/resources' }),
    async encode(payload) {
      await client.request({
        method: 'PATCH',
        url: '/resources',
        type: Array.isArray(payload) ? payload[0]?.type : payload.type,
        body: payload,
      })
      return mock.captured()
    },
    native: (resources) => plainNative(resources, !flat, false, flat),
    prepareResponse: mock.response,
  }
}
