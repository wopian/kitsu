import { describe, expect, test } from 'bun:test'
import ts from 'typescript'
import { documentTypes } from './docs-types.js'

describe('public type documentation', () => {
  test('retains inherited fields, enum values, callback signatures and nested options', () => {
    const source = `
/** Request options. @example const request: RequestOptions = { headers: {} } */
export interface RequestOptions {
  /** Default headers. @example { Accept: 'application/vnd.api+json' } */
  headers?: Record<string, string>
}
/** Client options. @example const options: ClientOptions = { query: 'modern' } */
export interface ClientOptions extends RequestOptions {
  /** Query serializer. @example 'modern' */
  query?: 'traditional' | 'modern' | ((params?: object) => string)
  /** Error location. @example { header: 'Accept' } */
  source?: {
    /** Header name. @example 'Accept' */
    header?: string
  }
  /** Extra values. @example { custom: true } */
  [member: string]: any
}`
    const output = documentTypes(source, 'options.ts')
    expect(output.match(/@property \{Object\} \[headers\]/g)).toHaveLength(2)
    expect(output).toContain("('traditional'|'modern'|function(Object=): string)")
    expect(output).toContain('@property {string} [source.header]')
    expect(output).toContain("Example: `'Accept'`")
    expect(output).toContain('Additional members')
    // Nested source comments must never terminate the generated JSDoc block.
    const parsed = ts.createSourceFile(
      'docs.js',
      output,
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.JS,
    )
    expect((parsed as ts.SourceFile & { parseDiagnostics: unknown[] }).parseDiagnostics).toEqual([])
    expect(output).not.toContain('const options: ClientOptions')
  })

  test.each([
    [
      'missing interface description',
      '/** @example const options = {} */ export interface Options {}',
    ],
    ['missing interface example', '/** Options. */ export interface Options {}'],
    [
      'missing property docs',
      '/** Options. @example const options = {} */ export interface Options { timeout?: number }',
    ],
    [
      'missing property example',
      '/** Options. @example const options = {} */ export interface Options { /** Timeout. */ timeout?: number }',
    ],
    ['missing alias docs', 'export type Options = string'],
  ])('rejects %s', (_, source) => {
    expect(() => documentTypes(source, 'options.ts')).toThrow(
      'needs a JSDoc description and @example',
    )
  })

  test('all published interfaces and aliases have descriptions and examples', async () => {
    for (const name of ['kitsu-core', 'kitsu', 'kitsu-native']) {
      const file = `${import.meta.dir}/../packages/${name}/src/types.ts`
      const source = await Bun.file(file).text()
      const output = documentTypes(source, file)
      expect(output).toContain('@typedef')
      expect(output).toContain('@example')
    }
  })
})
