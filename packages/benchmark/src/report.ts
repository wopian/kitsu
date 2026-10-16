import { readFile, writeFile } from 'node:fs/promises'
import { libraries } from './libraries.ts'
import type { Cell, Measurement } from './types.ts'

export const startMarker = '<!-- benchmark:start -->'
export const endMarker = '<!-- benchmark:end -->'
export const commentMarker = '<!-- kitsu-benchmark-comment -->'
const escape = (value: string) =>
  value
    .replace(/[\r\n]/g, ' ')
    .replace(/[\\|`*_{}[\]()#+.!<>]/g, '\\$&')
    .slice(0, 480)
const number = (value: number) =>
  value.toLocaleString('en-US', { maximumFractionDigits: value < 100 ? 2 : 0 })
const rate = (cell: Cell) =>
  cell.status === 'ok'
    ? number(cell.requestsPerSecond ?? (cell.operationsPerSecond as number))
    : cell.status
const scenarioKey = (cell: Cell) => [cell.suite, cell.mode, cell.fixture].join('/')
const referenceLibrary = (cell: Cell) => (cell.suite === 'codec' ? 'kitsu-core' : 'kitsu')
const throughput = (cell: Cell) => cell.requestsPerSecond ?? (cell.operationsPerSecond as number)
function comparisons(cells: Cell[]) {
  const references = new Map<string, Cell>()
  const fastest = new Map<string, number>()
  for (const cell of cells) {
    const key = scenarioKey(cell)
    if (cell.library === referenceLibrary(cell)) references.set(key, cell)
    if (cell.status === 'ok') fastest.set(key, Math.max(fastest.get(key) ?? 0, throughput(cell)))
  }
  return {
    multiplier(cell: Cell): string {
      if (cell.library === referenceLibrary(cell)) return '1x'
      const reference = references.get(scenarioKey(cell))
      if (
        cell.status !== 'ok' ||
        reference?.status !== 'ok' ||
        reference.fixtureHash !== cell.fixtureHash
      )
        return '—'
      const ratio = throughput(cell) / throughput(reference)
      if (ratio === 1) return '1x'
      const factor = number(ratio > 1 ? ratio : 1 / ratio)
      return `${factor === '1' ? '<1.01' : factor}x ${ratio > 1 ? 'faster' : 'slower'}`
    },
    winner(cell: Cell): boolean {
      return cell.status === 'ok' && throughput(cell) === fastest.get(scenarioKey(cell))
    },
  }
}
const row = (values: string[], bold: boolean) =>
  `| ${values.map((value) => (bold && value ? `**${value}**` : value)).join(' | ')} |`
export function compare(base: Cell | undefined, head: Cell): string {
  if (!base) return 'no baseline'
  if (base.fixtureHash !== head.fixtureHash) return 'incomparable'
  if (base.status !== 'ok' || head.status !== 'ok') return `${base.status} / ${head.status}`
  const percentage =
    ((head.operationsPerSecond as number) / (base.operationsPerSecond as number) - 1) * 100
  if (!percentage) return 'unchanged'
  // Keep direction for changes smaller than display precision too.
  const amount = Math.abs(percentage) < 0.01 ? '<0.01' : Math.abs(percentage).toFixed(2)
  return `${amount}% ${percentage > 0 ? 'faster' : 'slower'}`
}

export function replaceReadme(markdown: string, generated: string): string {
  const first = markdown.indexOf(startMarker)
  const last = markdown.indexOf(endMarker)
  if (
    first < 0 ||
    last < first ||
    markdown.indexOf(startMarker, first + 1) >= 0 ||
    markdown.indexOf(endMarker, last + 1) >= 0
  )
    throw new Error('README requires exactly one benchmark marker pair')
  return `${markdown.slice(0, first + startMarker.length)}\n${generated.trim()}\n${markdown.slice(last)}`
}

export function renderReadme(reports: Measurement[], runUrl?: string): string {
  const output = [
    '## Benchmarks',
    '',
    'JSON:API codec operations/s and mocked client requests/s. Higher is faster. No network traffic.',
    '',
    'Median of five samples after warmup. Codec timings exclude JSON text parsing/stringification. Client timings include native client conversion and mocked transport overhead.',
    '',
    'Bold rows mark the fastest library per runtime, suite, mode, and scenario, including ties. Multipliers compare codecs with kitsu-core and clients with kitsu (1x). A 3x slower library runs at one third the reference rate. Missing reference scores show —.',
    '',
    'Reproduce: `bun run build && bun run benchmark`. Quick check: `bun run benchmark:smoke`.',
    '',
  ]
  if (runUrl) output.push(`[CI run and raw results](${runUrl})`, '')
  else output.push('Local measurements. Master CI refreshes this section automatically.', '')
  for (const report of reports) {
    const comparison = comparisons(report.cells.map(({ head }) => head))
    output.push(
      `### ${escape(report.runtime)} ${escape(report.runtimeVersion)}${report.smoke ? ' (smoke; not publication results)' : ''}`,
      '',
      `${report.dirty ? 'Base commit (local changes measured)' : 'Measured commit'}: \`${report.headSha}\`. Runner: ${escape(report.runner.os)} ${escape(report.runner.arch)}, ${escape(report.runner.cpu)}.`,
      '',
      ...(report.sourceHash ? [`Built package fingerprint: \`${report.sourceHash}\`.`, ''] : []),
      `Library versions: ${Object.entries(report.versions)
        .map(([name, version]) => `${escape(name)} ${escape(version)}`)
        .join(', ')}.`,
      '',
    )
    for (const suite of ['codec', 'client']) {
      output.push(
        `<details><summary>${suite === 'codec' ? 'Codec operations/s' : 'Mocked client requests/s'}</summary>`,
        '',
      )
      const cells = report.cells.filter(
        ({ head }) => head.suite === suite && head.reason !== `no public ${suite} API`,
      )
      for (const mode of ['decode', 'encode', 'decode-encode']) {
        output.push(
          `#### ${mode}`,
          '',
          `| Scenario | Library | Rate | vs ${suite === 'codec' ? 'kitsu-core' : 'kitsu'} | Detail |`,
          '| --- | --- | ---: | ---: | --- |',
        )
        for (const { head } of cells.filter(({ head }) => head.mode === mode)) {
          const cycle =
            suite === 'client' && mode === 'decode-encode' && head.status === 'ok'
              ? `${number(head.operationsPerSecond as number)} cycles/s`
              : (head.reason ?? '')
          output.push(
            row(
              [head.fixture, head.library, rate(head), comparison.multiplier(head), escape(cycle)],
              comparison.winner(head),
            ),
          )
        }
        output.push('')
      }
      output.push('</details>', '')
    }
  }
  output.push(
    '',
    '- Codec APIs: kitsu-core, devour, yayson, jsona, ts-japi (encode only).',
    '- Client APIs: kitsu, fetchja, devour. Public single-resource clients report collection writes as unsupported.',
    '',
    'Full fixtures use 1,000 primary resources, 3 shared or 3,000 distinct includes, a complex graph with 21,016 includes and one wide relationship with 4,000 identifiers.',
    '',
  )
  return output.join('\n')
}

