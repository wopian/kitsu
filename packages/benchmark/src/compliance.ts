import assert from 'node:assert/strict'
import { META } from '@bjornharrtell/json-api'
import { AxiosError } from 'axios'
import { getMeta } from 'yayson/utils'
import { createAdapter, supported, unsupportedReason } from './adapters.ts'
import { fixture, list } from './fixtures.ts'
import { expectedRequest, validateDecoded, validateEncoded } from './graph.ts'
import { libraries } from './libraries.ts'
import { transport } from './transport.ts'
import {
  type Adapter,
  type Fixture,
  Incorrect,
  type JsonApiDocument,
  type JsonApiResource,
  type Suite,
  Unsupported,
} from './types.ts'

export type SpecVersion = '1.0' | '1.1'
export interface ComplianceCell {
  library: string
  suite: Suite
  version: SpecVersion
  test: string
  status: 'pass' | 'unsupported' | 'incorrect' | 'error'
  reason?: string
}
export interface ComplianceReport {
  schemaVersion: 1
  runtime: 'node' | 'bun'
  runtimeVersion: string
  measuredAt: string
  sourceHash: string
  harnessHash: string
  versions: Record<string, string>
  cells: ComplianceCell[]
}
interface Request {
  method: string
  headers: Headers
  body: any
}
interface Context {
  adapter: Adapter
  decoded: any
  document: any
  encoded: any
  error: any
  requests: Request[]
  library: string
}
interface ComplianceCase {
  id: string
  name: string
  section: string
  mode: 'decode' | 'encode'
  version?: SpecVersion
  clientOnly?: boolean
  document: JsonApiDocument
  status?: number
  responseHeaders?: Record<string, string>
  writeStatus?: number
  payload?: (adapter: Adapter, document: JsonApiDocument, library: string) => any
  check?: (context: Context) => void
}

const resource: JsonApiResource = { type: 'articles', id: '1', attributes: { title: 'Hello' } }
const single = { data: resource }
const person = { type: 'people', id: '1', attributes: { name: 'Ada' } }
const included = {
  data: { ...resource, relationships: { author: { data: { type: 'people', id: '1' } } } },
  included: [person],
}
const resourceMeta = (value: any) =>
  value?.$?.meta ?? value?.[META] ?? (value && getMeta(value)) ?? value?.meta
const localId = (value: any) => value?.$?.lid ?? value?.lid
const root = (context: Context) => context.adapter.view.roots(context.decoded)
const errors = (context: Context) => {
  for (const value of [
    context.document,
    context.error,
    context.error?.response?.data,
    context.error?.body,
    context.error?.data,
  ]) {
    if (value?.errors) return value.errors
    if (Array.isArray(value)) return value
  }
  return undefined
}
const errorDocument = {
  errors: [
    {
      status: '400',
      title: 'Invalid input',
      detail: 'Bad title',
      source: { pointer: '/data/attributes/title' },
    },
  ],
}
const graph = (name: string, document: JsonApiDocument): ComplianceCase => ({
  id: name,
  name,
  section: 'document-structure',
  mode: 'decode',
  document,
})
const write = (name: string, document: JsonApiDocument): ComplianceCase => ({
  id: name,
  name,
  section: 'crud-updating-resource-attributes',
  mode: 'encode',
  document,
})

