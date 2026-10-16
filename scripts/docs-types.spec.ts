import { describe, expect, test } from 'bun:test'
import { readdir } from 'node:fs/promises'
import ts from 'typescript'
import { documentTypes, typescriptExamples } from './docs-types.js'

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
    expect(output).toContain("const options: ClientOptions = { query: 'modern' }")
    expect(output).not.toContain('"use strict"')
  })

  test('labels TypeScript examples without changing annotations or other code fences', () => {
    const markdown = [
      '```javascript',
      'const timeout: number = 30000',
      '```',
      '```js',
      "const mode: 'modern' = 'modern'",
      '```',
      '```json',
      '{ "timeout": 30000 }',
      '```',
      '```bash',
      'bun add kitsu',
      '```',
    ].join('\n')
    const output = typescriptExamples(markdown)
    expect(output.match(/^```typescript$/gm)).toHaveLength(2)
    expect(output).toContain('const timeout: number = 30000')
    expect(output).toContain("const mode: 'modern' = 'modern'")
    expect(output).toContain('```json\n{ "timeout": 30000 }')
    expect(output).toContain('```bash\nbun add kitsu')
    expect(typescriptExamples(output)).toBe(output)
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

  test('public option parameters cover every interface field and examples parse', async () => {
    for (const name of ['kitsu-core', 'kitsu', 'kitsu-native']) {
      const directory = `${import.meta.dir}/../packages/${name}/src`
      const types = ts.createSourceFile(
        'types.ts',
        await Bun.file(`${directory}/types.ts`).text(),
        ts.ScriptTarget.Latest,
        true,
      )
      const interfaces = new Map(
        types.statements.filter(ts.isInterfaceDeclaration).map((node) => [node.name.text, node]),
      )
      function fields(node: ts.InterfaceDeclaration): string[] {
        return [
          ...node.members
            .filter(ts.isPropertySignature)
            .map((member) => member.name.getText(types)),
          ...(node.heritageClauses ?? []).flatMap((clause) =>
            clause.types.flatMap((parent) => {
              const inherited = interfaces.get(parent.expression.getText(types))
              return inherited ? fields(inherited) : []
            }),
          ),
        ]
      }
      for (const fileName of (await readdir(directory)).filter(
        (file) => file.endsWith('.ts') && !file.endsWith('.spec.ts') && file !== 'types.ts',
      )) {
        const file = ts.createSourceFile(
          fileName,
          await Bun.file(`${directory}/${fileName}`).text(),
          ts.ScriptTarget.Latest,
          true,
        )
        function check(node: ts.Node, parameters: ts.NodeArray<ts.ParameterDeclaration>) {
          const tags = ts.getJSDocTags(node)
          const paths = tags.filter(ts.isJSDocParameterTag).map((tag) => tag.name.getText(file))
          for (const parameter of parameters) {
            if (!parameter.type || !ts.isTypeReferenceNode(parameter.type)) continue
            const typeName = parameter.type.typeName.getText(file)
            if (!/(Options|RequestConfig|ArbitraryRequest)$/.test(typeName)) continue
            const definition = interfaces.get(typeName)
            if (!definition) continue
            const root = ts.isIdentifier(parameter.name) ? parameter.name.text : 'config'
            for (const field of fields(definition)) {
              expect(paths, `${name}/${fileName}: ${root}.${field}`).toContain(`${root}.${field}`)
            }
          }
          for (const tag of tags.filter((item) => item.tagName.text === 'example')) {
            const example = (ts.getTextOfJSDocComment(tag.comment) ?? '').replace(
              /^<caption>[\s\S]*?<\/caption>\s*/,
              '',
            )
            const parsed = ts.createSourceFile('example.ts', example, ts.ScriptTarget.Latest, true)
            expect(
              (parsed as ts.SourceFile & { parseDiagnostics: unknown[] }).parseDiagnostics,
              `${name}/${fileName}: ${example}`,
            ).toEqual([])
          }
        }
        for (const node of file.statements) {
          if (
            !ts.canHaveModifiers(node) ||
            !ts.getModifiers(node)?.some((item) => item.kind === ts.SyntaxKind.ExportKeyword)
          )
            continue
          if (ts.isFunctionDeclaration(node)) check(node, node.parameters)
          if (ts.isClassDeclaration(node)) {
            for (const member of node.members) {
              if (ts.isConstructorDeclaration(member)) check(node, member.parameters)
              if (ts.isMethodDeclaration(member) && !ts.isPrivateIdentifier(member.name))
                check(member, member.parameters)
            }
          }
        }
      }
    }
  })
})
