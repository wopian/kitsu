import { afterAll, describe, expect, test } from 'bun:test'
import { execFileSync } from 'node:child_process'
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { affects, analyzeCommits, generateNotes } from './impact.ts'
import { type Publisher, publishPlan, validatePlan } from './publish.ts'
import { integrity } from './stage.ts'
import type { ImpactContext, ReleasePlan } from './types.ts'

const cacheDirectory = join(import.meta.dir, '../../.cache')
await mkdir(cacheDirectory, { recursive: true })
const root = await mkdtemp(join(cacheDirectory, 'release-test-'))
afterAll(() => rm(root, { recursive: true, force: true, maxRetries: 10, retryDelay: 100 }))
const bytes = Buffer.from('immutable package fixture')
const plan: ReleasePlan = {
  schemaVersion: 1,
  sha: 'a'.repeat(40),
  version: '12.0.0',
  tag: 'v12.0.0',
  notes: 'ESM only',
  packages: ['kitsu-core', 'kitsu'].map((name) => ({
    name,
    filename: `${name}-12.0.0.tgz`,
    integrity: integrity(bytes),
  })) as ReleasePlan['packages'],
}
for (const entry of plan.packages) await writeFile(join(root, entry.filename), bytes)
function publisher(existing: Record<string, string> = {}) {
  const calls: string[] = []
  const driver: Publisher = {
    sha: () => plan.sha,
    tagSha: () => null,
    registryIntegrity: async (name) => existing[name] ?? null,
    async publish(filename) {
      const entry = plan.packages.find((p) => filename.endsWith(p.filename))
      if (!entry) throw new Error('Unknown tarball in publisher fixture')
      calls.push(entry.name)
      existing[entry.name] = entry.integrity
    },
    publishTag: () => {
      calls.push('tag')
    },
    publishRelease: () => {
      calls.push('release')
    },
  }
  return { calls, driver }
}
describe('release recovery', () => {
  test('publishes dependency first, then shared tag and release', async () => {
    const { driver, calls } = publisher()
    await publishPlan(plan, root, driver)
    expect(calls).toEqual(['kitsu-core', 'kitsu', 'tag', 'release'])
  })
  test('recovers partial publication without republishing core', async () => {
    const { driver, calls } = publisher({ 'kitsu-core': plan.packages[0].integrity })
    await publishPlan(plan, root, driver)
    expect(calls).toEqual(['kitsu', 'tag', 'release'])
  })
  test('waits for registry visibility without republishing', async () => {
    const { driver, calls } = publisher()
    const read = driver.registryIntegrity
    let missing = 2
    driver.registryIntegrity = async (name, version) => {
      if (calls.includes(name) && name === 'kitsu-core' && missing-- > 0) return null
      return read(name, version)
    }
    const delays: number[] = []
    await publishPlan(plan, root, driver, async (milliseconds) => {
      delays.push(milliseconds)
    })
    expect(delays).toEqual([2000, 4000])
    expect(calls).toEqual(['kitsu-core', 'kitsu', 'tag', 'release'])
  })
  test('stops after bounded registry visibility retries', async () => {
    const { driver, calls } = publisher()
    driver.registryIntegrity = async () => null
    const delays: number[] = []
    await expect(
      publishPlan(plan, root, driver, async (milliseconds) => {
        delays.push(milliseconds)
      }),
    ).rejects.toThrow('Publication verification failed: kitsu-core')
    expect(delays).toEqual([2000, 4000, 8000, 10000, 10000, 10000])
    expect(calls).toEqual(['kitsu-core'])
  })
  test('rejects conflicting publication without retrying or publishing client', async () => {
    const { driver, calls } = publisher()
    const read = driver.registryIntegrity
    driver.registryIntegrity = async (name, version) =>
      calls.includes(name) ? integrity(Buffer.from('different')) : read(name, version)
    const delays: number[] = []
    await expect(
      publishPlan(plan, root, driver, async (milliseconds) => {
        delays.push(milliseconds)
      }),
    ).rejects.toThrow('Published integrity mismatch: kitsu-core')
    expect(delays).toEqual([])
    expect(calls).toEqual(['kitsu-core'])
  })
  test('recovers tag/release failure without republishing either package', async () => {
    const { driver, calls } = publisher(
      Object.fromEntries(plan.packages.map((p) => [p.name, p.integrity])),
    )
    driver.tagSha = () => plan.sha
    await publishPlan(plan, root, driver)
    expect(calls).toEqual(['tag', 'release'])
  })
  test('rejects wrong SHA, conflicting tag, and malformed plan before writes', async () => {
    const { driver, calls } = publisher()
    driver.sha = () => 'b'.repeat(40)
    await expect(publishPlan(plan, root, driver)).rejects.toThrow('SHA differs')
    driver.sha = () => plan.sha
    driver.tagSha = () => 'b'.repeat(40)
    await expect(publishPlan(plan, root, driver)).rejects.toThrow('points elsewhere')
    expect(() => validatePlan({ ...plan, version: '1.0.0' })).toThrow('Invalid release plan')
    expect(() => validatePlan({ ...plan, packages: [...plan.packages].reverse() })).toThrow(
      'Invalid planned package',
    )
    expect(calls).toEqual([])
  })
  test('preflights every registry integrity before publishing anything', async () => {
    const { driver, calls } = publisher({ kitsu: integrity(Buffer.from('different')) })
    await expect(publishPlan(plan, root, driver)).rejects.toThrow('Published integrity mismatch')
    expect(calls).toEqual([])
  })
  test('rejects modified tarball before publishing anything', async () => {
    const { driver, calls } = publisher()
    const altered = {
      ...plan,
      packages: plan.packages.map((p) => ({
        ...p,
        integrity: integrity(Buffer.from('different')),
      })),
    }
    await expect(publishPlan(altered, root, driver)).rejects.toThrow('Tarball integrity mismatch')
    expect(calls).toEqual([])
  }, 60000)
})
describe('semantic analysis', () => {
  test('keeps documentation, tests, and examples outside release impact', () => {
    expect(affects('packages/kitsu/src/index.ts')).toBe(true)
    for (const path of [
      'README.md',
      'specification/index.ts',
      'packages/kitsu/src/get.spec.ts',
      'packages/kitsu/example/basic.ts',
    ])
      expect(affects(path)).toBe(false)
  })
  test('matches ZeepCentraal rules and starts ESM-only line at 12.0.0', async () => {
    const directory = join(root, 'git')
    await mkdir(directory)
    const git = (...args: string[]) =>
      execFileSync('git', ['-c', 'commit.gpgsign=false', ...args], {
        cwd: directory,
        encoding: 'utf8',
      }).trim()
    git('init', '-q')
    git('config', 'user.name', 'Release Test')
    git('config', 'user.email', 'release@example.test')
    const logger = { log() {} }
    const context: ImpactContext = {
      cwd: directory,
      commits: [],
      logger,
      options: { repositoryUrl: 'https://github.com/wopian/kitsu.git' },
    }
    for (const [message, expected] of [
      ['feat!: publish ESM-only packages\n\nBREAKING CHANGE: remove CommonJS and UMD', 'major'],
      ['feat: add option', 'minor'],
      ['fix: preserve output', 'patch'],
      ['perf: improve serialization', 'patch'],
      ['chore(deps): update dependency', 'patch'],
      ['refactor: migrate types', null],
      ['unconventional source change', 'patch'],
    ] as const) {
      await writeFile(join(directory, 'package.json'), JSON.stringify({ message }))
      git('add', '.')
      git('commit', '-qm', message)
      context.commits = [{ hash: git('rev-parse', 'HEAD'), message }]
      expect(await analyzeCommits({}, context)).toBe(expected)
    }
    context.commits[0].message =
      'feat!: publish ESM-only packages\n\nBREAKING CHANGE: remove CommonJS and UMD'
    context.lastRelease = { version: '11.1.1', gitTag: 'v11.1.1' }
    context.nextRelease = { version: '12.0.0', gitTag: 'v12.0.0' }
    expect(await analyzeCommits({}, context)).toBe('major')
    expect(await generateNotes({}, context)).toContain('BREAKING CHANGES')
    context.lastRelease = { version: '12.0.0', gitTag: 'v12.0.0' }
    await writeFile(join(directory, 'bun.lock'), 'changed')
    git('add', '.')
    git('commit', '-qm', 'build(deps): lock file maintenance')
    context.commits = [
      { hash: git('rev-parse', 'HEAD'), message: 'build(deps): lock file maintenance' },
    ]
    expect(await analyzeCommits({}, context)).toBe('patch')
    await writeFile(join(directory, 'README.md'), 'docs only')
    git('add', '.')
    git('commit', '-qm', 'feat: docs only')
    context.commits = [{ hash: git('rev-parse', 'HEAD'), message: 'feat: docs only' }]
    expect(await analyzeCommits({}, context)).toBeNull()
  }, 60000)
})
