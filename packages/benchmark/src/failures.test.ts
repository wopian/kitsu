import { describe, expect, test } from 'bun:test'
import { benchmarkFailures } from './failures.ts'
import { kitsuLibraries, libraries } from './libraries.ts'
import type { Cell, Measurement, Status } from './types.ts'

const cell = (library: string, status: Status): Cell => ({
  library,
  status,
  suite: 'codec',
  mode: 'decode',
  fixture: 'small-no-relationships',
  fixtureHash: 'a'.repeat(64),
  primaryCount: 1,
  includedCount: 0,
})
const report = (cells: Measurement['cells']): Measurement => ({
  schemaVersion: 1,
  harnessHash: 'b'.repeat(64),
  runtime: 'node',
  runtimeVersion: 'v26.5.0',
  runner: { os: 'linux', arch: 'x64', cpu: 'test' },
  versions: {},
  headSha: 'a'.repeat(40),
  smoke: true,
  measuredAt: '2026-10-16T00:00:00.000Z',
  cells,
})

describe('benchmark workflow failures', () => {
  for (const library of kitsuLibraries) {
    test.each(['incorrect', 'error', 'timeout'] as const)(
      `${library} %s fails the benchmark command`,
      (status) => {
        const head = cell(library, status)
        expect(benchmarkFailures([report([{ head }])])).toEqual([head])
      },
    )
    test.each(['ok', 'unsupported'] as const)(`${library} %s does not fail`, (status) => {
      expect(benchmarkFailures([report([{ head: cell(library, status) }])])).toEqual([])
    })
  }

  for (const library of libraries.filter((name) => !kitsuLibraries.includes(name))) {
    test.each(['ok', 'unsupported', 'incorrect', 'error', 'timeout'] as const)(
      `${library} %s remains informational`,
      (status) => {
        const head = cell(library, status)
        const input = report([{ head }])
        expect(benchmarkFailures([input])).toEqual([])
        expect(input.cells[0].head).toBe(head)
        expect(head.status).toBe(status)
      },
    )
  }

  test('older base failures do not fail a successful current revision', () => {
    const input = report(
      kitsuLibraries.flatMap((library) =>
        (['unsupported', 'incorrect', 'error', 'timeout'] as const).map((status) => ({
          head: cell(library, 'ok'),
          base: cell(library, status),
        })),
      ),
    )
    expect(benchmarkFailures([input])).toEqual([])
  })

  test('collects current failures across runtimes without counting competitors', () => {
    const first = cell('kitsu-core', 'incorrect')
    const second = cell('kitsu-native', 'timeout')
    expect(
      benchmarkFailures([
        report([{ head: cell('devour', 'timeout') }, { head: first }]),
        { ...report([{ head: second }, { head: cell('jsona', 'error') }]), runtime: 'bun' },
      ]),
    ).toEqual([first, second])
  })
})
