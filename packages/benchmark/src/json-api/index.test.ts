import { describe, expect, test } from 'bun:test'
import { resolve } from 'node:path'
import { createAdapter, libraries, packageName, supported, unsupportedReason } from '../adapters.ts'
import { fixtures } from '../fixtures.ts'
import { expectedRequest, validateEncoded } from '../graph.ts'
import { operation, validateOperation } from '../measure.ts'
import type { Mode } from '../types.ts'

const library = '@bjornharrtell/json-api'
const root = resolve(import.meta.dir, '../../../..')
const cases = fixtures(true)
const modes: Mode[] = ['decode', 'encode', 'decode-encode']

describe('@bjornharrtell/json-api client', () => {
  test('registers scoped package for clients and rejects codec APIs and collection writes', async () => {
    expect(libraries).toContain(library)
    expect(packageName(library)).toBe(library)
    expect(supported(library, 'client')).toBe(true)
    expect(supported(library, 'codec')).toBe(false)
    await expect(createAdapter(library, 'codec', cases[0], root)).rejects.toThrow(
      'no public codec API',
    )
    const entry = cases.find((entry) => entry.id === 'collection') as (typeof cases)[number]
    for (const mode of ['encode', 'decode-encode'] as const)
      expect(unsupportedReason(library, 'client', mode, entry)).toBe(
        'public client writes single resources only',
      )
    const originalFetch = globalThis.fetch
    const adapter = await createAdapter(library, 'client', entry, root)
    try {
      await expect(adapter.encode?.(adapter.native(expectedRequest(entry).data))).rejects.toThrow(
        'public client writes single resources only',
      )
    } finally {
      adapter.cleanup?.()
    }
    expect(globalThis.fetch).toBe(originalFetch)
  })

  test('validates fixtures without repairing missing empty to-many relationships', async () => {
    for (const entry of cases) {
      const before = structuredClone(entry.document)
      const originalFetch = globalThis.fetch
      const adapter = await createAdapter(library, 'client', entry, root)
      try {
        for (const mode of modes) {
          if (unsupportedReason(library, 'client', mode, entry)) continue
          const document = structuredClone(entry.document)
          adapter.prepareResponse?.(document)
          const payload =
            mode === 'encode' ? adapter.native(expectedRequest(entry).data) : undefined
          const payloadBefore = structuredClone(payload)
          const result = await operation(adapter, document, payload, entry, mode)
          if (entry.id === 'empty-relationships' && mode !== 'encode') {
            expect(result.decoded.author).toBeNull()
            expect(() => validateOperation(result, adapter, entry, mode)).toThrow(
              'decoded relationship cardinality differs: comments',
            )
          } else validateOperation(result, adapter, entry, mode)
          expect(payload).toEqual(payloadBefore)
          expect(entry.document).toEqual(before)
        }
      } finally {
        adapter.cleanup?.()
      }
      expect(globalThis.fetch).toBe(originalFetch)
    }
  })

  test('sends 1/2/3 requests and captures PATCH body through automatic GET', async () => {
    const entry = cases.find(
      (entry) => entry.id === 'small-relationships',
    ) as (typeof cases)[number]
    const originalFetch = globalThis.fetch
    const adapter = await createAdapter(library, 'client', entry, root)
    try {
      for (const mode of modes) {
        adapter.activate?.()
        const mockFetch = globalThis.fetch
        const methods: string[] = []
        globalThis.fetch = ((url, options) => {
          methods.push(options?.method ?? 'GET')
          return mockFetch(url, options)
        }) as typeof fetch
        const document = structuredClone(entry.document)
        adapter.prepareResponse?.(document)
        const payload = mode === 'encode' ? adapter.native(expectedRequest(entry).data) : undefined
        const result = await operation(adapter, document, payload, entry, mode)
        validateOperation(result, adapter, entry, mode)
        expect(methods).toEqual(
          mode === 'decode'
            ? ['GET']
            : mode === 'encode'
              ? ['PATCH', 'GET']
              : ['GET', 'PATCH', 'GET'],
        )
        expect(adapter.requestsPerOperation?.[mode]).toBe(methods.length)
        adapter.cleanup?.()
        expect(globalThis.fetch).toBe(originalFetch)
      }
    } finally {
      adapter.cleanup?.()
    }
  })

  test('reads changed responses and writes changed input without cached fixture values', async () => {
    const entry = cases[0]
    const adapter = await createAdapter(library, 'client', entry, root)
    try {
      const document: any = structuredClone(entry.document)
      document.data.id = 'changed'
      document.data.attributes.string = 'changed attribute'
      adapter.prepareResponse?.(document)
      const decoded = await adapter.decode?.(document)
      expect(decoded.id).toBe('changed')
      expect(decoded.string).toBe('changed attribute')
      const payload = adapter.native(expectedRequest(entry).data)
      payload.id = 'changed'
      payload.string = 'changed attribute'
      const before = structuredClone(payload)
      const encoded = await adapter.encode?.(payload)
      expect(encoded.data.id).toBe('changed')
      expect(encoded.data.attributes.string).toBe('changed attribute')
      expect(payload).toEqual(before)
      validateEncoded(encoded, { ...entry, document })
    } finally {
      adapter.cleanup?.()
    }
  })

  test('isolated Node and Bun workers publish request counts and rates', () => {
    for (const runtime of ['node', 'bun']) {
      for (const mode of modes) {
        const result = Bun.spawnSync(
          [
            ...(runtime === 'bun'
              ? [
                  process.execPath,
                  '--tsconfig-override',
                  resolve(root, 'packages/benchmark/tsconfig.runtime.json'),
                ]
              : ['node', '--experimental-strip-types']),
            resolve(root, 'packages/benchmark/src/worker.ts'),
            JSON.stringify({
              library,
              suite: 'client',
              mode,
              fixture: cases[0].id,
              root,
              smoke: true,
            }),
          ],
          { cwd: root, stdout: 'pipe', stderr: 'pipe', timeout: 10000 },
        )
        expect(result.exitCode).toBe(0)
        const line = result.stdout
          .toString()
          .split('\n')
          .find((line) => line.startsWith('BENCHMARK_RESULT '))
        const { head } = JSON.parse((line as string).slice('BENCHMARK_RESULT '.length))
        expect(head.status).toBe('ok')
        expect(head.requestsPerOperation).toBe(mode === 'decode' ? 1 : mode === 'encode' ? 2 : 3)
        expect(head.requestsPerSecond).toBe(head.operationsPerSecond * head.requestsPerOperation)
      }
    }
  }, 30000)
})
