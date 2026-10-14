import { describe, expect, test } from 'bun:test'
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import errors from '../../../specification/getError/jsonapi.ts'
import { createAdapter, libraries, supported } from './adapters.ts'
import { fixture, fixtures, validateDocument } from './fixtures.ts'
import {
  expectedRequest,
  touchGraph,
  validateDecoded,
  validateEncoded,
  wrappedView,
} from './graph.ts'
import { change, median, operation, validateOperation } from './measure.ts'
import {
  compare,
  readReport,
  renderComment,
  renderReadme,
  replaceReadme,
  validateReport,
} from './report.ts'
import type { Cell, Measurement } from './types.ts'

const root = resolve(import.meta.dir, '../../..')
const cases = fixtures(true)
const cell: Cell = {
  library: 'kitsu-core',
  suite: 'codec',
  mode: 'decode',
  fixture: 'small-no-relationships',
  fixtureHash: 'a'.repeat(64),
  primaryCount: 1,
  includedCount: 0,
  status: 'ok',
  samples: [80, 90, 100, 110, 120],
  operationsPerSecond: 100,
}
const report: Measurement = {
  schemaVersion: 1,
  harnessHash: 'b'.repeat(64),
  runtime: 'node',
  runtimeVersion: 'v26.5.0',
  runner: { os: 'linux', arch: 'x64', cpu: 'test' },
  versions: Object.fromEntries(libraries.map((name) => [name, '1.0.0'])),
  headSha: 'a'.repeat(40),
  baseSha: 'b'.repeat(40),
  smoke: false,
  measuredAt: '2026-10-13T00:00:00.000Z',
  cells: [
    { head: cell, base: { ...cell, samples: [40, 45, 50, 55, 60], operationsPerSecond: 50 } },
  ],
}

describe('JSON:API fixtures and correctness', () => {
  test('retains deterministic specification data and stress counts', () => {
    expect(cases.map((entry) => entry.hash)).toEqual(fixtures(true).map((entry) => entry.hash))
    const full = fixtures()
    expect(full.find((entry) => entry.id === 'few-includes')?.includedCount).toBe(3)
    expect(full.find((entry) => entry.id === 'many-includes')?.includedCount).toBe(3000)
    expect(full.find((entry) => entry.id === 'complex-relationships')?.includedCount).toBe(21016)
    for (const entry of full) expect(() => validateDocument(entry.document)).not.toThrow()
  })
  test('rejects conflicting fields, duplicate identities and unreachable includes', () => {
    expect(() => fixture('invalid', { data: { type: 'people', id: 1 } })).toThrow('strings')
    expect(() =>
      fixture('invalid', { data: { type: 'people', id: '1', attributes: { id: '2' } } }),
    ).toThrow('conflicting')
    expect(() =>
      fixture('invalid', {
        data: [
          { type: 'people', id: '1' },
          { type: 'people', id: '1' },
        ],
      }),
    ).toThrow('duplicate')
    expect(() =>
      fixture('invalid', {
        data: { type: 'people', id: '1' },
        included: [{ type: 'people', id: '2' }],
      }),
    ).toThrow('full linkage')
  })
  test('traversal preserves collection output and handles cycles', () => {
    const entry = cases.find((entry) => entry.id === 'few-includes') as (typeof cases)[number]
    const output: any = { data: [{ type: 'articles', id: '1' }] }
    output.data[0].author = { data: output.data[0] }
    touchGraph(output, wrappedView, entry)
    expect(output.data).toHaveLength(1)
  })
  test('rejects missing included attributes and nested resource objects in request linkage', () => {
    const entry = cases.find(
      (entry) => entry.id === 'small-relationships',
    ) as (typeof cases)[number]
    expect(() =>
      validateDecoded({ data: { type: 'articles', id: '1' } }, wrappedView, entry),
    ).toThrow()
    const payload = expectedRequest(entry)
    payload.data.relationships.author.data.attributes = { number: 0 }
    expect(() => validateEncoded(payload, entry)).toThrow('resource object')
  })
  test('collection encode retains source attributes and linkage', () => {
    const entry = cases.find((entry) => entry.id === 'many-includes') as (typeof cases)[number]
    expect(() => validateEncoded(expectedRequest(entry), entry)).not.toThrow()
  })
  test('error specification remains a correctness case outside success throughput', async () => {
    expect(() => validateDocument(errors)).not.toThrow()
    const adapter = await createAdapter('kitsu-core', 'codec', cases[0], root, true)
    expect(adapter.decode(structuredClone(errors))).toEqual(errors)
  })
})

