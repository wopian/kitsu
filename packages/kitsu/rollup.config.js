import babel from 'rollup-plugin-babel'
import local from 'rollup-plugin-local-resolve'
import pkg from './package.json'

const {
  sharedExternals,
  sharedGlobals,
  babelMain,
  babelNode
} = require('../../config/presets')

let external = [
  ...Object.keys(pkg.dependencies),
  ...sharedExternals,
  '@babel/runtime/helpers/slicedToArray'
]

let globals = {
  ...sharedGlobals,
  'axios': 'axios',
  'kitsu-core': 'kitsuCore',
  'pluralize': 'pluralise',
  '@babel/runtime/helpers/slicedToArray': '_slicedToArray'
}

let plugins = [
  local()
]

let pluginsMain = [
  babel(babelMain),
  ...plugins
]

let pluginsNode = [
  babel(babelNode),
  ...plugins
]

export default [
  {
    input: 'src/index.js',
    external,
    plugins: pluginsMain,
    output: [
      {
        file: `${pkg.main}/index.js`,
        format: 'cjs',
        sourcemap: false,
        globals
      },
      {
        file: `${pkg.module}/index.mjs`,
        format: 'es',
        sourcemap: false,
        globals
      }
    ]
  },
  {
    input: 'src/index.js',
    external,
    plugins: pluginsNode,
    output: [
      {
        file: 'node/index.js',
        format: 'cjs',
        sourcemap: false,
        globals
      },
      {
        file: 'node/index.mjs',
        format: 'es',
        sourcemap: false,
        globals
      }
    ]
  }
]
