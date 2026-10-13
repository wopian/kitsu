import { readdir, rm } from 'node:fs/promises'
import { resolve } from 'node:path'

const names = process.argv[2] ? [process.argv[2]] : ['kitsu-core', 'kitsu']
for (const name of names) {
  if (!['kitsu-core', 'kitsu'].includes(name)) throw new Error(`Unknown package: ${name}`)
  const directory = resolve(import.meta.dir, '..', 'packages', name)
  const sourceFiles = (await readdir(`${directory}/src`)).filter(
    (file) =>
      file.endsWith('.ts') &&
      !file.endsWith('.spec.ts') &&
      !['types.ts', 'deepEqual.ts'].includes(file),
  )
  await rm(`${directory}/dist`, { recursive: true, force: true })
  await rm(`${directory}/types`, { recursive: true, force: true })
  const build = Bun.spawnSync(
    [
      'bun',
      'build',
      ...sourceFiles.map((file) => `src/${file}`),
      '--check',
      '--format',
      'esm',
      '--target',
      'node',
      '--splitting',
      '--outdir',
      'dist',
      '--entry-naming',
      '[name].mjs',
      '--chunk-naming',
      'chunk-[hash].mjs',
      '--external',
      'axios',
      '--external',
      'pluralize',
      '--external',
      'kitsu-core',
    ],
    { cwd: directory, stdout: 'inherit', stderr: 'inherit' },
  )
  if (build.exitCode) process.exit(build.exitCode)
}
const declarations = Bun.spawnSync(['bun', 'run', 'build:types'], {
  cwd: resolve(import.meta.dir, '..'),
  stdout: 'inherit',
  stderr: 'inherit',
})
process.exit(declarations.exitCode)