describe('public adapter integration', () => {
  test('isolated runtimes bind each client to its own built core', async () => {
    const cache = resolve(root, '.cache')
    await mkdir(cache, { recursive: true })
    const directory = await mkdtemp(resolve(cache, 'benchmark-binding-'))
    try {
      for (const name of ['base', 'head']) {
        const checkout = resolve(directory, name)
        const core = resolve(checkout, 'node_modules/kitsu-core')
        const client = resolve(checkout, 'packages/kitsu/dist')
        await mkdir(core, { recursive: true })
        await mkdir(client, { recursive: true })
        await writeFile(
          resolve(core, 'package.json'),
          JSON.stringify({ type: 'module', exports: './index.mjs' }),
        )
        await writeFile(
          resolve(core, 'index.mjs'),
          `export function deserialise(document) { return { data: { id: document.data.id, type: document.data.type, ...document.data.attributes, ${name === 'base' ? "string: 'wrong'" : ''} } }; }`,
        )
        await writeFile(
          resolve(client, 'index.mjs'),
          `import { deserialise } from 'kitsu-core'; export default class Kitsu { constructor(options) { this.options = options; } async request() { const response = await this.options.axiosOptions.adapter({ method: 'get' }); return deserialise(JSON.parse(response.data)); } }`,
        )
      }
      for (const runtime of ['node', 'bun']) {
        const argumentsList =
          runtime === 'bun'
            ? [
                process.execPath,
                '--tsconfig-override',
                resolve(root, 'packages/benchmark/tsconfig.runtime.json'),
              ]
            : ['node', '--experimental-strip-types']
        const result = Bun.spawnSync(
          [
            ...argumentsList,
            resolve(root, 'packages/benchmark/src/worker.ts'),
            JSON.stringify({
              library: 'kitsu',
              suite: 'client',
              mode: 'decode',
              fixture: 'small-no-relationships',
              root: resolve(directory, 'head'),
              baseRoot: resolve(directory, 'base'),
              smoke: true,
            }),
          ],
          { cwd: root, stdout: 'pipe', stderr: 'pipe', timeout: 10000 },
        )
        expect(result.exitCode).toBe(0)
        const line = result.stdout
          .toString()
          .split('\n')
          .find((entry) => entry.startsWith('BENCHMARK_RESULT '))
        const measurement = JSON.parse((line as string).slice('BENCHMARK_RESULT '.length))
        expect(measurement.base.status).toBe('incorrect')
        expect(measurement.base.operationsPerSecond).toBeUndefined()
        expect(measurement.head.status).toBe('ok')
        expect(measurement.head.samples).toHaveLength(5)
      }
    } finally {
      await rm(directory, { recursive: true, force: true })
    }
  }, 20000)
  for (const library of libraries) {
    for (const suite of ['codec', 'client'] as const) {
      if (!supported(library, suite)) continue
      test(`${library} ${suite} decodes actual small response`, async () => {
        const entry = cases[0]
        const adapter = await createAdapter(library, suite, entry, root, true)
        try {
          adapter.reset?.()
          const before = structuredClone(entry.document)
          const document = structuredClone(entry.document)
          adapter.prepareResponse?.(document)
          const result = await operation(adapter, document, undefined, entry, 'decode')
          validateOperation(result, adapter, entry, 'decode')
          expect(entry.document).toEqual(before)
        } finally {
          adapter.cleanup?.()
        }
      })
      if (library === 'deserialize-json-api' || (library === 'spraypaint' && suite === 'codec'))
        continue
      test(`${library} ${suite} encodes actual small request`, async () => {
        const entry = cases[0]
        const adapter = await createAdapter(library, suite, entry, root, true)
        try {
          adapter.reset?.()
          adapter.prepareResponse?.(entry.document)
          const payload = adapter.native(expectedRequest(entry).data)
          const result = await operation(adapter, entry.document, payload, entry, 'encode')
          validateOperation(result, adapter, entry, 'encode')
        } finally {
          adapter.cleanup?.()
        }
      })
      test(`${library} ${suite} decodes then encodes actual small request`, async () => {
        const entry = cases[0]
        const adapter = await createAdapter(library, suite, entry, root, true)
        try {
          adapter.reset?.()
          const document = structuredClone(entry.document)
          adapter.prepareResponse?.(document)
          validateOperation(
            await operation(adapter, document, undefined, entry, 'decode-encode'),
            adapter,
            entry,
            'decode-encode',
          )
        } finally {
          adapter.cleanup?.()
        }
      })
    }
  }
  test('core round trip resolves nested data then writes identifiers only', async () => {
    const entry = cases.find(
      (entry) => entry.id === 'nested-relationships',
    ) as (typeof cases)[number]
    const adapter = await createAdapter('kitsu-core', 'codec', entry, root, true)
    const before = structuredClone(entry.document)
    validateOperation(
      await operation(adapter, structuredClone(entry.document), undefined, entry, 'decode-encode'),
      adapter,
      entry,
      'decode-encode',
    )
    expect(entry.document).toEqual(before)
  })
  test('unsupported APIs remain unsupported', async () => {
    await expect(createAdapter('fetchja', 'codec', cases[0], root)).rejects.toThrow(
      'no public codec API',
    )
  })
})

