import { mkdir, readdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import ts from 'typescript'

const [mode, name] = process.argv.slice(2)
if (
  !['lint', 'build'].includes(mode ?? '') ||
  !['kitsu', 'kitsu-core', 'kitsu-native'].includes(name ?? '')
) {
  throw new Error('Usage: bun scripts/docs.ts lint|build kitsu|kitsu-core|kitsu-native')
}
const root = resolve(import.meta.dir, '..')
const directory = `${root}/packages/${name}`
const output = `${root}/.cache/docs/${name}`
await mkdir(output, { recursive: true })
for (const file of (await readdir(`${directory}/src`, { recursive: true })).filter(
  (f) => f.endsWith('.ts') && !f.endsWith('.spec.ts'),
)) {
  // Documentation.js resolves .js imports. Preserve JSDoc while preparing its input;
  // published JavaScript is built exclusively by Bun.
  const source = await Bun.file(`${directory}/src/${file}`).text()
  const target = `${output}/${file.replace(/\.ts$/, '.js')}`
  await mkdir(dirname(target), { recursive: true })
  await writeFile(
    target,
    ts.transpileModule(source, {
      compilerOptions: {
        target: ts.ScriptTarget.ES2023,
        module: ts.ModuleKind.ESNext,
        removeComments: false,
      },
    }).outputText,
  )
}
const argumentsToRun =
  mode === 'lint'
    ? ['lint', `${output}/index.js`]
    : [
        'readme',
        `${output}/index.js`,
        '--readme-file',
        `${directory}/README.md`,
        '--section=API',
        '-g',
        'false',
        '--sort-order',
        'source',
      ]
const result = Bun.spawnSync(
  ['node', `${root}/node_modules/documentation/bin/documentation.js`, ...argumentsToRun],
  {
    cwd: directory,
    stdout: 'inherit',
    stderr: 'inherit',
  },
)
process.exit(result.exitCode)
