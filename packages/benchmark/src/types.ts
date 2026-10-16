import type { JsonApiDocument, JsonApiResource, JsonObject } from 'kitsu-core'

export type { JsonApiDocument, JsonApiResource, JsonObject }
export type Mode = 'decode' | 'encode' | 'decode-encode'
export type Suite = 'codec' | 'client'
export type Status = 'ok' | 'unsupported' | 'incorrect' | 'error' | 'timeout'
export interface Schema {
  attributes: string[]
  relationships: Record<string, { type: string; many: boolean; linkage: boolean }>
}
export interface Fixture {
  id: string
  document: JsonApiDocument
  schemas: Record<string, Schema>
  hash: string
  primaryCount: number
  includedCount: number
}
export interface View {
  roots: (output: any) => any
  type: (resource: any) => string
  id: (resource: any) => string
  attribute: (resource: any, key: string) => any
  relationship: (resource: any, key: string) => any
}
export interface Adapter {
  view: View
  requestsPerOperation?: Partial<Record<Mode, number>>
  decode?: (document: JsonApiDocument) => any
  decodeDocument?: (document: JsonApiDocument) => any
  encode?: (payload: any) => any
  native: (resources: JsonApiResource | JsonApiResource[]) => any
  reset?: () => void
  cleanup?: () => void
  activate?: () => void
  prepareResponse?: (document: JsonApiDocument) => void
}
export interface Cell {
  library: string
  suite: Suite
  mode: Mode
  fixture: string
  fixtureHash: string
  primaryCount: number
  includedCount: number
  status: Status
  reason?: string
  samples?: number[]
  operationsPerSecond?: number
  requestsPerSecond?: number
  requestsPerOperation?: number
}
export interface Measurement {
  schemaVersion: 1
  harnessHash: string
  sourceHash?: string
  dirty?: boolean
  runtime: string
  runtimeVersion: string
  runner: { os: string; arch: string; cpu: string }
  versions: Record<string, string>
  headSha: string
  baseSha?: string
  smoke: boolean
  partial?: boolean
  measuredAt: string
  cells: { head: Cell; base?: Cell }[]
}
export interface WorkerOptions {
  library: string
  suite: Suite
  mode: Mode
  fixture: string
  root: string
  baseRoot?: string
  smoke: boolean
}

export class Unsupported extends Error {}
export class Incorrect extends Error {}
