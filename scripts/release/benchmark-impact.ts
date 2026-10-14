import { execFileSync } from 'node:child_process'
import { isDeepStrictEqual } from 'node:util'

export function parseLockfile(text: string): any {
  let quoted = false
  let escaped = false
  let cleaned = ''
  for (let index = 0; index < text.length; index++) {
    const character = text[index]
    if (quoted) {
      if (escaped) escaped = false
      else if (character === '\\') escaped = true
      else if (character === '"') quoted = false
    } else if (character === '"') quoted = true
    else if (character === ',') {
      let next = index + 1
      while (/\s/.test(text[next] ?? '')) next++
      if (text[next] === '}' || text[next] === ']') continue
    }
    cleaned += character
  }
  return JSON.parse(cleaned)
}

function parentPackage(path: string): string {
  const segments = path.split('/')
  segments.pop()
  if (segments.at(-1)?.startsWith('@')) segments.pop()
  return segments.join('/')
}

/** Compare the existing release/build dependency graph, ignoring benchmark-only additions. */
export function releaseLockProjection(lock: any): any {
  const workspaces = Object.fromEntries(
    Object.entries<any>(lock.workspaces).filter(([key]) => key !== 'packages/benchmark'),
  )
  const packages: Record<string, any> = {}
  const pending: [string, string][] = []
  const dependencies = (record: any) => ({
    ...record.dependencies,
    ...record.devDependencies,
    ...record.optionalDependencies,
  })
  for (const workspace of Object.values<any>(workspaces))
    for (const name of Object.keys(dependencies(workspace))) pending.push([name, ''])
  while (pending.length) {
    const [name, parent] = pending.pop() as [string, string]
    let ancestor = parent
    let key: string | undefined
    while (ancestor) {
      if (lock.packages[`${ancestor}/${name}`]) {
        key = `${ancestor}/${name}`
        break
      }
      ancestor = parentPackage(ancestor)
    }
    key ??= name
    const entry = lock.packages[key]
    if (!entry || key in packages) continue // Workspace references have no package tuple.
    packages[key] = entry
    const metadata = entry[2] ?? {}
    for (const dependency of Object.keys({
      ...dependencies(metadata),
      ...metadata.peerDependencies,
    }))
      pending.push([dependency, key])
  }
  return {
    lockfileVersion: lock.lockfileVersion,
    configVersion: lock.configVersion,
    workspaces,
    packages,
  }
}

export function releaseManifestProjection(manifest: any): any {
  return {
    ...manifest,
    scripts: Object.fromEntries(
      Object.entries(manifest.scripts ?? {}).filter(([name]) => !/^benchmark(?::|$)/.test(name)),
    ),
  }
}

export function benchmarkOnlyChange(
  hash: string,
  filename: 'package.json' | 'bun.lock',
  cwd: string,
): boolean {
  try {
    const read = (revision: string) => {
      const text = execFileSync('git', ['show', `${revision}:${filename}`], {
        cwd,
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'pipe'],
      })
      // Bun's text lockfile permits trailing commas. Package tuples contain no executable code.
      return filename === 'bun.lock' ? parseLockfile(text) : JSON.parse(text)
    }
    const project = filename === 'bun.lock' ? releaseLockProjection : releaseManifestProjection
    return isDeepStrictEqual(project(read(`${hash}^`)), project(read(hash)))
  } catch {
    return false // Missing parent or unknown lock format remains release-relevant.
  }
}
