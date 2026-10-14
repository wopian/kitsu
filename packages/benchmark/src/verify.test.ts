import { describe, expect, test } from 'bun:test'
import { fixtures } from './fixtures.ts'
import { libraries } from './libraries.ts'
import type { Cell, Measurement } from './types.ts'
import { renderVerification, verifyRuns } from './verify.ts'

const cases = fixtures()
function runs(): Measurement[][] {
  return [0, 1].map((run) =>
    ['node', 'bun'].map((runtime) => ({
      schemaVersion: 1,
      harnessHash: 'a'.repeat(64),
      sourceHash: 'b'.repeat(64),
      headSha: 'c'.repeat(40),
      runtime,
      runtimeVersion: runtime === 'node' ? 'v26.5.0' : '1.4.3',
      runner: { os: 'win32', arch: 'x64', cpu: 'test' },
      versions: Object.fromEntries(libraries.map((name) => [name, '12.0.0'])),
      smoke: false,
      measuredAt: `2026-10-14T12:0${run}:00.000Z`,
      cells: cases.flatMap((fixture) =>
        libraries.flatMap((library) =>
          ['codec', 'client'].flatMap((suite) =>
            (['decode', 'encode', 'decode-encode'] as const).map((mode) => {
              const rate = library === 'kitsu-core' || library === 'kitsu-native' ? 200 : 100
              const head: Cell = {
                library,
                suite: suite as 'codec' | 'client',
                mode,
                fixture: fixture.id,
                fixtureHash: fixture.hash,
                primaryCount: fixture.primaryCount,
                includedCount: fixture.includedCount,
                status: 'ok',
                samples: [rate, rate, rate, rate, rate],
                operationsPerSecond: rate,
                ...(suite === 'client'
                  ? { requestsPerSecond: rate * (mode === 'decode-encode' ? 2 : 1) }
                  : {}),
              }
              return { head }
            }),
          ),
        ),
      ),
    })),
  )
}
function cell(reports: Measurement[][], library: string): Cell {
  const entry = reports[0][0].cells.find(
    ({ head }) => head.library === library && head.suite === 'codec' && head.mode === 'decode',
  )
  if (!entry) throw new Error('test cell missing')
  return entry.head
}
describe('performance verification', () => {
  test('checks every supported decode and encode scenario in two complete runs', () => {
    const result = verifyRuns(runs())
    expect(result.passed).toBe(200)
    expect(result.misses).toEqual([])
    expect(renderVerification(result)).toContain('200 comparisons pass; 0 miss 5% target.')
  })
  test('reports misses below 5% and never awards unavailable measurements as wins', () => {
    const reports = runs()
    const own = cell(reports, 'kitsu-core')
    own.operationsPerSecond = 104.99
    own.samples = Array(5).fill(104.99)
    let result = verifyRuns(reports)
    expect(result.misses).toHaveLength(1)
    expect(renderVerification(result)).toContain('requires 1.050x')
    for (const library of ['jsona', 'devour']) {
      const peer = cell(reports, library)
      peer.status = 'timeout'
      delete peer.samples
      delete peer.operationsPerSecond
    }
    result = verifyRuns(reports)
    expect(result.misses[0]).toContain('no measurable competitor')
    expect(result.unavailable).toHaveLength(2)
    expect(result.passed).toBe(199)
  })
  test('requires successful own results even when competitors are unavailable', () => {
    const reports = runs()
    const own = cell(reports, 'kitsu-core')
    own.status = 'error'
    delete own.samples
    delete own.operationsPerSecond
    expect(verifyRuns(reports).misses[0]).toContain('kitsu-core error')
  })
  test('rejects incomplete, smoke, paired and repeated runs', () => {
    expect(() => verifyRuns([])).toThrow('two independent')
    const reports = runs()
    expect(() => verifyRuns([reports[0], [reports[1][0]]])).toThrow('both runtimes')
    for (const change of [
      (report: Measurement) => {
        report.smoke = true
      },
      (report: Measurement) => {
        report.partial = true
      },
      (report: Measurement) => {
        report.baseSha = 'd'.repeat(40)
      },
      (report: Measurement) => {
        delete report.sourceHash
      },
      (report: Measurement) => {
        report.cells.pop()
      },
    ]) {
      const modified = structuredClone(reports)
      change(modified[1][0])
      expect(() => verifyRuns(modified)).toThrow('complete unpaired')
    }
    reports[1][0].measuredAt = reports[0][0].measuredAt
    expect(() => verifyRuns(reports)).toThrow('independent timestamps')
  })
  test('rejects changed products, environments, versions and fixture matrices', () => {
    for (const change of [
      (report: Measurement) => {
        report.sourceHash = 'f'.repeat(64)
      },
      (report: Measurement) => {
        report.harnessHash = 'f'.repeat(64)
      },
      (report: Measurement) => {
        report.runtimeVersion = 'different'
      },
      (report: Measurement) => {
        report.runner.cpu = 'different'
      },
      (report: Measurement) => {
        report.versions.jsona = 'different'
      },
    ]) {
      const reports = runs()
      change(reports[1][0])
      expect(() => verifyRuns(reports)).toThrow('environments or versions')
    }
    const reports = runs()
    reports[0][0].cells[0].head.fixtureHash = 'f'.repeat(64)
    expect(() => verifyRuns(reports)).toThrow('fixture matrix')
  })
})
