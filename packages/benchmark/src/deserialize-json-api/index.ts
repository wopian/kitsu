import { deserialize } from 'deserialize-json-api'
import { flatView, plainNative } from '../graph.ts'
import type { Adapter } from '../types.ts'

export function create(): Adapter {
  return {
    view: { ...flatView, roots: (output) => output.data },
    decode: (document) => deserialize(document),
    native: (resources) => plainNative(resources),
  }
}
