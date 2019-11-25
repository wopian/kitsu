import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'
import local from 'rollup-plugin-local-resolve'
import pkg from './package.json'

const {
  sharedExternals,
  sharedGlobals,
  babelMain,
  babelNode
} = require('../../config/presets')

const external = [
  ...Object.keys(pkg.dependencies),
  ...sharedExternals
]

const globals = {
  ...sharedGlobals,
  axios: 'axios',
  'kitsu-core': 'kitsuCore',
  pluralize: 'pluralise'
}

const plugins = [
  local(),
  terser()
]

const pluginsMain = [
  babel(babelMain),
  ...plugins
]

const pluginsNode = [
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
        file: `${pkg.main}`,
        format: 'cjs',
        sourcemap: false,
        globals
      },
      {
        file: `${pkg.module}`,
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
