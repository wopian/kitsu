import { create as devour } from './devour/index.ts'
import { create as fetchja } from './fetchja/index.ts'
import { create as jsona } from './jsona/index.ts'
import { create as kitsu } from './kitsu/index.ts'
import { create as core } from './kitsu-core/index.ts'
import { create as native } from './kitsu-native/index.ts'
import { libraries } from './libraries.ts'
import { create as tsJapi } from './ts-japi/index.ts'
import { type Adapter, type Fixture, type Mode, type Suite, Unsupported } from './types.ts'
import { create as yayson } from './yayson/index.ts'

export { libraries }
export const packageName = (library: string) => (library === 'devour' ? 'devour-client' : library)
export const suites: Suite[] = ['codec', 'client']
export function supported(library: string, suite: Suite): boolean {
  return suite === 'client'
    ? ['kitsu', 'kitsu-native', 'fetchja', 'devour'].includes(library)
    : ['kitsu-core', 'devour', 'yayson', 'jsona', 'ts-japi'].includes(library)
}
export function unsupportedReason(
  library: string,
  suite: Suite,
  mode: Mode,
  fixture: Fixture,
): string | undefined {
  if (!supported(library, suite)) return `no public ${suite} API`
  if (mode !== 'encode' && library === 'ts-japi') return 'no public decoder'
  if (
    mode !== 'decode' &&
    suite === 'client' &&
    !['kitsu', 'kitsu-native'].includes(library) &&
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
    case 'kitsu-native':
      return native(root, source)
    case 'fetchja':
      return fetchja(fixture)
    case 'devour':
      return devour(fixture, suite)
    case 'yayson':
      return yayson(fixture)
    case 'jsona':
      return jsona()
    case 'ts-japi':
      return tsJapi(fixture)
    default:
      throw new Error(`unknown library: ${library}`)
  }
}
