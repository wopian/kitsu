import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { flatView, plainNative } from '../graph.ts'
import { transport } from '../transport.ts'
import type { Adapter } from '../types.ts'

export async function create(root: string, source = false, mock = transport()): Promise<Adapter> {
  const filename = source
    ? 'packages/kitsu-native/src/index.ts'
    : 'packages/kitsu-native/dist/index.mjs'
  const { default: KitsuNative } = await import(pathToFileURL(resolve(root, filename)).href)
  const client = new KitsuNative({
    baseURL: 'https://benchmark.invalid',
    pluralize: false,
    camelCaseTypes: false,
    fetch: mock.fetch,
  })
  return {
    view: { ...flatView, roots: (output) => output.data },
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
    native: (resources) => plainNative(resources, false, false, true),
    prepareResponse: mock.response,
  }
}
