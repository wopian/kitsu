import { create as deserialize } from './deserialize-json-api/index.ts'
import { create as devour } from './devour/index.ts'
import { create as fetchja } from './fetchja/index.ts'
import { create as jsona } from './jsona/index.ts'
import { create as kitsu } from './kitsu/index.ts'
import { create as core } from './kitsu-core/index.ts'
import { libraries } from './libraries.ts'
import { type Adapter, type Fixture, type Mode, type Suite, Unsupported } from './types.ts'
import { create as yayson } from './yayson/index.ts'

export { libraries }
export const packageName = (library: string) => (library === 'devour' ? 'devour-client' : library)
export const suites: Suite[] = ['codec', 'client']
export function supported(library: string, suite: Suite): boolean {
  return suite === 'client'
    ? ['kitsu', 'fetchja', 'devour'].includes(library)
    : ['kitsu-core', 'devour', 'yayson', 'jsona', 'deserialize-json-api'].includes(library)
}
export function unsupportedReason(
  library: string,
  suite: Suite,
  mode: Mode,
  fixture: Fixture,
): string | undefined {
  if (!supported(library, suite)) return `no public ${suite} API`
  if (mode !== 'decode' && library === 'deserialize-json-api') return 'no public encoder'
  if (
    mode !== 'decode' &&
    suite === 'client' &&
    library !== 'kitsu' &&
    Array.isArray(fixture.document.data)
  )
    return 'public client writes single resources only'
  return undefined
}
export async function createAdapter(
  library: string,
  suite: Suite,
  fixture: Fixture,
  root: string,
  source = false,
): Promise<Adapter> {
  if (!supported(library, suite)) throw new Unsupported(`no public ${suite} API`)
  switch (library) {
    case 'kitsu-core':
      return core(root, source)
    case 'kitsu':
      return kitsu(root, source)
    case 'fetchja':
      return fetchja(fixture)
    case 'devour':
      return devour(fixture, suite)
    case 'yayson':
      return yayson(fixture)
    case 'jsona':
      return jsona()
    case 'deserialize-json-api':
      return deserialize()
    default:
      throw new Error(`unknown library: ${library}`)
  }
}
