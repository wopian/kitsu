import { RelationshipType, useJsonApi } from '@bjornharrtell/json-api'
import { list } from '../fixtures.ts'
import { flatView, plainNative } from '../graph.ts'
import { transport } from '../transport.ts'
import { type Adapter, type Fixture, Unsupported } from '../types.ts'

export function create(fixture: Fixture, mock = transport()): Adapter {
  const originalFetch = globalThis.fetch
  const client = useJsonApi({
    endpoint: 'https://benchmark.invalid',
    kebabCase: false,
    preserveNullRelationships: true,
    modelDefinitions: Object.entries(fixture.schemas).map(([type, schema]) => ({
      type,
      relationships: Object.fromEntries(
        Object.entries(schema.relationships).map(([name, relation]) => [
          name,
          {
            type: relation.type,
            relationshipType: relation.many ? RelationshipType.HasMany : RelationshipType.BelongsTo,
          },
        ]),
      ),
    })),
  })
  const activate = () => {
    globalThis.fetch = mock.fetch
  }
  activate()
  const find = (document: Fixture['document']) => {
    const resource = list(document.data)[0] ?? list(fixture.document.data)[0]
    return Array.isArray(document.data)
      ? client.findAll(resource.type)
      : client.findRecord(resource.type, resource.id as string)
  }
  return {
    view: flatView,
    async decode(document) {
      const result = await find(document)
      return 'records' in result ? result.records : result.record
    },
    async decodeDocument(document) {
      const result = await find(document)
      return { decoded: 'records' in result ? result.records : result.record, document: result.doc }
    },
    async encode(payload) {
      if (Array.isArray(payload))
        throw new Unsupported('public client writes single resources only')
      await client.saveRecord(payload)
      return mock.captured()
    },
    native: (resources) => plainNative(resources),
    prepareResponse: mock.response,
    // saveRecord follows each HTTP 204 PATCH with a GET of the saved resource.
    requestsPerOperation: { decode: 1, encode: 2, 'decode-encode': 3 },
    activate,
    cleanup() {
      globalThis.fetch = originalFetch
    },
  }
}