export function renderComment(reports: Measurement[], runUrl: string): string {
  const lines = [
    commentMarker,
    '## JSON:API benchmark changes',
    '',
    'Every throughput change is labeled faster/slower; labels do not imply statistical significance. Bold rows mark PR winners per runtime, suite, mode, and scenario, including ties.',
    '',
    'Multipliers compare codecs with kitsu-core and clients with kitsu (1x), separately for base and PR. A 3x slower library runs at one third the reference rate. Missing reference scores show —.',
    '',
    `[CI run and complete results](${runUrl})`,
    '',
  ]
  // Reserve comment space for both runtimes' Kitsu results before competitor detail.
  for (const own of [true, false]) {
    for (const report of reports) {
      const headComparison = comparisons(report.cells.map(({ head }) => head))
      const baseComparison = comparisons(report.cells.flatMap(({ base }) => (base ? [base] : [])))
      lines.push(
        `### ${report.runtime} ${escape(report.runtimeVersion)}`,
        '',
        `Base \`${report.baseSha ?? 'unavailable'}\`; proposed merge \`${report.headSha}\`.`,
        '',
      )
      if (!own) lines.push('<details><summary>Competitor changes</summary>', '')
      lines.push(
        '| Suite / mode / scenario | Library | Base | PR | Change | vs Kitsu base / PR |',
        '| --- | --- | ---: | ---: | --- | ---: |',
      )
      for (const { base, head } of report.cells) {
        if (
          ['kitsu', 'kitsu-core'].includes(head.library) !== own ||
          head.reason === `no public ${head.suite} API`
        )
          continue
        const line = row(
          [
            scenarioKey(head),
            head.library,
            base ? rate(base) : '—',
            rate(head),
            compare(base, head),
            `${base ? baseComparison.multiplier(base) : '—'} / ${headComparison.multiplier(head)}`,
          ],
          headComparison.winner(head),
        )
        // GitHub issue comments have a 65,536-character limit. Raw artifact retains all cells.
        if (lines.join('\n').length + line.length > 59000) {
          lines.push('', 'Remaining rows available in complete results linked above.')
          break
        }
        lines.push(line)
      }
      lines.push('')
      if (!own) lines.push('</details>', '')
    }
  }
  return lines.join('\n').slice(0, 62000)
}