/** Shared client/codec capabilities. Optional features are not blanket certification. */
export const complianceCases: ComplianceCase[] = [
  graph('Read single resource', single),
  graph('Read resource collection', { data: [resource, { ...resource, id: '2' }] }),
  graph('Read empty collection', { data: [] }),
  {
    ...graph('Read null primary data', { data: null }),
    check: (context) => assert.equal(root(context), null),
  },
  graph('Preserve JSON attribute values', {
    data: {
      ...resource,
      attributes: {
        zero: 0,
        no: false,
        nothing: null,
        array: [],
        object: {},
        payload: { data: [1, null] },
        日本語: '値',
      },
    },
  }),
  { ...graph('Read included relationships', included), section: 'document-compound-documents' },
  graph('Read unresolved relationship identifiers', {
    data: { ...resource, relationships: { author: { data: { type: 'people', id: '9' } } } },
  }),
  graph('Read null to-one relationship', {
    data: { ...resource, relationships: { author: { data: null } } },
  }),
  graph('Read empty to-many relationship', {
    data: { ...resource, relationships: { comments: { data: [] } } },
  }),
  {
    ...graph('Read document metadata', { ...single, meta: { total: 1 } }),
    section: 'document-meta',
    check: (context) => assert.deepEqual(context.document?.meta, { total: 1 }),
  },
  {
    ...graph('Read resource metadata', { data: { ...resource, meta: { revision: 2 } } }),
    section: 'document-meta',
    check: (context) => assert.deepEqual(resourceMeta(root(context)), { revision: 2 }),
  },
  {
    ...graph('Read pagination links', { ...single, links: { self: '/articles/1', next: null } }),
    section: 'fetching-pagination',
    check: (context) =>
      assert.deepEqual(context.document?.links, { self: '/articles/1', next: null }),
  },
  {
    ...graph('Preserve error objects', errorDocument),
    section: 'errors',
    status: 400,
    check: (context) => assert.deepEqual(errors(context), errorDocument.errors),
  },
  write('Write resource attributes', single),
  write('Write relationship identifiers', included),
  write('Write null to-one relationship', {
    data: { ...resource, relationships: { author: { data: null } } },
  }),
  write('Write empty to-many relationship', {
    data: { ...resource, relationships: { comments: { data: [] } } },
  }),
  {
    ...graph('Send JSON:API Accept header', single),
    section: 'content-negotiation-clients',
    clientOnly: true,
    check: (context) =>
      assert.ok(
        context.requests.some(
          (request) =>
            request.method === 'GET' &&
            request.headers
              .get('accept')
              ?.split(',')
              .some((value) => value.trim() === 'application/vnd.api+json'),
        ),
      ),
  },
  {
    ...write('Send JSON:API Content-Type header', single),
    section: 'content-negotiation-clients',
    clientOnly: true,
    check: (context) =>
      assert.equal(
        context.requests.find((request) => request.method === 'PATCH')?.headers.get('content-type'),
        'application/vnd.api+json',
      ),
  },
  {
    ...write('Handle HTTP 204 update', single),
    section: 'crud-updating-responses-204',
    clientOnly: true,
  },
  {
    ...graph('Reject HTTP error status', errorDocument),
    section: 'errors',
    clientOnly: true,
    status: 400,
    check: (context) => assert.ok(context.error, 'HTTP error was not rejected'),
  },
  {
    ...graph('Ignore response media parameters', single),
    section: 'content-negotiation-clients',
    clientOnly: true,
    responseHeaders: { 'content-type': 'application/vnd.api+json; ignored=value' },
  },
  {
    ...graph('Read local identifier linkage', {
      data: {
        ...resource,
        lid: 'article',
        relationships: {
          author: { data: { type: 'people', lid: 'person' } },
          other: { data: { type: 'people', id: '1' } },
        },
      },
      included: [{ ...person, lid: 'person' }],
    }),
    version: '1.1',
    section: 'document-resource-identifier-objects',
    check(context) {
      const value = root(context)
      const author = context.adapter.view.relationship(value, 'author')
      assert.equal(context.adapter.view.attribute(author, 'name'), 'Ada')
      assert.equal(author, context.adapter.view.relationship(value, 'other'))
      assert.equal(localId(value), 'article')
    },
  },
  {
    ...write('Write local identifier', single),
    version: '1.1',
    section: 'document-resource-identifier-objects',
    writeStatus: 200,
    payload(adapter, document, library) {
      const value = adapter.native(document.data as any)
      if (['kitsu-core', 'kitsu-native', 'kitsu'].includes(library))
        value.$ = { ...value.$, lid: 'draft' }
      else value.lid = 'draft'
      return value
    },
    check: (context) => {
      assert.equal(context.encoded?.data?.lid, 'draft')
      assert.equal(context.encoded?.data?.type, 'articles')
    },
  },
  {
    ...graph('Read extension/profile metadata', {
      ...single,
      jsonapi: {
        version: '1.1',
        ext: ['https://example.org/version'],
        profile: ['https://example.org/profile'],
      },
    }),
    version: '1.1',
    section: 'document-jsonapi-object',
    responseHeaders: {
      'content-type':
        'application/vnd.api+json; ext="https://example.org/version"; profile="https://example.org/profile"',
    },
    check: (context) =>
      assert.deepEqual(context.document?.jsonapi, {
        version: '1.1',
        ext: ['https://example.org/version'],
        profile: ['https://example.org/profile'],
      }),
  },
  {
    ...graph('Read rich link objects', {
      ...single,
      links: {
        self: {
          href: '/articles/1',
          rel: 'self',
          title: 'Article',
          type: 'application/vnd.api+json',
          hreflang: ['en', 'ja'],
          describedby: '/schemas/article',
        },
      },
    }),
    version: '1.1',
    section: 'document-links',
    check: (context) =>
      assert.deepEqual(context.document?.links?.self, {
        href: '/articles/1',
        rel: 'self',
        title: 'Article',
        type: 'application/vnd.api+json',
        hreflang: ['en', 'ja'],
        describedby: '/schemas/article',
      }),
  },
  {
    ...graph('Read error source.header', {
      errors: [{ status: '400', title: 'Invalid header', source: { header: 'Accept' } }],
    }),
    version: '1.1',
    section: 'error-objects',
    status: 400,
    check: (context) => assert.equal(errors(context)?.[0]?.source?.header, 'Accept'),
  },
  graph('Ignore unrecognized document members', { ...single, ignored: true } as any),
]

