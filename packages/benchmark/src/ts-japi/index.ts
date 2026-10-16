import { Relator, Serializer } from 'ts-japi'
import { flatView, plainNative } from '../graph.ts'
import { type Adapter, type Fixture, Unsupported } from '../types.ts'

export function create(fixture: Fixture): Adapter {
  const serializers: Record<string, Serializer> = {}
  for (const [type, schema] of Object.entries(fixture.schemas)) {
    serializers[type] = new Serializer(type, {
      version: null,
      cache: false,
      include: 0,
      projection: {
        type: 0,
        ...Object.fromEntries(Object.keys(schema.relationships).map((name) => [name, 0])),
      },
    })
  }
  for (const [type, schema] of Object.entries(fixture.schemas)) {
    serializers[type].setRelators(
      Object.entries(schema.relationships)
        .filter(([, relationship]) => relationship.linkage)
        .map(
          ([name, relationship]) =>
            new Relator(async (resource: any) => resource[name], serializers[relationship.type], {
              relatedName: name,
            }),
        ),
    )
  }
  const primary = Array.isArray(fixture.document.data)
    ? fixture.document.data[0]
    : fixture.document.data
  if (!primary?.type) throw new Unsupported('no primary resource type')
  const serializer = serializers[primary.type]
  return {
    view: flatView,
    encode: (payload) => serializer.serialize(payload),
    native: (resources) => plainNative(resources),
  }
}
