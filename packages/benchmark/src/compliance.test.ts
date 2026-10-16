import { describe, expect, test } from 'bun:test'
import { resolve } from 'node:path'
import { supported } from './adapters.ts'
import {
  type ComplianceReport,
  checkCompliance,
  complianceCases,
  complianceCells,
  renderCompliance,
  replaceCompliance,
  validateComplianceReport,
} from './compliance.ts'
import { libraries } from './libraries.ts'
import { replaceReadme } from './report.ts'

const root = resolve(import.meta.dir, '../../..')
function reports(): ComplianceReport[] {
  return (['node', 'bun'] as const).map((runtime) => ({
    schemaVersion: 1,
    runtime,
    runtimeVersion: 'test',
    measuredAt: '2026-10-16T18:00:00.000Z',
    sourceHash: 'a'.repeat(64),
    harnessHash: 'b'.repeat(64),
    versions: Object.fromEntries(libraries.map((library) => [library, '1.0.0'])),
    cells: libraries.flatMap((library) =>
      (['client', 'codec'] as const).flatMap((suite) =>
        supported(library, suite)
          ? (['1.0', '1.1'] as const).flatMap((version) =>
              complianceCases
                .filter(
                  (test) =>
                    (!test.version || test.version === version) &&
                    (!test.clientOnly || suite === 'client'),
                )
                .map((test) => ({
                  library,
                  suite,
                  version,
                  test: test.id,
                  status: 'pass' as const,
                })),
            )
          : [],
      ),
    ),
  }))
}

describe('shared JSON:API compatibility checks', () => {
  test('scenarios have unique names, version links, and literal expectations', () => {
    expect(new Set(complianceCases.map((test) => test.id)).size).toBe(complianceCases.length)
    expect(complianceCases.filter((test) => test.version === '1.1')).toHaveLength(5)
    expect(complianceCases.some((test) => test.clientOnly)).toBe(true)
    for (const scenario of complianceCases) {
      expect(scenario.section.length).toBeGreaterThan(0)
      expect(scenario.document).toBeDefined()
    }
  })
  for (const [library, suite] of [
    ['kitsu-core', 'codec'],
    ['kitsu-native', 'client'],
    ['kitsu', 'client'],
  ] as const)
    test(`${library} passes listed 1.0 and 1.1 checks through public APIs`, async () => {
      const originalFetch = globalThis.fetch
      const cells = await complianceCells(library, suite, root, true)
      expect(cells.filter((cell) => cell.status !== 'pass')).toEqual([])
      expect(new Set(cells.map((cell) => cell.version))).toEqual(new Set(['1.0', '1.1']))
      expect(globalThis.fetch).toBe(originalFetch)
    })

  test('unsupported decoders and incorrect relationship behavior never count as passes', async () => {
    const decode = complianceCases.find(
      (test) => test.id === 'Read single resource',
    ) as (typeof complianceCases)[number]
    const unsupported = await checkCompliance('ts-japi', 'codec', '1.0', decode, root)
    expect(unsupported.status).toBe('unsupported')
    expect(unsupported.reason).toBe('no public decoder')
    const empty = complianceCases.find(
      (test) => test.id === 'Read empty to-many relationship',
    ) as (typeof complianceCases)[number]
    const originalFetch = globalThis.fetch
    const incorrect = await checkCompliance('@bjornharrtell/json-api', 'client', '1.1', empty, root)
    expect(incorrect.status).toBe('incorrect')
    expect(incorrect.reason).toContain('cardinality differs')
    expect(globalThis.fetch).toBe(originalFetch)
  })

  test('uses public metadata accessors instead of reporting adapter shape differences as failures', async () => {
    const scenario = complianceCases.find(
      (test) => test.id === 'Read resource metadata',
    ) as (typeof complianceCases)[number]
    for (const [library, suite] of [
      ['yayson', 'codec'],
      ['@bjornharrtell/json-api', 'client'],
    ] as const) {
      const cell = await checkCompliance(library, suite, '1.1', scenario, root)
      expect(cell.status).toBe('pass')
    }
  })

  test('renders check marks only when both runtimes pass and includes failure reasons', () => {
    const values = reports()
    const first = values[1].cells.find(
      (cell) =>
        cell.library === '@bjornharrtell/json-api' &&
        cell.suite === 'client' &&
        cell.version === '1.0',
    ) as ComplianceReport['cells'][number]
    first.status = 'unsupported'
    first.reason = 'no public decoder'
    const markdown = renderCompliance(values)
    expect(markdown).toContain(
      '| Tested behavior | kitsu-native | kitsu | fetchja | devour | @bjornharrtell/json-api |',
    )
    expect(markdown).toContain(
      '| [Read single resource](https://jsonapi.org/format/1.0/#document-structure) | ✅ | ✅ | ✅ | ✅ | ❌ |',
    )
    expect(markdown).toContain('unsupported; no public decoder')
    expect(markdown).toContain('### JSON:API 1.1')
    expect(markdown).toContain('#### Codecs')
    const partial = renderCompliance([values[0]])
    expect(partial).not.toContain('| ✅')
    values[1].cells.pop()
    expect(renderCompliance(values)).toContain('❌')
  })

  test('rejects malformed, duplicate, or incompatible reports and escapes failure text', () => {
    const values = reports()
    expect(() => validateComplianceReport(values[0])).not.toThrow()
    expect(() => renderCompliance([values[0], values[0]])).toThrow('runtimes')
    const duplicate = structuredClone(values[0])
    duplicate.cells.push(duplicate.cells[0])
    expect(() => validateComplianceReport(duplicate)).toThrow('Duplicate')
    const mismatch = structuredClone(values)
    mismatch[1].sourceHash = 'c'.repeat(64)
    expect(() => renderCompliance(mismatch)).toThrow('environments')
    values[0].cells[0].status = 'incorrect'
    values[0].cells[0].reason = '[fake](https://example.invalid) </details>\n'
    expect(renderCompliance(values)).not.toContain('incorrect; [fake]')
    expect(renderCompliance(values)).not.toMatch(/[ \t]+\n/)
    expect(() => validateComplianceReport({ ...values[0], sourceHash: '<script>' })).toThrow(
      'Invalid',
    )
  })

  test('keeps compatibility separate from regenerated performance tables', () => {
    const markdown = 'before\n<!-- benchmark:start -->\nold\n<!-- benchmark:end -->\nafter\n'
    const withCompliance = replaceCompliance(markdown, 'compatibility')
    expect(withCompliance.indexOf('<!-- compliance:start -->')).toBeLessThan(
      withCompliance.indexOf('after'),
    )
    const updated = replaceReadme(withCompliance, 'new performance')
    expect(updated).toContain('<!-- compliance:start -->\ncompatibility\n<!-- compliance:end -->')
    expect(replaceCompliance(updated, 'new compatibility')).toContain(
      '<!-- benchmark:start -->\nnew performance\n<!-- benchmark:end -->',
    )
    expect(() => replaceCompliance('<!-- compliance:start -->', 'invalid')).toThrow('markers')
    expect(() =>
      replaceCompliance(`${withCompliance}\n<!-- compliance:start -->`, 'invalid'),
    ).toThrow('markers')
  })
})
