import { execFileSync } from 'node:child_process'
import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { integrity, stagePackages } from './release/stage.ts'
import { packageNames } from './release/types.ts'

const root = resolve(import.meta.dir, '..')
const output = resolve(root, '.cache/package-smoke')
await rm(output, { recursive: true, force: true })
await mkdir(output, { recursive: true })
const suppliedTarballs = process.argv[2] ? resolve(root, process.argv[2]) : null
const packages = suppliedTarballs
  ? await Promise.all(
      packageNames.map(async (name) => {
        const filename = `${name}-12.0.0.tgz`
        await cp(resolve(suppliedTarballs, filename), resolve(output, filename))
        return { name, filename, integrity: integrity(await readFile(resolve(output, filename))) }
      }),
    )
  : await stagePackages('12.0.0', output, root)
const consumer = resolve(output, 'consumer')
await mkdir(consumer, { recursive: true })
const axiosVersion = JSON.parse(
  await readFile(resolve(root, 'node_modules/axios/package.json'), 'utf8'),
).version
await writeFile(
  resolve(consumer, 'package.json'),
  JSON.stringify(
    {
      private: true,
      type: 'module',
      dependencies: {
        axios: axiosVersion,
        pluralize: '8.0.0',
        ...Object.fromEntries(packages.map((p) => [p.name, `file:../${p.filename}`])),
      },
    },
    null,
    2,
  ),
)
execFileSync('npm', ['install', '--ignore-scripts', '--no-audit', '--no-fund'], {
  cwd: consumer,
  stdio: 'inherit',
  shell: process.platform === 'win32',
})
await writeFile(
  resolve(consumer, 'tsconfig.json'),
  JSON.stringify(
    {
      compilerOptions: {
        target: 'ES2023',
        module: 'NodeNext',
        moduleResolution: 'NodeNext',
        strict: true,
        noEmit: true,
        types: [],
        skipLibCheck: true,
      },
      include: ['consumer.ts'],
    },
    null,
    2,
  ),
)
await writeFile(
  resolve(consumer, 'consumer.ts'),
  `import Kitsu, { type KitsuOptions, type RequestConfig } from 'kitsu'
import { camel, query, type JsonApiDocument, type FlatResource, type ResourceEnvelope, type JsonApiLink, type JsonApiError } from 'kitsu-core'
import { query as subpathQuery } from 'kitsu-core/query'
const options: KitsuOptions = { query: 'modern', headers: { Custom: true } }
const request: RequestConfig = { params: { filter: { id: 1 } } }
const document: JsonApiDocument = { data: null, meta: { count: 0 } }
const envelope: ResourceEnvelope = { lid: 'draft', links: { self: { href: '/people/1', hreflang: ['en'] } }, relationships: { author: { data: { type: 'people', id: '9' } } } }
const resource: FlatResource = { type: 'articles', id: 0, $: envelope }
const link: JsonApiLink = { href: '/articles/1', rel: 'self' }
const error: JsonApiError = { source: { header: 'Accept' } }
const configured: RequestConfig = { document: { meta: { source: 'cli' } } }
new Kitsu().patch('articles/1/relationships/author', null, configured)
// @ts-expect-error Wire IDs must be strings, unlike flat numeric input IDs.
const invalid: JsonApiDocument = { data: { type: 'articles', id: 0 } }
new Kitsu(options).get('anime', request)
camel('library-entry'); query(); subpathQuery()
// @ts-expect-error Invalid constructor option must fail consumer type checking.
new Kitsu({ resourceCase: 'invalid' })
void document
void resource; void link; void error; void invalid
`,
)
await writeFile(
  resolve(consumer, 'smoke.mjs'),
  `import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { readdir, readFile } from 'node:fs/promises'
import Kitsu from 'kitsu'
import * as core from 'kitsu-core'
const require = createRequire(import.meta.url)
for (const name of ['kitsu-core', 'kitsu']) {
  const manifest = JSON.parse(await readFile(new URL('./node_modules/' + name + '/package.json', import.meta.url), 'utf8'))
  assert.equal(manifest.version, '12.0.0')
  assert.equal(manifest.type, 'module')
  assert.equal(manifest.engines.node, '22 || 24 || >= 26')
  for (const [subpath, target] of Object.entries(manifest.exports)) {
    if (subpath === './package.json') continue
    assert.equal(target.require, undefined)
    await import(name + (subpath === '.' ? '' : subpath.slice(1)))
  }
  const files = await readdir(new URL('./node_modules/' + name + '/dist/', import.meta.url))
  assert(files.length > 0 && files.every((file) => file.endsWith('.mjs')))
  assert.throws(() => require(name), { code: 'ERR_PACKAGE_PATH_NOT_EXPORTED' })
}
for (const name of ['camel','deattribute','deserialise','error','filterIncludes','kebab','linkRelationships','query','serialise','snake']) {
  assert.equal(core[name], (await import('kitsu-core/' + name))[name])
}
assert.equal(core.camel('library-entry'), 'libraryEntry')
assert.equal(core.query({ id: [1, 2] }), 'id=1&id=2')
assert.deepEqual(core.serialise('posts', { id: 1, title: 'Hi' }, 'PATCH'), { data: { type: 'posts', id: '1', attributes: { title: 'Hi' } } })
const decoded = core.deserialise({ data: { type: 'articles', id: '1', meta: { resource: true }, relationships: { author: { data: { type: 'people', lid: 'p' } } } }, included: [{ type: 'people', lid: 'p', attributes: { name: 'Ada' } }] })
assert.equal(decoded.data.author, decoded.included[0])
assert.deepEqual(decoded.data.author, { type: 'people', name: 'Ada', $: { lid: 'p' } })
assert.deepEqual(core.serialise('articles', { id: 0, author: { type: 'people', id: '9' }, $: { meta: { resource: true } } }, 'PATCH'), { data: { type: 'articles', id: '0', meta: { resource: true }, relationships: { author: { data: { type: 'people', id: '9' } } } } })
const api = new Kitsu()
assert.equal(api.fetch, api.get); assert.equal(api.update, api.patch); assert.equal(api.create, api.post); assert.equal(api.remove, api.delete)
assert.equal(api.axios.defaults.baseURL, 'https://kitsu.app/api/edge')
assert.equal(api.camel, core.camel)
assert.equal(JSON.parse(await readFile(new URL('./node_modules/kitsu/package.json', import.meta.url), 'utf8')).dependencies['kitsu-core'], '^12.0.0')
console.log('Packed ESM imports, identity, declarations, and package metadata passed')
`,
)
execFileSync('node', [resolve(consumer, 'smoke.mjs')], { cwd: consumer, stdio: 'inherit' })
execFileSync('bun', ['check', '-p', resolve(consumer, 'tsconfig.json')], {
  cwd: consumer,
  stdio: 'inherit',
})
