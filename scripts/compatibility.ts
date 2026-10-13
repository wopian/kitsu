import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import ts from 'typescript'

// Compare emitted code before bundler optimization. Any changed runtime token fails.
const root = resolve(import.meta.dir, '..')
const baseline = 'v11.1.1'
const directory = resolve(root, '.cache/compatibility')
await mkdir(directory, { recursive: true })
function runtimeShape(source: string): unknown {
  const emitted = ts.transpileModule(source, {
    compilerOptions: {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.ESNext,
      removeComments: true,
      useDefineForClassFields: true,
    },
  }).outputText
  const tree = ts.createSourceFile(
    'runtime.js',
    emitted,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.JS,
  )
  function shape(node: ts.Node): unknown {
    if (ts.isParenthesizedExpression(node)) return shape(node.expression)
    const children = node
      .getChildren(tree)
      .filter(
        (child) =>
          ![
            ts.SyntaxKind.EmptyStatement,
            ts.SyntaxKind.SemicolonToken,
            ts.SyntaxKind.CommaToken,
            ts.SyntaxKind.OpenParenToken,
            ts.SyntaxKind.CloseParenToken,
          ].includes(child.kind),
      )
    if (children.length) return [node.kind, ...children.map(shape)]
    return [node.kind, 'text' in node ? node.text : node.getText(tree)]
  }
  return shape(tree)
}
const entries = [
  'camel',
  'deattribute',
  'deepEqual',
  'deserialise',
  'error',
  'filterIncludes',
  'kebab',
  'linkRelationships',
  'query',
  'serialise',
  'snake',
  'splitModel',
]
let count = 0
for (const name of [...entries, 'kitsu']) {
  const legacyPath =
    name === 'kitsu' ? 'packages/kitsu/src/index.js' : `packages/kitsu-core/src/${name}/index.js`
  let before = execFileSync('git', ['show', `${baseline}:${legacyPath}`], {
    cwd: root,
    encoding: 'utf8',
  })
  const currentPath =
    name === 'kitsu' ? 'packages/kitsu/src/index.ts' : `packages/kitsu-core/src/${name}.ts`
  let after = await readFile(resolve(root, currentPath), 'utf8')
  // Normalize only imports, type-only exports, and non-semantic parentheses added by assertions.
  before = before.replace(/^import .*$/gm, '')
  after = after
    .replace(/^import (?:type )?[\s\S]*?from ['"][^'"]+['"]\s*$/gm, '')
    .replace(/^export type \*.*$/gm, '')
  assert.deepEqual(
    runtimeShape(after),
    runtimeShape(before),
    `Runtime code changed: ${currentPath}`,
  )
  count++
}
await writeFile(
  resolve(directory, 'result.json'),
  JSON.stringify({ baseline, modules: count, runtimeStructureEqual: true }, null, 2),
)
console.log(`Runtime structure matches ${baseline} across ${count} implementation modules`)