/** Schema setup only. Actual documents, including null/lid cases, remain unchanged. */
function schemaFor(document: JsonApiDocument): Fixture {
  const resources = [...list(document.data), ...(document.included ?? [])]
  const canonical = (resources.length ? resources : [resource]).map((value, index) => ({
    type: value.type,
    id: value.id ?? value.lid ?? `schema-${index}`,
    attributes: value.attributes,
    relationships: Object.fromEntries(
      Object.entries(value.relationships ?? {}).map(([name, relation]) => [
        name,
        {
          ...relation,
          ...('data' in relation
            ? {
                data:
                  relation.data === null
                    ? null
                    : Array.isArray(relation.data)
                      ? relation.data.map((target) => ({
                          type: target.type,
                          id: target.id ?? target.lid,
                        }))
                      : { type: relation.data?.type, id: relation.data?.id ?? relation.data?.lid },
              }
            : {}),
        },
      ]),
    ),
  }))
  const result = fixture('compliance-schema', { data: canonical } as JsonApiDocument)
  return result
}

/** Inject tracing and HTTP responses only into compliance adapters, never timed workers. */
function observedTransport(test: ComplianceCase, document: JsonApiDocument) {
  const mock = transport()
  const requests: Request[] = []
  let active = false
  const headers = { 'content-type': 'application/vnd.api+json', ...test.responseHeaders }
  return {
    requests,
    activate() {
      active = true
      requests.length = 0
    },
    mock: {
      ...mock,
      fetch: (async (url: any, options: any = {}) => {
        const response = await mock.fetch(url, options)
        if (!active) return response
        const method = (options.method ?? 'GET').toUpperCase()
        requests.push({
          method,
          headers: new Headers(options.headers),
          body: options.body ? JSON.parse(String(options.body)) : undefined,
        })
        if (method === 'GET')
          return new Response(JSON.stringify(document), { status: test.status ?? 200, headers })
        if (test.writeStatus)
          return new Response(JSON.stringify(document), { status: test.writeStatus, headers })
        return response
      }) as typeof fetch,
      async axios(config: any) {
        const response = await mock.axios(config)
        if (!active) return response
        const method = (config.method ?? 'GET').toUpperCase()
        requests.push({
          method,
          headers: new Headers(config.headers),
          body: typeof config.data === 'string' ? JSON.parse(config.data) : config.data,
        })
        const result = {
          ...response,
          status: method === 'GET' ? (test.status ?? 200) : (test.writeStatus ?? 204),
          headers: method === 'GET' ? headers : response.headers,
          data: method !== 'GET' && test.writeStatus ? JSON.stringify(document) : response.data,
        }
        if (result.status >= 400)
          throw new AxiosError(
            'Mock HTTP error',
            AxiosError.ERR_BAD_REQUEST,
            config,
            undefined,
            result,
          )
        return result
      },
    },
  }
}

