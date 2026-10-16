import { fixtures } from './fixtures.ts'
import { libraries } from './libraries.ts'
import { validateReport } from './report.ts'
import type { Cell, Measurement } from './types.ts'

export interface Verification {
  passed: number
  misses: string[]
  unavailable: string[]
  provenance: string[]
}

/** Verify complete independent runs without turning unsupported APIs or failures into wins. */
export function verifyRuns(runs: Measurement[][]): Verification {
  if (runs.length !== 2) throw new Error('exactly two independent runs required')
  const cases = fixtures()
  const expected = libraries.length * 2 * 3 * cases.length
  const result: Verification = { passed: 0, misses: [], unavailable: [], provenance: [] }
  for (let run = 0; run < 2; run++) {
    if (runs[run].length !== 2 || new Set(runs[run].map((report) => report.runtime)).size !== 2)
      throw new Error('both runtimes required')
    for (const report of runs[run]) {
      validateReport(report)
      if (
        report.smoke ||
        report.partial ||
        report.baseSha ||
        !report.sourceHash ||
        report.cells.length !== expected
      )
        throw new Error('complete unpaired full runs with product fingerprints required')
      const previous = runs[0].find((entry) => entry.runtime === report.runtime) as Measurement
      if (
        report.harnessHash !== previous.harnessHash ||
        report.sourceHash !== previous.sourceHash ||
        report.runtimeVersion !== previous.runtimeVersion ||
        JSON.stringify(report.runner) !== JSON.stringify(previous.runner) ||
        JSON.stringify(report.versions) !== JSON.stringify(previous.versions)
      )
        throw new Error('benchmark environments or versions differ')
      if (run && report.measuredAt === previous.measuredAt)
        throw new Error('runs must have independent timestamps')
      if (
        report.harnessHash !== runs[run][0].harnessHash ||
        report.sourceHash !== runs[run][0].sourceHash ||
        JSON.stringify(report.versions) !== JSON.stringify(runs[run][0].versions)
      )
        throw new Error('runtime reports do not match')
      // Dirty working trees can be committed while identical built files are measured.
      // Product and harness fingerprints above remain mandatory; retain Git provenance.
      if (report.headSha !== runs[0][0].headSha)
        result.provenance.push(
          `run ${run + 1}/${report.runtime}: commit ${report.headSha} differs from ${runs[0][0].headSha}; built package and harness fingerprints match`,
        )
      const cells = new Map(
        report.cells.map(({ head }) => [
          `${head.library}/${head.suite}/${head.mode}/${head.fixture}`,
          head,
        ]),
      )
      for (const fixture of cases)
        for (const library of libraries)
          for (const suite of ['codec', 'client'])
            for (const mode of ['decode', 'encode', 'decode-encode']) {
              const cell = cells.get(`${library}/${suite}/${mode}/${fixture.id}`)
              if (
                !cell ||
                cell.fixtureHash !== fixture.hash ||
                cell.primaryCount !== fixture.primaryCount ||
                cell.includedCount !== fixture.includedCount
              )
                throw new Error('benchmark fixture matrix differs')
            }
      for (const fixture of cases)
        for (const mode of ['decode', 'encode'])
          for (const suite of ['codec', 'client']) {
            const library = suite === 'codec' ? 'kitsu-core' : 'kitsu-native'
            const key = `run ${run + 1}/${report.runtime}/${suite}/${mode}/${fixture.id}`
            const own = cells.get(`${library}/${suite}/${mode}/${fixture.id}`) as Cell
            if (own.status !== 'ok') {
              result.misses.push(`${key}: ${library} ${own.status}`)
              continue
            }
            if (suite === 'client' && mode === 'encode' && Array.isArray(fixture.document.data))
              continue
            const names =
              suite === 'codec'
                ? mode === 'decode'
                  ? ['devour', 'jsona']
                  : ['devour', 'jsona', 'ts-japi']
                : ['fetchja', 'devour', '@bjornharrtell/json-api']
            const peers = names.map(
              (name) => cells.get(`${name}/${suite}/${mode}/${fixture.id}`) as Cell,
            )
            const scored = peers.filter((cell) => cell.status === 'ok')
            for (const cell of peers)
              if (cell.status !== 'ok')
                result.unavailable.push(
                  `${key}: ${cell.library} ${cell.status}${cell.reason ? ` (${cell.reason})` : ''}`,
                )
            if (!scored.length) {
              result.misses.push(`${key}: no measurable competitor`)
              continue
            }
            const fastest = scored.reduce((left, right) =>
              (left.operationsPerSecond as number) >= (right.operationsPerSecond as number)
                ? left
                : right,
            )
            const ratio =
              (own.operationsPerSecond as number) / (fastest.operationsPerSecond as number)
            if (ratio >= 1.05) result.passed++
            else
              result.misses.push(
                `${key}: ${library} ${(own.operationsPerSecond as number).toFixed(2)} ops/s; ${fastest.library} ${(fastest.operationsPerSecond as number).toFixed(2)} ops/s; ${ratio.toFixed(3)}x (requires 1.050x)`,
              )
          }
    }
  }
  return result
}

export function renderVerification(result: Verification): string {
  return [
    `# Performance verification`,
    '',
    `${result.passed} comparisons pass; ${result.misses.length} miss 5% target.`,
    '',
    '## Misses',
    '',
    ...(result.misses.length ? result.misses.map((message) => `- ${message}`) : ['None.']),
    '',
    '## Unmeasured competitors (never counted as wins)',
    '',
    ...(result.unavailable.length
      ? result.unavailable.map((message) => `- ${message}`)
      : ['None.']),
    '',
    ...(result.provenance.length
      ? ['## Git provenance', '', ...result.provenance.map((message) => `- ${message}`), '']
      : []),
  ].join('\n')
}
