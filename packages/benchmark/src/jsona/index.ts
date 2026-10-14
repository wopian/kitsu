import Jsona from 'jsona'
import { flatView, plainNative } from '../graph.ts'
import type { Adapter } from '../types.ts'

export function create(): Adapter {
  const formatter = new Jsona()
  return {
    view: flatView,
    decode: (document) => formatter.deserialize(document as any),
    encode: (payload) => formatter.serialize({ stuff: payload, includeNames: [] }),
    native: (resources) => plainNative(resources, false, true),
  }
}
