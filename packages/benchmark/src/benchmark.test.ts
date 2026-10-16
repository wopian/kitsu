import { describe, expect, test } from 'bun:test'
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import errors from '../../../specification/getError/jsonapi.ts'
import { createAdapter, libraries, supported, unsupportedReason } from './adapters.ts'
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
    expect(full.find((entry) => entry.id === 'wide-relationship')?.includedCount).toBe(4001)
    for (const entry of full) expect(() => validateDocument(entry.document)).not.toThrow()
  })
  test('rejects conflicting fields, duplicate identities and unreachable includes', () => {
    // @ts-expect-error Wire identifiers must be strings.
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
    expect(adapter.decode?.(structuredClone(errors))).toEqual(errors)
  })
})

describe('public adapter integration', () => {
  test('missing native package is unsupported only in older base revisions', async () => {
    const cache = resolve(root, '.cache')
    await mkdir(cache, { recursive: true })
    const directory = await mkdtemp(resolve(cache, 'native-base-'))
    try {
      // Classification must not depend on workspace dist files or concurrent builds.
      const head = resolve(directory, 'head')
      const absent = resolve(directory, 'absent')
      const distribution = resolve(head, 'packages/kitsu-native/dist')
      await mkdir(distribution, { recursive: true })
      await writeFile(
        resolve(distribution, 'index.mjs'),
        `export default class KitsuNative {
          constructor(options) { this.transport = options.fetch; }
          async request() {
            const response = await this.transport('https://benchmark.invalid/resources');
            const document = await response.json();
            const resource = document.data;
            return { data: { type: resource.type, id: resource.id, ...resource.attributes } };
          }
        }`,
      )
      const options = {
        library: 'kitsu-native',
        suite: 'client',
        mode: 'decode',
        fixture: 'small-no-relationships',
        root: head,
        baseRoot: absent,
        smoke: true,
      }
      for (const absentHead of [false, true]) {
        const result = Bun.spawnSync(
          [
            process.execPath,
            '--tsconfig-override',
            resolve(root, 'packages/benchmark/tsconfig.runtime.json'),
            resolve(root, 'packages/benchmark/src/worker.ts'),
            JSON.stringify({ ...options, ...(absentHead ? { root: absent } : {}) }),
          ],
          { cwd: root, stdout: 'pipe', stderr: 'pipe', timeout: 10000 },
        )
        expect(result.exitCode).toBe(0)
        const line = result.stdout
          .toString()
          .split('\n')
          .find((line) => line.startsWith('BENCHMARK_RESULT ')) as string
        const measurement = JSON.parse(line.slice('BENCHMARK_RESULT '.length))
        expect(measurement.base.status).toBe('unsupported')
        expect(measurement.base.reason).toBe('package absent from base revision')
        expect(measurement.head.status).toBe(absentHead ? 'error' : 'ok')
      }
    } finally {
      await rm(directory, { recursive: true, force: true })
    }
  })
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
      if (library !== 'ts-japi')
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
      if (library !== 'ts-japi')
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
    await expect(createAdapter('ts-japi', 'client', cases[0], root)).rejects.toThrow(
      'no public client API',
    )
    const adapter = await createAdapter('ts-japi', 'codec', cases[0], root)
    for (const mode of ['decode', 'decode-encode'] as const) {
      expect(unsupportedReason('ts-japi', 'codec', mode, cases[0])).toBe('no public decoder')
      expect(() => operation(adapter, cases[0].document, undefined, cases[0], mode)).toThrow(
        'no public decoder',
      )
    }
    expect(unsupportedReason('ts-japi', 'codec', 'encode', cases[0])).toBeUndefined()
  })
  test('ts-japi serializes every fixture through its public serializer and relators', async () => {
    for (const entry of cases) {
      const adapter = await createAdapter('ts-japi', 'codec', entry, root)
      const payload = adapter.native(expectedRequest(entry).data)
      const before = structuredClone(payload)
      validateOperation(
        await operation(adapter, entry.document, payload, entry, 'encode'),
        adapter,
        entry,
        'encode',
      )
      expect(payload).toEqual(before)
      // Read changed input rather than fixture output; cache must stay disabled.
      const resource = Array.isArray(payload) ? payload[0] : payload
      resource.id = 'changed'
      const output = await adapter.encode?.(payload)
      expect((Array.isArray(output.data) ? output.data[0] : output.data).id).toBe('changed')
    }
  })
})