/** Artifacts are untrusted data. Bound text and validate every rendered measurement. */
export function validateReport(value: any): asserts value is Measurement {
  const string = (entry: any, limit = 240) => typeof entry === 'string' && entry.length <= limit
  const hash = (entry: any, length: number) =>
    string(entry, length) && new RegExp(`^[a-f0-9]{${length}}$`).test(entry)
  const positive = (entry: any) =>
    typeof entry === 'number' && Number.isFinite(entry) && entry > 0 && entry < 1e12
  if (
    value?.schemaVersion !== 1 ||
    !hash(value.harnessHash, 64) ||
    (value.sourceHash !== undefined && !hash(value.sourceHash, 64)) ||
    (value.dirty !== undefined && typeof value.dirty !== 'boolean') ||
    !hash(value.headSha, 40) ||
    (value.baseSha !== undefined && !hash(value.baseSha, 40)) ||
    !['node', 'bun'].includes(value.runtime) ||
    !string(value.runtimeVersion) ||
    typeof value.smoke !== 'boolean' ||
    (value.partial !== undefined && typeof value.partial !== 'boolean') ||
    !string(value.measuredAt) ||
    !value.runner ||
    !['os', 'arch', 'cpu'].every((key) => string(value.runner[key])) ||
    !value.versions ||
    !libraries.every((name) => string(value.versions[name], 80)) ||
    !Array.isArray(value.cells) ||
    value.cells.length > 1500
  )
    throw new Error('invalid benchmark report')
  const seen = new Set<string>()
  for (const pair of value.cells) {
    if (!pair?.head) throw new Error('missing head cell')
    for (const cell of [pair.head, ...(pair.base ? [pair.base] : [])]) {
      if (
        !libraries.includes(cell.library) ||
        !['codec', 'client'].includes(cell.suite) ||
        !['decode', 'encode', 'decode-encode'].includes(cell.mode) ||
        !string(cell.fixture, 80) ||
        !/^[a-z0-9-]+$/.test(cell.fixture) ||
        !hash(cell.fixtureHash, 64) ||
        !['primaryCount', 'includedCount'].every(
          (key) => Number.isInteger(cell[key]) && cell[key] >= 0 && cell[key] <= 100000,
        ) ||
        !['ok', 'unsupported', 'incorrect', 'error', 'timeout'].includes(cell.status) ||
        (cell.reason !== undefined && !string(cell.reason))
      )
        throw new Error('invalid benchmark cell')
      if (cell.status === 'ok') {
        if (
          !Array.isArray(cell.samples) ||
          cell.samples.length !== 5 ||
          !cell.samples.every(positive) ||
          !positive(cell.operationsPerSecond)
        )
          throw new Error('invalid throughput samples')
        const sorted = cell.samples.toSorted((left: number, right: number) => left - right)
        if (cell.operationsPerSecond !== sorted[2])
          throw new Error('throughput differs from median')
        const requests = cell.operationsPerSecond * (cell.mode === 'decode-encode' ? 2 : 1)
        if (
          cell.suite === 'client'
            ? cell.requestsPerSecond !== requests
            : cell.requestsPerSecond !== undefined
        )
          throw new Error('invalid requests per second')
      } else if (
        cell.samples !== undefined ||
        cell.operationsPerSecond !== undefined ||
        cell.requestsPerSecond !== undefined
      )
        throw new Error('failed cell contains numeric score')
    }
    const key = [pair.head.library, pair.head.suite, pair.head.mode, pair.head.fixture].join('/')
    if (seen.has(key)) throw new Error('duplicate benchmark cell')
    seen.add(key)
    if (
      pair.base &&
      ['library', 'suite', 'mode', 'fixture'].some((key) => pair.base[key] !== pair.head[key])
    )
      throw new Error('base/head cell mismatch')
  }
}

export async function readReport(filename: string): Promise<Measurement> {
  const bytes = await readFile(filename)
  if (bytes.length > 2_000_000) throw new Error('benchmark artifact exceeds size limit')
  const value = JSON.parse(bytes.toString('utf8'))
  validateReport(value)
  return value
}

export async function updateReadme(
  filename: string,
  reports: Measurement[],
  runUrl?: string,
): Promise<void> {
  await writeFile(
    filename,
    replaceReadme(await readFile(filename, 'utf8'), renderReadme(reports, runUrl)),
  )
}
