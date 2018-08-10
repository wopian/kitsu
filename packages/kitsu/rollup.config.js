import babel from 'rollup-plugin-babel'
import local from 'rollup-plugin-local-resolve'
import pkg from './package.json'

const {
  sharedExternals,
  sharedGlobals,
  babelMain,
  babelNode,
  babelLegacy
} = require('../../config/presets')

let external = [
  ...Object.keys(pkg.dependencies),
  ...sharedExternals,
  '@babel/runtime/helpers/slicedToArray',
  '@babel/runtime/helpers/classCallCheck', // Legacy
  '@babel/runtime/helpers/createClass' // Legacy
]

let globals = {
  ...sharedGlobals,
  'axios': 'axios',
  'kitsu-core': 'kitsuCore',
  'querystringify': 'qs',
  '@babel/runtime/helpers/slicedToArray': '_slicedToArray',
  '@babel/runtime/helpers/classCallCheck': '_classCallCheck', // Legacy
  '@babel/runtime/helpers/createClass': '_createClass' // Legacy
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
let pluginsLegacy = [
  babel(babelLegacy),
  ...plugins
]

export default [
  {
    input: 'src/index.js',
    external,
    plugins: pluginsMain,
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
        globals
      }
      /*
      TODO: Use Babel itself instead of Rollup to produce output
            e.g CommonJS: src -> lib,node,legacy
                 Modules: src -> lib,node
      {
        file: pkg.module,
        format: 'es',
        sourcemap: true,
        globals
      }
      */
    ]
  },
  {
    // Node-only bundle
    input: 'src/index.js',
    external,
    plugins: pluginsNode,
    output: [
      {
        file: 'node/index.js',
        format: 'cjs',
        sourcemap: true,
        globals
      }
      /*
      {
        file: 'node/index.mjs',
        format: 'es',
        sourcemap: true,
        globals
      }
      */
    ]
  },
  {
    // Legacy IE10+ bundle
    input: 'src/index.js',
    external,
    plugins: pluginsLegacy,
    output: {
      file: 'legacy/index.js',
      format: 'umd',
      name: 'Kitsu',
      sourcemap: true,
      globals
    }
  }
]