export async function checkCompliance(
  library: string,
  suite: Suite,
  version: SpecVersion,
  test: ComplianceCase,
  directory: string,
  source = false,
): Promise<ComplianceCell> {
  const cell: ComplianceCell = { library, suite, version, test: test.id, status: 'pass' }
  const document = structuredClone(test.document)
  document.jsonapi ??= { version }
  const snapshot = structuredClone(document)
  const schema = schemaFor(document)
  const entry = {
    ...schema,
    document,
    primaryCount: list(document.data).length,
    includedCount: document.included?.length ?? 0,
  }
  const observed = observedTransport(test, document)
  let adapter: Adapter | undefined
  try {
    const reason = unsupportedReason(library, suite, test.mode, entry)
    if (reason) throw new Unsupported(reason)
    adapter = await createAdapter(library, suite, schema, directory, source, observed.mock)
    adapter.reset?.()
    adapter.prepareResponse?.(document)
    observed.activate()
    let decoded: any
    let envelope: any
    let encoded: any
    let error: any
    if (test.mode === 'decode') {
      try {
        if (adapter.decodeDocument) {
          const result = await adapter.decodeDocument(document)
          decoded = result.decoded
          envelope = result.document
        } else {
          decoded = await adapter.decode?.(document)
          envelope =
            library === 'yayson'
              ? { meta: decoded && getMeta(decoded) }
              : (decoded?.document ?? decoded)
        }
      } catch (caught) {
        if (!test.document.errors) throw caught
        error = caught
      }
      if (!test.check) validateDecoded(decoded, adapter.view, entry)
    } else {
      const payload = test.payload
        ? test.payload(adapter, document, library)
        : adapter.native(expectedRequest(entry).data)
      encoded = await adapter.encode?.(payload)
      if (!test.payload) validateEncoded(encoded, entry)
      // Wire identifiers must remain strings; graph equivalence alone coerces IDs.
      for (const value of list<any>(encoded?.data)) {
        assert.equal(typeof value.type, 'string')
        if (value.id !== undefined) assert.equal(typeof value.id, 'string')
      }
    }
    test.check?.({
      adapter,
      decoded,
      document: envelope,
      encoded,
      error,
      requests: observed.requests,
      library,
    })
    assert.deepEqual(document, snapshot, 'Input document was mutated')
  } catch (error) {
    cell.status =
      error instanceof Unsupported
        ? 'unsupported'
        : error instanceof assert.AssertionError || error instanceof Incorrect
          ? 'incorrect'
          : 'error'
    cell.reason = (error instanceof Error ? error.message : String(error)).slice(0, 240)
  } finally {
    adapter?.cleanup?.()
  }
  return cell
}

export async function complianceCells(
  library: string,
  suite: Suite,
  directory: string,
  source = false,
): Promise<ComplianceCell[]> {
  const cells: ComplianceCell[] = []
  for (const version of ['1.0', '1.1'] as const)
    for (const test of complianceCases) {
      if ((test.version && test.version !== version) || (test.clientOnly && suite !== 'client'))
        continue
      cells.push(await checkCompliance(library, suite, version, test, directory, source))
    }
  return cells
}

export const complianceMarkers = ['<!-- compliance:start -->', '<!-- compliance:end -->'] as const
export function replaceCompliance(markdown: string, generated: string): string {
  const [start, end] = complianceMarkers
  const first = markdown.indexOf(start)
  const last = markdown.indexOf(end)
  if (first < 0 && last < 0) {
    const benchmarkEnd = '<!-- benchmark:end -->'
    const anchor = markdown.indexOf(benchmarkEnd)
    const block = `${start}\n${generated.trim()}\n${end}`
    if (anchor >= 0) {
      const position = anchor + benchmarkEnd.length
      return `${markdown.slice(0, position)}\n\n${block}\n\n${markdown.slice(position).trimStart()}`
    }
    return `${markdown.trimEnd()}\n\n${block}\n`
  }
  if (
    first < 0 ||
    last < first ||
    markdown.indexOf(start, first + 1) >= 0 ||
    markdown.indexOf(end, last + 1) >= 0
  )
    throw new Error('Invalid compliance markers')
  return `${markdown.slice(0, first + start.length)}\n${generated.trim()}\n${markdown.slice(last)}`
}

