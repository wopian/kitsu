import { describe, expect, test } from 'bun:test'
import { libraries } from './adapters.ts'
import { type GitHubApi, publishReports } from './publish.ts'
import { commentMarker } from './report.ts'
import type { Measurement } from './types.ts'

const headSha = 'a'.repeat(40)
const baseSha = 'b'.repeat(40)
const repository = 'wopian/kitsu'
const markdown = 'before\n<!-- benchmark:start -->\nold\n<!-- benchmark:end -->\nafter'
const fixtures = [
  'small-no-relationships',
  'small-links-only',
  'small-relationships',
  'nested-relationships',
  'collection',
  'collection-includes',
  'patch-single',
  'empty-relationships',
  'few-includes',
  'many-includes',
  'complex-relationships',
  'wide-relationship',
  'self-cycle',
  'mutual-cycle',
]
function reports(paired = false): Measurement[] {
  return ['node', 'bun'].map((runtime) => ({
    schemaVersion: 1,
    harnessHash: 'c'.repeat(64),
    runtime,
    runtimeVersion: runtime === 'node' ? 'v26.5.0' : '1.4.3',
    runner: { os: 'linux', arch: 'x64', cpu: 'test' },
    versions: Object.fromEntries(libraries.map((name) => [name, '1.0.0'])),
    headSha,
    baseSha: paired ? baseSha : undefined,
    smoke: false,
    measuredAt: '2026-10-13T00:00:00.000Z',
    cells: fixtures.flatMap((fixture) =>
      libraries.flatMap((library) =>
        ['codec', 'client'].flatMap((suite) =>
          ['decode', 'encode', 'decode-encode'].map((mode) => {
            const cell: any = {
              library,
              suite,
              mode,
              fixture,
              fixtureHash: 'd'.repeat(64),
              primaryCount: 1,
              includedCount: 0,
              status: 'ok',
              samples: [100, 100, 100, 100, 100],
              operationsPerSecond: 100,
              ...(suite === 'client'
                ? { requestsPerSecond: mode === 'decode-encode' ? 200 : 100 }
                : {}),
            }
            return { head: cell, ...(paired ? { base: { ...cell } } : {}) }
          }),
        ),
      ),
    ),
  }))
}
function github(event = 'push', stale = false, existing = false) {
  const writes: { path: string; method: string; body: any }[] = []
  const api: GitHubApi = async (path, method = 'GET', body) => {
    if (method !== 'GET') {
      writes.push({ path, method, body })
      return { sha: 'e'.repeat(40) }
    }
    if (path === 'actions/runs/1')
      return {
        name: 'Benchmark',
        status: 'completed',
        event,
        repository: { full_name: repository },
        head_sha: headSha,
        head_branch: 'master',
        pull_requests: [{ number: 7, head: { sha: headSha } }],
      }
    if (path === 'git/ref/heads/master') return { object: { sha: stale ? baseSha : headSha } }
    if (path.startsWith('contents/README.md'))
      return { content: Buffer.from(markdown).toString('base64') }
    if (path.startsWith('git/commits/')) return { tree: { sha: 'f'.repeat(40) } }
    if (path === 'pulls/7')
      return {
        number: 7,
        state: 'open',
        merge_commit_sha: headSha,
        head: { sha: stale ? baseSha : headSha, repo: { full_name: 'contributor/kitsu' } },
        base: { sha: baseSha, repo: { full_name: repository } },
      }
    if (path.startsWith('issues/7/comments'))
      return existing
        ? [{ id: 8, user: { login: 'github-actions[bot]' }, body: commentMarker }]
        : []
    throw new Error(`unexpected API read: ${path}`)
  }
  return { api, writes }
}

describe('trusted benchmark publication', () => {
  test('master changes only README tree entry with non-forced branch update', async () => {
    const { api, writes } = github()
    await publishReports(reports(), repository, '1', api)
    expect(writes.find((entry) => entry.path === 'git/trees')?.body.tree).toEqual([
      { path: 'README.md', mode: '100644', type: 'blob', sha: 'e'.repeat(40) },
    ])
    expect(writes.at(-1)).toEqual({
      path: 'git/refs/heads/master',
      method: 'PATCH',
      body: { sha: 'e'.repeat(40), force: false },
    })
    expect(writes.find((entry) => entry.path === 'git/blobs')?.body.content).toStartWith('before\n')
    expect(writes.find((entry) => entry.path === 'git/blobs')?.body.content).toEndWith('\nafter')
  })
  test('stale master run cannot publish', async () => {
    const { api, writes } = github('push', true)
    await publishReports(reports(), repository, '1', api)
    expect(writes).toHaveLength(0)
  })
  test('fork PR uses verified GitHub association and updates existing comment', async () => {
    const { api, writes } = github('pull_request', false, true)
    await publishReports(reports(true), repository, '1', api)
    expect(writes).toHaveLength(1)
    expect(writes[0].path).toBe('issues/comments/8')
    expect(writes[0].method).toBe('PATCH')
    expect(writes[0].body.body.length).toBeLessThan(65536)
  })
  test('first PR run creates one comment', async () => {
    const { api, writes } = github('pull_request')
    await publishReports(reports(true), repository, '1', api)
    expect(writes[0].path).toBe('issues/7/comments')
    expect(writes[0].method).toBe('POST')
  })
  test('accepts workflow runs identified by proposed merge SHA', async () => {
    const { api, writes } = github('pull_request')
    const merged: GitHubApi = async (path, method, body) => {
      const value = await api(path, method, body)
      if (path === 'pulls/7') value.head.sha = baseSha
      if (path === 'actions/runs/1') value.pull_requests[0].head.sha = baseSha
      return value
    }
    await publishReports(reports(true), repository, '1', merged)
    expect(writes).toHaveLength(1)
  })
  test('stale PR run cannot publish', async () => {
    const { api, writes } = github('pull_request', true)
    await publishReports(reports(true), repository, '1', api)
    expect(writes).toHaveLength(0)
  })
  test('smoke, partial master, and wrong base SHA reports cannot publish', async () => {
    for (const kind of ['smoke', 'partial', 'base']) {
      const { api, writes } = github(kind === 'base' ? 'pull_request' : 'push')
      const data = reports(kind === 'base')
      if (kind === 'smoke') data[0].smoke = true
      if (kind === 'partial') data[0].cells.pop()
      if (kind === 'base') data[0].baseSha = 'e'.repeat(40)
      await expect(publishReports(data, repository, '1', api)).rejects.toThrow()
      expect(writes).toHaveLength(0)
    }
  })
})
