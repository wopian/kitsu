import { performance } from 'node:perf_hooks'
import {
  expectedRequest,
  requestResources,
  touchGraph,
  validateDecoded,
  validateEncoded,
} from './graph.ts'
import {
  type Adapter,
  type Cell,
  type Fixture,
  Incorrect,
  type Mode,
  Unsupported,
} from './types.ts'

export const median = (values: number[]): number => {
  const sorted = [...values].sort((left, right) => left - right)
  const middle = Math.floor(sorted.length / 2)
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2
}
export function change(base: number, head: number): number {
  if (!(base > 0) || !Number.isFinite(head) || head < 0) throw new Error('invalid throughput')
  return (head / base - 1) * 100
}
const then = (value: any, callback: (output: any) => any): any =>
  value && typeof value.then === 'function' ? value.then(callback) : callback(value)

export function operation(
  adapter: Adapter,
  document: any,
  payload: any,
  fixture: Fixture,
  mode: Mode,
): any {
  if (mode === 'encode') {
    if (!adapter.encode) throw new Unsupported('no public encoder')
    return then(adapter.encode(payload), (encoded) => ({ encoded }))
  }
  return then(adapter.decode(document), (decoded) => {
    touchGraph(decoded, adapter.view, fixture)
    if (mode === 'decode') return { decoded }
    if (!adapter.encode) throw new Unsupported('no public encoder')
    const request = adapter.native(requestResources(decoded, adapter.view, fixture))
    return then(adapter.encode(request), (encoded) => ({ decoded, encoded }))
  })
}

export function validateOperation(
  result: any,
  adapter: Adapter,
  fixture: Fixture,
  mode: Mode,
): void {
  if (mode !== 'encode') validateDecoded(result.decoded, adapter.view, fixture)
  if (mode !== 'decode') validateEncoded(result.encoded, fixture)
}

export function failure(error: unknown): Pick<Cell, 'status' | 'reason'> {
  return {
    status:
      error instanceof Unsupported
        ? 'unsupported'
        : error instanceof Incorrect
          ? 'incorrect'
          : 'error',
    reason: (error instanceof Error ? error.message : String(error)).slice(0, 240),
  }
}

/** Preparation/reset stay outside operation timers; every invocation receives fresh input. */
export async function sample(
  adapter: Adapter,
  fixture: Fixture,
  mode: Mode,
  milliseconds: number,
): Promise<number> {
  const resources = expectedRequest(fixture).data
  let elapsed = 0
  let count = 0
  let last: any
  const deadline = performance.now() + milliseconds
  do {
    adapter.reset?.()
    const document = structuredClone(fixture.document)
    adapter.prepareResponse?.(document)
    const payload = mode === 'encode' ? adapter.native(structuredClone(resources)) : undefined
    const start = performance.now()
    const result = operation(adapter, document, payload, fixture, mode)
    last = result && typeof result.then === 'function' ? await result : result
    elapsed += performance.now() - start
    count++
  } while (performance.now() < deadline)
  validateOperation(last, adapter, fixture, mode)
  return count / (elapsed / 1000)
}
