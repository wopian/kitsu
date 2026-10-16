import Fetchja from 'fetchja'
import { flatView, plainNative } from '../graph.ts'
import { transport } from '../transport.ts'
import { type Adapter, type Fixture, Unsupported } from '../types.ts'

export function create(fixture: Fixture, mock = transport()): Adapter {
  const client = new Fetchja({
    baseURL: 'https://benchmark.invalid',
    pluralize: false,
    typeCase: 'none',
    resourceCase: 'none',
    fetch: mock.fetch,
  })
  return {
    view: { ...flatView, roots: (output) => output.data },
    decode: () => client.get('resources'),
    async encode(payload) {
      if (Array.isArray(payload))
        throw new Unsupported('public client writes single resources only')
      await client.patch(payload.type, payload)
      return mock.captured()
    },
    native(resources) {
      const payload = plainNative(resources)
      if (!Array.isArray(payload)) {
        for (const [name, relationship] of Object.entries(
          fixture.schemas[payload.type].relationships,
        ))
          if (payload[name] === null) payload[name] = { type: relationship.type, id: null }
      }
      return payload
    },
    prepareResponse: mock.response,
  }
}
