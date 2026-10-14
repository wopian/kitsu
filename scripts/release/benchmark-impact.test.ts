import { describe, expect, test } from 'bun:test'
import { execFileSync } from 'node:child_process'
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import {
  benchmarkOnlyChange,
  parseLockfile,
  releaseLockProjection,
  releaseManifestProjection,
} from './benchmark-impact.ts'
import { affects, analyzeCommits } from './impact.ts'

const lock = {
  lockfileVersion: 2,
  configVersion: 0,
  workspaces: {
    '': { devDependencies: { build: '1.0.0' } },
    'packages/kitsu': { name: 'kitsu', dependencies: { axios: '1.0.0' } },
  },
  packages: {
    build: ['build@1.0.0', '', { dependencies: { helper: '1.0.0' } }, 'build-integrity'],
    helper: ['helper@1.0.0', '', {}, 'helper-integrity'],
    axios: ['axios@1.0.0', '', {}, 'axios-integrity'],
  },
}
describe('benchmark release exclusion', () => {
  test('lock parser preserves comma-like text inside strings', () => {
    expect(parseLockfile('{"integrity":"literal,}","tuple":["quote\\"",],}')).toEqual({
      integrity: 'literal,}',
      tuple: ['quote"'],
    })
  })
  test('scoped parent resolution cannot select unrelated scoped benchmark dependency', () => {
    const scoped: any = structuredClone(lock)
    scoped.workspaces[''].devDependencies = { '@scope/build': '1.0.0' }
    scoped.packages['@scope/build'] = [
      '@scope/build@1.0.0',
      '',
      { dependencies: { helper: '1.0.0' } },
      'build-integrity',
    ]
    scoped.packages['@scope/helper'] = [
      '@scope/helper@2.0.0',
      '',
      {},
      'unrelated-benchmark-integrity',
    ]
    const projected = releaseLockProjection(scoped)
    expect(projected.packages.helper).toEqual(lock.packages.helper)
    expect(projected.packages['@scope/helper']).toBeUndefined()
  })
  test('benchmark-only commit produces no semantic release', async () => {
    const cache = resolve(import.meta.dir, '../../.cache')
    await mkdir(cache, { recursive: true })
    const directory = await mkdtemp(resolve(cache, 'benchmark-impact-'))
    const git = (...args: string[]) =>
      execFileSync('git', args, { cwd: directory, encoding: 'utf8' }).trim()
    const commit = () => {
      git('add', '.')
      git(
        '-c',
        'user.name=Benchmark test',
        '-c',
        'user.email=benchmark@example.invalid',
        'commit',
        '--no-gpg-sign',
        '-m',
        'feat: benchmark fixtures',
      )
      return git('rev-parse', 'HEAD')
    }
    try {
      git('init', '--quiet')
      const manifest = {
        private: true,
        scripts: { build: 'bun build' },
        workspaces: ['packages/*'],
      }
      await writeFile(resolve(directory, 'package.json'), JSON.stringify(manifest))
      await writeFile(resolve(directory, 'bun.lock'), JSON.stringify(lock))
      commit()
      await writeFile(
        resolve(directory, 'package.json'),
        JSON.stringify({
          ...manifest,
          scripts: { ...manifest.scripts, benchmark: 'bun scripts/benchmark.ts' },
        }),
      )
      const extended: any = structuredClone(lock)
      extended.workspaces['packages/benchmark'] = {
        name: 'kitsu-benchmark',
        devDependencies: { jsona: '1.0.0' },
      }
      extended.packages.jsona = ['jsona@1.0.0', '', {}, 'benchmark-integrity']
      await writeFile(resolve(directory, 'bun.lock'), JSON.stringify(extended))
      const hash = commit()
      expect(benchmarkOnlyChange(hash, 'package.json', directory)).toBe(true)
      expect(benchmarkOnlyChange(hash, 'bun.lock', directory)).toBe(true)
      expect(
        await analyzeCommits(
          {},
          {
            cwd: directory,
            commits: [{ hash, message: 'feat: benchmark fixtures' }],
            logger: { log: () => {} },
          },
        ),
      ).toBeNull()
      expect(affects('packages/benchmark/src/jsona/index.ts')).toBe(false)
      expect(affects('scripts/release/benchmark-impact.test.ts')).toBe(false)
      extended.packages.axios[3] = 'production-integrity-change'
      await writeFile(resolve(directory, 'bun.lock'), JSON.stringify(extended))
      expect(benchmarkOnlyChange(commit(), 'bun.lock', directory)).toBe(false)
    } finally {
      await rm(directory, { recursive: true, force: true, maxRetries: 10, retryDelay: 100 })
    }
  })
  test('ignores private workspace and its isolated dependency graph', () => {
    const extended: any = structuredClone(lock)
    extended.workspaces['packages/benchmark'] = {
      name: 'kitsu-benchmark',
      devDependencies: { devour: '1.0.0' },
    }
    extended.packages.devour = [
      'devour@1.0.0',
      '',
      { dependencies: { axios: '0.1.0' } },
      'devour-integrity',
    ]
    extended.packages['devour/axios'] = ['axios@0.1.0', '', {}, 'old-axios-integrity']
    expect(releaseLockProjection(extended)).toEqual(releaseLockProjection(lock))
  })
  test('retains production and build dependency changes', () => {
    for (const name of ['axios', 'helper', 'build']) {
      const changed: any = structuredClone(lock)
      changed.packages[name][3] = 'changed-integrity'
      expect(releaseLockProjection(changed)).not.toEqual(releaseLockProjection(lock))
    }
  })
  test('ignores benchmark commands but retains other root manifest changes', () => {
    const manifest = { private: true, scripts: { build: 'bun build' }, workspaces: ['packages/*'] }
    expect(
      releaseManifestProjection({
        ...manifest,
        scripts: { ...manifest.scripts, benchmark: 'bun scripts/benchmark.ts' },
      }),
    ).toEqual(manifest)
    expect(releaseManifestProjection({ ...manifest, scripts: { build: 'changed' } })).not.toEqual(
      manifest,
    )
  })
})
