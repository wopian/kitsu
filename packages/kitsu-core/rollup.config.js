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
  ...sharedExternals
]

const globals = {
  ...sharedGlobals
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
    output: {
      file: `${pkg.main}`,
      format: 'cjs',
      sourcemap: false,
      globals
    },
  },
  {
    input: {
      index: 'src/index.js',
      camel: 'src/camel/index.js',
      deattribute: 'src/deattribute/index.js',
      deserialise: 'src/deserialise/index.js',
      error: 'src/error/index.js',
      filterIncludes: 'src/filterIncludes/index.js',
      kebab: 'src/kebab/index.js',
      linkRelationships: 'src/linkRelationships/index.js',
      query: 'src/query/index.js',
      serialise: 'src/serialise/index.js',
      snake: 'src/snake/index.js'
    },
    external,
    plugins: pluginsMain,
    output: [
      {
        dir: 'lib',
        entryFileNames: '[name].mjs',
        format: 'es',
        sourcemap: false,
        globals
      }
    ]
  },
  {
    input: {
      index: 'src/index.js',
      camel: 'src/camel/index.js',
      deattribute: 'src/deattribute/index.js',
      deserialise: 'src/deserialise/index.js',
      error: 'src/error/index.js',
      filterIncludes: 'src/filterIncludes/index.js',
      kebab: 'src/kebab/index.js',
      linkRelationships: 'src/linkRelationships/index.js',
      query: 'src/query/index.js',
      serialise: 'src/serialise/index.js',
      snake: 'src/snake/index.js'
    },
    external,
    plugins: pluginsNode,
    output: [
      {
        dir: 'node',
        entryFileNames: '[name].js',
        format: 'cjs',
        sourcemap: false,
        globals
      },
      {
        dir: 'node',
        entryFileNames: '[name].mjs',
        format: 'es',
        sourcemap: false,
        globals
      }
    ]
  }
]
