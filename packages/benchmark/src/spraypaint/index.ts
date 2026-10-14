import { attr, hasMany, hasOne, SpraypaintBase } from 'spraypaint'
import { list } from '../fixtures.ts'
import { flatView } from '../graph.ts'
import { transport } from '../transport.ts'
import { type Adapter, type Fixture, type Suite, Unsupported } from '../types.ts'

export function create(fixture: Fixture, suite: Suite): Adapter {
  const mock = transport()
  const originalFetch = globalThis.fetch
  if (suite === 'client') globalThis.fetch = mock.fetch
  const Base = SpraypaintBase.extend({
    static: {
      baseUrl: 'https://benchmark.invalid',
      apiNamespace: '',
      keyCase: { server: 'camel', client: 'camel' },
    },
  }) as any
  const models: Record<string, any> = {}
  let previous: any[] = []
  const reset = () => {
    // Remove observers as well as identities. Recursive unlisten needs cycles broken temporarily.
    const pending = [...previous]
    const seen = new WeakSet<object>()
    while (pending.length) {
      const model = pending.pop()
      if (!model || seen.has(model)) continue
      seen.add(model)
      const relationships = model.relationships
      for (const related of Object.values(relationships ?? {})) pending.push(...list(related))
      model.relationships = {}
      model.unlisten()
      model.relationships = relationships
    }
    previous = []
    Base.store.data = {}
  }
  for (const [type, schema] of Object.entries(fixture.schemas)) {
    const attrs: any = Object.fromEntries(schema.attributes.map((name) => [name, attr()]))
    for (const [name, relation] of Object.entries(schema.relationships))
      attrs[name] = relation.many
        ? hasMany({ type: relation.type })
        : hasOne({ type: relation.type })
    models[type] = Base.extend({ static: { jsonapiType: type }, attrs })
  }
  const type = list(fixture.document.data)[0].type as string
  return {
    view: { ...flatView, type: (resource) => resource.klass?.jsonapiType ?? resource.type },
    decode(document) {
      if (suite === 'client')
        return (
          Array.isArray(document.data) ? models[type].all() : models[type].find(document.data?.id)
        ).then((proxy: any) => {
          previous.push(...list(proxy.data))
          return proxy.data
        })
      const resources = list(document.data).map((resource) =>
        models[type].fromJsonapi(resource, document),
      )
      previous.push(...resources)
      return Array.isArray(document.data) ? resources : resources[0]
    },
    encode:
      suite === 'codec'
        ? undefined
        : async (payload) => {
            if (Array.isArray(payload))
              throw new Unsupported('public client writes single resources only')
            await payload.save({
              with: Object.keys(fixture.schemas[type].relationships)
                .filter((name) => fixture.schemas[type].relationships[name].linkage)
                .map((name) => `${name}.id`),
            })
            return mock.captured()
          },
    native(resources) {
      const mapped = list(resources).map((resource) => {
        const model = new models[resource.type as string]({ id: resource.id })
        model.isPersisted = true
        model.assignAttributes(resource.attributes)
        for (const [name, relationship] of Object.entries(resource.relationships ?? {})) {
          const targets = list(relationship.data).map((target) => {
            const related = new models[target.type as string]({ id: target.id })
            related.isPersisted = true
            Base.store.updateOrCreate(related)
            return related
          })
          model[name] =
            relationship.data === null
              ? null
              : Array.isArray(relationship.data)
                ? targets
                : targets[0]
        }
        Base.store.updateOrCreate(model)
        previous.push(model)
        return model
      })
      return Array.isArray(resources) ? mapped : mapped[0]
    },
    reset,
    activate: () => {
      if (suite === 'client') globalThis.fetch = mock.fetch
    },
    cleanup: () => {
      reset()
      globalThis.fetch = originalFetch
    },
    prepareResponse: mock.response,
  }
}