const safe = (value: string) =>
  value
    .replace(/[\r\n]/g, ' ')
    .replace(/[\\|`*_{}[\]()#+.!<>]/g, '\\$&')
    .slice(0, 480)
    .trim()
export function validateComplianceReport(report: ComplianceReport): void {
  const hash = (value: string) => typeof value === 'string' && /^[a-f0-9]{64}$/.test(value)
  const text = (value: string, maximum = 240) =>
    typeof value === 'string' && value.length > 0 && value.length <= maximum
  if (
    report.schemaVersion !== 1 ||
    !['node', 'bun'].includes(report.runtime) ||
    !text(report.runtimeVersion) ||
    !text(report.measuredAt) ||
    !hash(report.sourceHash) ||
    !hash(report.harnessHash) ||
    !report.versions ||
    !libraries.every((name) => text(report.versions[name], 80)) ||
    !Array.isArray(report.cells) ||
    report.cells.length > 1000
  )
    throw new Error('Invalid compliance report')
  const seen = new Set<string>()
  for (const cell of report.cells) {
    const test = complianceCases.find((test) => test.id === cell.test)
    if (
      !test ||
      !['client', 'codec'].includes(cell.suite) ||
      !supported(cell.library, cell.suite) ||
      !['1.0', '1.1'].includes(cell.version) ||
      (test.version && test.version !== cell.version) ||
      (test.clientOnly && cell.suite !== 'client') ||
      !['pass', 'unsupported', 'incorrect', 'error'].includes(cell.status) ||
      (cell.reason !== undefined && !text(cell.reason))
    )
      throw new Error('Invalid compliance cell')
    const key = JSON.stringify([cell.library, cell.suite, cell.version, cell.test])
    if (seen.has(key)) throw new Error('Duplicate compliance cell')
    seen.add(key)
  }
}
export function renderCompliance(reports: ComplianceReport[]): string {
  if (
    !reports.length ||
    reports.length > 2 ||
    new Set(reports.map((report) => report.runtime)).size !== reports.length
  )
    throw new Error('Invalid compliance runtimes')
  for (const report of reports) {
    validateComplianceReport(report)
    if (
      report.sourceHash !== reports[0].sourceHash ||
      report.harnessHash !== reports[0].harnessHash ||
      JSON.stringify(report.versions) !== JSON.stringify(reports[0].versions)
    )
      throw new Error('Compliance environments differ')
  }
  const output = [
    '## JSON:API compatibility',
    '',
    'Executable capability checks against [JSON:API 1.0](https://jsonapi.org/format/1.0/) and [JSON:API 1.1](https://jsonapi.org/format/1.1/).',
    '',
    '✅ = supported and correct on both Node and Bun. ❌ = unsupported, incorrect, error, or missing result on either runtime. These checks cover the listed public API capabilities, not blanket specification certification. Optional capabilities can also show ❌.',
    '',
    'Clients use mocked HTTP and their real request/response pipelines. Codecs use their public conversion APIs. Server behavior, application policy, arbitrary extension semantics, and extension/profile request negotiation are outside these checks. Local identifier and metadata checks use the native representations exposed by each adapter.',
    '',
    'Reproduce: `bun run build && bun run benchmark:compliance --readme`. Full results and failure reasons: `.cache/compliance/results-node.json`, `results-bun.json`, and `report.md`.',
    '',
  ]
  for (const report of reports)
    output.push(
      `${safe(report.runtime)} ${safe(report.runtimeVersion)}; checked ${safe(report.measuredAt)}. Built package fingerprint: \`${report.sourceHash}\`. Library versions: ${Object.entries(
        report.versions,
      )
        .map(([name, version]) => `${safe(name)} ${safe(version)}`)
        .join(', ')}.`,
      '',
    )
  for (const version of ['1.0', '1.1'] as const) {
    output.push(`### JSON:API ${version}`, '')
    for (const suite of ['client', 'codec'] as const) {
      const names = [
        'kitsu-native',
        'kitsu',
        'kitsu-core',
        ...libraries.filter((name) => !['kitsu-native', 'kitsu', 'kitsu-core'].includes(name)),
      ].filter((name) => supported(name, suite))
      const tests = complianceCases.filter(
        (test) =>
          (!test.version || test.version === version) && (!test.clientOnly || suite === 'client'),
      )
      output.push(
        `#### ${suite === 'client' ? 'Clients' : 'Codecs'}`,
        '',
        `| Tested behavior | ${names.join(' | ')} |`,
        `| --- | ${names.map(() => '---:').join(' | ')} |`,
      )
      for (const test of tests) {
        const outcomes = names.map((library) =>
          ['node', 'bun'].every(
            (runtime) =>
              reports
                .find((report) => report.runtime === runtime)
                ?.cells.find(
                  (cell) =>
                    cell.library === library &&
                    cell.suite === suite &&
                    cell.version === version &&
                    cell.test === test.id,
                )?.status === 'pass',
          )
            ? '✅'
            : '❌',
        )
        output.push(
          `| [${test.name}](https://jsonapi.org/format/${version}/#${test.section}) | ${outcomes.join(' | ')} |`,
        )
      }
      output.push('')
    }
  }
  output.push('<details><summary>Unsupported or incorrect behavior</summary>', '')
  // Combine matching runtime failures, retaining every actual outcome and reason.
  const failures = new Map<string, { runtimes: string[]; cell: ComplianceCell }>()
  for (const report of reports)
    for (const cell of report.cells)
      if (cell.status !== 'pass') {
        const key = JSON.stringify([
          cell.library,
          cell.suite,
          cell.version,
          cell.test,
          cell.status,
          cell.reason,
        ])
        const entry = failures.get(key) ?? { runtimes: [], cell }
        entry.runtimes.push(report.runtime)
        failures.set(key, entry)
      }
  for (const { runtimes, cell } of failures.values())
    output.push(
      `- ${safe(cell.library)} / ${cell.suite} / ${cell.version} / ${safe(cell.test)} (${runtimes.join(', ')}): ${cell.status}; ${safe(cell.reason ?? '')}`,
    )
  if (!failures.size) output.push('None.')
  output.push('', '</details>', '')
  return output.join('\n')
}
