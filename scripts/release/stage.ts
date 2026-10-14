import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { type PlannedPackage, packageNames } from './types.ts'

export function integrity(bytes: Uint8Array): string {
  return `sha512-${createHash('sha512').update(bytes).digest('base64')}`
}
export async function stagePackages(
  version: string,
  output: string,
  root: string,
): Promise<PlannedPackage[]> {
  if (!/^\d+\.\d+\.\d+$/.test(version)) throw new Error(`Invalid release version: ${version}`)
  const packages: PlannedPackage[] = []
  await mkdir(output, { recursive: true })
  for (const name of packageNames) {
    const source = resolve(root, 'packages', name)
    const staging = resolve(output, 'staging', name)
    await rm(staging, { recursive: true, force: true })
    await mkdir(staging, { recursive: true })
    for (const directory of ['dist', 'types'])
      await cp(resolve(source, directory), resolve(staging, directory), { recursive: true })
    for (const filename of ['README.md', 'MIGRATING.md', 'CHANGELOG.md'])
      await cp(resolve(source, filename), resolve(staging, filename))
    await cp(resolve(root, 'LICENSE.md'), resolve(staging, 'LICENSE.md'))
    const manifest = JSON.parse(await readFile(resolve(source, 'package.json'), 'utf8'))
    manifest.version = version
    delete manifest.scripts
    delete manifest.devDependencies
    delete manifest['size-limit']
    if (manifest.dependencies?.['kitsu-core']) manifest.dependencies['kitsu-core'] = `^${version}`
    await writeFile(resolve(staging, 'package.json'), `${JSON.stringify(manifest, null, 2)}\n`)
    const packed = JSON.parse(
      execFileSync('npm', ['pack', '--json', '--ignore-scripts', '--pack-destination', output], {
        cwd: staging,
        encoding: 'utf8',
        shell: process.platform === 'win32',
      }),
    )
    const filename: string = packed[0].filename
    packages.push({
      name,
      filename,
      integrity: integrity(await readFile(resolve(output, filename))),
    })
  }
  return packages
}