describe('measurement and reports', () => {
  test('validates optional request counts and renders automatic GET overhead', () => {
    const head: Cell = {
      ...cell,
      library: '@bjornharrtell/json-api',
      suite: 'client',
      mode: 'encode',
      requestsPerOperation: 2,
      requestsPerSecond: 200,
    }
    const results = { ...report, cells: [{ head }] }
    expect(() => validateReport(results)).not.toThrow()
    expect(renderReadme([results])).toContain(
      '2 requests/operation \\(automatic GET after HTTP 204 PATCH\\)',
    )
    expect(renderComment([results], 'https://github.com/wopian/kitsu/actions/runs/1')).toContain(
      'Extra requests do not increase the reported rate.',
    )
    for (const requestsPerOperation of [0, -1, 1.5, Infinity, Number.MAX_SAFE_INTEGER + 1, '2'])
      expect(() =>
        validateReport({ ...report, cells: [{ head: { ...head, requestsPerOperation } }] }),
      ).toThrow()
    for (const changes of [
      { requestsPerSecond: 100 },
      { requestsPerSecond: Infinity },
      { suite: 'codec' },
      {
        status: 'error',
        samples: undefined,
        operationsPerSecond: undefined,
        requestsPerSecond: undefined,
      },
    ])
      expect(() =>
        validateReport({ ...report, cells: [{ head: { ...head, ...changes } }] }),
      ).toThrow()
    for (const mode of ['decode', 'encode', 'decode-encode'] as const) {
      const legacy = { ...head, mode, requestsPerSecond: mode === 'decode-encode' ? 200 : 100 }
      delete legacy.requestsPerOperation
      expect(() => validateReport({ ...report, cells: [{ head: legacy }] })).not.toThrow()
    }
  })
  test('records local changes and built package fingerprints in measurement provenance', () => {
    const rendered = renderReadme([{ ...report, dirty: true, sourceHash: 'f'.repeat(64) }])
    expect(rendered).toContain('Base commit (local changes measured)')
    expect(rendered).toContain(`Built package fingerprint: \`${'f'.repeat(64)}\``)
  })
  const scored = (library: string, score: number, overrides: Partial<Cell> = {}): Cell => ({
    ...cell,
    library,
    samples: Array(5).fill(score),
    operationsPerSecond: score,
    ...overrides,
  })
  test('groups each scenario and places native baseline before Axios regardless of input order', () => {
    const entries = [
      scored('kitsu', 200, { suite: 'client', requestsPerSecond: 200 }),
      scored('fetchja', 50, { suite: 'client', requestsPerSecond: 50 }),
      scored('kitsu-native', 100, { suite: 'client', requestsPerSecond: 100 }),
      scored('kitsu-native', 10, {
        suite: 'client',
        fixture: 'few-includes',
        requestsPerSecond: 10,
      }),
      scored('kitsu', 20, { suite: 'client', fixture: 'few-includes', requestsPerSecond: 20 }),
    ]
    const values = { ...report, cells: entries.map((head) => ({ head, base: { ...head } })) }
    const markdown = renderReadme([values])
    expect(markdown.match(/\| Library \| Operations\/s \| vs kitsu-native \|/g)).toHaveLength(2)
    expect(markdown).toContain('##### small-no-relationships')
    expect(markdown).toContain('##### few-includes')
    expect(markdown).toContain('| kitsu-native | 100 | 1x |')
    expect(markdown).toContain('| **kitsu** | **200** | **2x faster** |')
    expect(markdown.indexOf('| kitsu-native | 100 |')).toBeLessThan(
      markdown.indexOf('| **kitsu** | **200** |'),
    )
    const comment = renderComment([values], 'https://github.com/wopian/kitsu/actions/runs/1')
    expect(comment).toContain(
      '| **kitsu** | **200** | **200** | **unchanged** | **2x faster / 2x faster** |',
    )
    expect(comment.indexOf('| kitsu-native | 100 |')).toBeLessThan(
      comment.indexOf('| **kitsu** | **200** |'),
    )
  })
  for (const mode of ['encode', 'decode-encode'] as const)
    test(`${mode} reports use completed operations for rates, ratios, and winners`, () => {
      const requests = mode === 'encode' ? 1 : 2
      const client = (library: string, score: number, requestsPerOperation = requests) =>
        scored(library, score, {
          suite: 'client',
          mode,
          requestsPerOperation,
          requestsPerSecond: score * requestsPerOperation,
        })
      const extraRequests = mode === 'encode' ? 2 : 3
      const results = {
        ...report,
        cells: [
          { base: client('kitsu-native', 100), head: client('kitsu-native', 100) },
          { base: client('fetchja', 200), head: client('fetchja', 200) },
          {
            base: client('@bjornharrtell/json-api', 75, extraRequests),
            head: client('@bjornharrtell/json-api', 150, extraRequests),
          },
        ],
      }
      expect(() => validateReport(results)).not.toThrow()
      const markdown = renderReadme([results])
      expect(markdown).toContain('Mocked client operations/s')
      expect(markdown).toContain('| Library | Operations/s | vs kitsu-native |')
      expect(markdown).toContain('| @bjornharrtell/json-api | 150 | 1.5x faster |')
      expect(markdown).toContain('| **fetchja** | **200** | **2x faster** |')
      expect(markdown).not.toContain('**@bjornharrtell/json-api**')
      expect(markdown).not.toContain('cycles/s')
      expect(markdown).not.toContain('requests/s')
      const comment = renderComment([results], 'https://github.com/wopian/kitsu/actions/runs/1')
      expect(comment).toContain('| Base operations/s | PR operations/s |')
      expect(comment).toContain(
        `| client/${mode}/small-no-relationships | @bjornharrtell/json-api | 75 | 150 | 100.00% faster | 1.33x slower / 1.5x faster |`,
      )
      expect(comment).toContain(
        `| **client/${mode}/small-no-relationships** | **fetchja** | **200** | **200** | **unchanged** | **2x faster / 2x faster** |`,
      )
      expect(comment).not.toContain('**@bjornharrtell/json-api**')
    })
  test('README bolds every populated winner cell and compares competitors with core', () => {
    const results = {
      ...report,
      cells: ['kitsu-core', 'jsona', 'yayson', 'devour'].map((library, index) => ({
        head: scored(library, [50, 150, 25, 50][index]),
      })),
    }
    const markdown = renderReadme([results])
    expect(markdown).toContain('| kitsu-core | 50 | 1x |  |')
    expect(markdown).toContain('| **jsona** | **150** | **3x faster** |  |')
    expect(markdown).toContain('| yayson | 25 | 2x slower |  |')
    expect(markdown).toContain('| devour | 50 | 1x |  |')
    expect(markdown).not.toContain('Spread')
  })
  test('winner selection stays within runtime, suite, mode and scenario and includes ties', () => {
    const head = [
      scored('kitsu-core', 100),
      scored('jsona', 100),
      scored('kitsu-core', 10, { mode: 'encode' }),
      scored('jsona', 20, { mode: 'encode' }),
      scored('kitsu-core', 5, { fixture: 'few-includes' }),
      scored('jsona', 10, { fixture: 'few-includes' }),
      scored('kitsu-native', 20, { suite: 'client', requestsPerSecond: 20 }),
      scored('fetchja', 10, { suite: 'client', requestsPerSecond: 10 }),
    ]
    const node = { ...report, cells: head.map((head) => ({ head })) }
    const bun = {
      ...report,
      runtime: 'bun' as const,
      cells: [scored('kitsu-core', 1), scored('jsona', 2)].map((head) => ({ head })),
    }
    const markdown = renderReadme([node, bun])
    expect(markdown).toContain('| **kitsu-core** | **100** | **1x**')
    expect(markdown).toContain('| **jsona** | **100** | **1x**')
    expect(markdown).toContain('| **jsona** | **20** | **2x faster**')
    expect(markdown).toContain('| **jsona** | **10** | **2x faster**')
    expect(markdown).toContain('| **kitsu-native** | **20** | **1x**')
    expect(markdown).toContain('| fetchja | 10 | 2x slower')
    expect(markdown).toContain('| **jsona** | **2** | **2x faster**')
  })
  test('failed and missing references never invent ratios or win', () => {
    const failed: Cell = {
      ...cell,
      status: 'incorrect',
      samples: undefined,
      operationsPerSecond: undefined,
    }
    const results = {
      ...report,
      cells: [
        { head: failed },
        { head: scored('jsona', 150) },
        { head: scored('jsona', 50, { mode: 'encode' }) },
        { head: { ...failed, library: 'devour' } },
      ],
    }
    const markdown = renderReadme([results])
    expect(markdown).toContain('| kitsu-core | incorrect | 1x')
    expect(markdown).toContain('| **jsona** | **150** | **—**')
    expect(markdown).toContain('| **jsona** | **50** | **—**')
    expect(markdown).toContain('| devour | incorrect | —')
  })
  test('PR comments compare base and PR references separately and retain change direction', () => {
    const results = {
      ...report,
      cells: [
        { base: scored('kitsu-core', 100), head: scored('kitsu-core', 50) },
        { base: scored('jsona', 25), head: scored('jsona', 150) },
      ],
    }
    const markdown = renderComment([results], 'https://github.com/wopian/kitsu/actions/runs/1')
    expect(markdown).toContain('| 50.00% slower | 1x / 1x |')
    expect(markdown).toContain(
      '| **codec/decode/small-no-relationships** | **jsona** | **25** | **150** | **500.00% faster** | **4x slower / 3x faster** |',
    )
    expect(markdown).not.toContain('Spread')
  })
  test('incompatible fixtures have no ratio and tiny ratios preserve direction', () => {
    const results = {
      ...report,
      cells: [
        { head: cell },
        { head: scored('jsona', 150, { fixtureHash: 'c'.repeat(64) }) },
        { head: scored('yayson', 100.0001) },
        { head: scored('devour', 99.9999) },
      ],
    }
    const markdown = renderReadme([results])
    expect(markdown).toContain('| **jsona** | **150** | **—**')
    expect(markdown).toContain('| yayson | 100 | <1.01x faster |')
    expect(markdown).toContain('| devour | 100 | <1.01x slower |')
  })
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