describe('measurement and reports', () => {
  test('median and change preserve speed direction', () => {
    expect(median([100, 50, 90, 200, 80])).toBe(90)
    expect(median([2, 4])).toBe(3)
    expect(change(100, 150)).toBe(50)
    expect(change(100, 50)).toBe(-50)
    expect(() => change(0, 10)).toThrow()
    expect(compare(report.cells[0].base, cell)).toBe('100.00% faster')
    expect(compare(cell, { ...cell, operationsPerSecond: 50 })).toBe('50.00% slower')
    expect(compare(cell, { ...cell, operationsPerSecond: 100.0001 })).toBe('<0.01% faster')
    expect(compare(undefined, cell)).toBe('no baseline')
    expect(compare(cell, { ...cell, fixtureHash: 'c'.repeat(64) })).toBe('incomparable')
    expect(compare(cell, { ...cell, status: 'unsupported' })).toBe('ok / unsupported')
  })
  test('README replacement preserves surrounding content and rejects broken markers', () => {
    const original = 'before\n<!-- benchmark:start -->\nold\n<!-- benchmark:end -->\nafter'
    expect(replaceReadme(original, 'new')).toBe(
      'before\n<!-- benchmark:start -->\nnew\n<!-- benchmark:end -->\nafter',
    )
    expect(() => replaceReadme('no markers', 'new')).toThrow()
    expect(() => replaceReadme(`${original}\n<!-- benchmark:start -->`, 'new')).toThrow()
  })
  test('rejects malicious or inconsistent artifact values', () => {
    expect(() => validateReport(report)).not.toThrow()
    for (const corrupt of [
      { ...report, headSha: '$(bad)' },
      { ...report, cells: [{ head: { ...cell, operationsPerSecond: Infinity } }] },
      { ...report, cells: [{ head: { ...cell, samples: [1, 2], operationsPerSecond: 100 } }] },
      { ...report, cells: [{ head: { ...cell, status: 'error' } }] },
      { ...report, cells: [{ head: { ...cell, fixture: '<script>' } }] },
      { ...report, cells: [report.cells[0], report.cells[0]] },
    ])
      expect(() => validateReport(corrupt)).toThrow()
  })
  test('keeps PR comments within GitHub limit, including partial results', () => {
    const partial = structuredClone(report)
    partial.cells.push({
      head: {
        ...cell,
        fixture: 'failed',
        status: 'timeout',
        samples: undefined,
        operationsPerSecond: undefined,
        reason: 'worker exceeds 30-second limit',
      },
    })
    expect(renderComment([partial], 'https://github.com/wopian/kitsu/actions/runs/1')).toContain(
      'timeout',
    )
    expect(renderReadme([partial])).toContain('worker exceeds')
    expect(
      renderComment(
        Array.from({ length: 100 }, () => partial),
        'https://github.com/wopian/kitsu/actions/runs/1',
      ).length,
    ).toBeLessThan(65536)
  })
  test('readReport rejects missing artifacts', async () => {
    await expect(
      readReport(resolve(root, '.cache/missing-benchmark-report.json')),
    ).rejects.toThrow()
  })
  test('artifact text cannot inject Markdown links or HTML', () => {
    const unsafe = structuredClone(report)
    unsafe.runner.cpu = '[fake](https://example.invalid) </details><script>'
    unsafe.runtimeVersion = '[fake](https://example.invalid)'
    validateReport(unsafe)
    expect(renderReadme([unsafe])).toContain('\\[fake\\]')
    expect(renderReadme([unsafe])).not.toContain('</details><script>')
    expect(renderComment([unsafe], 'https://github.com/wopian/kitsu/actions/runs/1')).not.toContain(
      '[fake](https://example.invalid)',
    )
  })
})
