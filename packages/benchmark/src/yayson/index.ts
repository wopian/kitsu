import yayson from 'yayson'
import { getType } from 'yayson/utils'
import { list } from '../fixtures.ts'
import { flatView, plainNative } from '../graph.ts'
import type { Adapter, Fixture } from '../types.ts'

export function create(fixture: Fixture): Adapter {
  const { Store, Presenter } = yayson()
  const store = new Store()
  const presenters: Record<string, any> = {}
  for (const [type, schema] of Object.entries(fixture.schemas)) {
    class ResourcePresenter extends Presenter {
      static type = type
      static fields = schema.attributes
      relationships() {
        return Object.fromEntries(
          Object.entries(schema.relationships)
            .filter(([, relation]) => relation.linkage)
            .map(([name, relation]) => [
              name,
              { presenter: presenters[relation.type], hasMany: relation.many, optional: true },
            ]),
        )
      }
    }
    presenters[type] = ResourcePresenter
  }
  return {
    view: { ...flatView, type: (resource) => getType(resource) ?? resource.type },
    decode: (document) => store.sync(document as any),
    encode(payload) {
      const resources = list<any>(payload).map(
        (resource) => presenters[resource.type].payload(resource).data,
      )
      return { data: Array.isArray(payload) ? resources : resources[0] }
    },
    native: (resources) => plainNative(resources),
    reset: () => store.reset(),
  }
}
