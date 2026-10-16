import Devour from 'devour-client'
import { list } from '../fixtures.ts'
import { flatView, plainNative } from '../graph.ts'
import { transport } from '../transport.ts'
import { type Adapter, type Fixture, type Suite, Unsupported } from '../types.ts'

export function create(fixture: Fixture, suite: Suite, mock = transport()): Adapter {
  const client = new Devour({
    apiUrl: 'https://benchmark.invalid',
    pluralize: false,
    logger: false,
  })
  client.axios = client.axios.create({ adapter: mock.axios })
  for (const [type, schema] of Object.entries(fixture.schemas)) {
    const attributes: any = Object.fromEntries(schema.attributes.map((name) => [name, '']))
    for (const [name, relation] of Object.entries(schema.relationships))
      attributes[name] = { jsonApi: relation.many ? 'hasMany' : 'hasOne', type: relation.type }
    client.define(type, attributes, { type })
  }
  const type = list(fixture.document.data)[0].type
  return {
    view: suite === 'codec' ? flatView : { ...flatView, roots: (output) => output.data },
    decode(document) {
      if (suite === 'client')
        return Array.isArray(document.data)
          ? client.findAll(type)
          : client.find(type, document.data?.id)
      return Array.isArray(document.data)
        ? client.deserialize.collection.call(client, document.data, document.included ?? [])
        : client.deserialize.resource.call(client, document.data, document.included ?? [])
    },
    encode(payload) {
      if (suite === 'client') {
        if (Array.isArray(payload))
          throw new Unsupported('public client writes single resources only')
        return client.update(type, payload).then(() => mock.captured())
      }
      return {
        data: Array.isArray(payload)
          ? client.serialize.collection.call(client, type, payload)
          : client.serialize.resource.call(client, type, payload),
      }
    },
    native: (resources) => plainNative(resources),
    reset: () => client.deserialize.cache.clear(),
    prepareResponse: mock.response,
  }
}
