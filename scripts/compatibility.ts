import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import ts from 'typescript'
import Kitsu from '../packages/kitsu/src/index.ts'
import { isDeepEqual } from '../packages/kitsu-core/src/deepEqual.ts'
import {
  deattribute,
  deserialise,
  filterIncludes,
  linkRelationships,
  query,
  serialise,
} from '../packages/kitsu-core/src/index.ts'

// Keep the v11 structure gate for unchanged helpers. Changed codecs have explicit behavior gates.
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
const entries = ['camel', 'error', 'kebab', 'snake', 'splitModel']
let count = 0
for (const name of entries) {
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
assert.equal(isDeepEqual([1], { 0: 1 }), false)
const person = { type: 'people', id: '9', attributes: { name: 'Ada' }, meta: { active: true } }
const flat = { type: 'people', id: '9', name: 'Ada', $: { meta: { active: true } } }
assert.deepEqual(deattribute(person), flat)
assert.deepEqual(filterIncludes([person], { type: 'people', id: '9' }), person)
assert.deepEqual(
  linkRelationships(
    { type: 'articles', id: '1', relationships: { author: { data: { type: 'people', id: '9' } } } },
    [person],
  ).author,
  flat,
)
const decoded = deserialise({
  data: {
    type: 'articles',
    id: '1',
    relationships: { author: { data: { type: 'people', id: '9' } } },
  },
  included: [person],
})
assert.equal(decoded.data.author, decoded.included[0])
assert.deepEqual(serialise('articles', { id: 0, author: { type: 'people', id: '9' } }, 'PATCH'), {
  data: {
    type: 'articles',
    id: '0',
    relationships: { author: { data: { type: 'people', id: '9' } } },
  },
})
assert.equal(query({ include: '', filter: { name: 'a + b' } }), 'include=&filter%5Bname%5D=a+%2B+b')
const api = new Kitsu({
  axiosOptions: {
    adapter: async (config) => {
      assert.equal(config.url, 'articles/1/relationships/author')
      assert.deepEqual(JSON.parse(config.data), { data: { type: 'people', id: '9' } })
      return { data: '', status: 204, statusText: 'No Content', headers: {}, config }
    },
  },
})
assert.deepEqual(await api.patch('articles/1/relationships/author', { type: 'people', id: '9' }), {
  status: 204,
})
await writeFile(
  resolve(directory, 'result.json'),
  JSON.stringify(
    {
      baseline,
      unchangedModules: count,
      unchangedRuntimeStructureEqual: true,
      behaviorCheckedModules: [
        'deepEqual',
        'deattribute',
        'deserialise',
        'filterIncludes',
        'linkRelationships',
        'query',
        'serialise',
        'kitsu',
      ],
    },
    null,
    2,
  ),
)
console.log(
  `Unchanged structure matches ${baseline} across ${count} helpers; JSON:API 1.1 behavior checks passed`,
)
