import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { plainNative, wrappedView } from '../graph.ts'
import type { Adapter } from '../types.ts'

export async function create(root: string, source = false): Promise<Adapter> {
  const filename = source
    ? 'packages/kitsu-core/src/index.ts'
    : 'packages/kitsu-core/dist/index.mjs'
  const core = await import(pathToFileURL(resolve(root, filename)).href)
  return {
    view: wrappedView,
    decode: (document) => core.deserialise(document),
    encode: (payload) =>
      core.serialise(Array.isArray(payload) ? payload[0]?.type : payload.type, payload, 'PATCH'),
    native: (resources) => plainNative(resources, true),
  }
}
