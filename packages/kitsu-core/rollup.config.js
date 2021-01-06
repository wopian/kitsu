import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
import local from 'rollup-plugin-local-resolve'
import del from 'rollup-plugin-delete'
import pkg from './package.json'

const {
  sharedExternals,
  sharedGlobals,
  babelMain
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

export default [
  {
    input: 'src/index.js',
    plugins: [
      del({ targets: './dist/*' }),
      ...pluginsMain ],
    output: {
      file: `${pkg.unpkg}`,
      name: 'kitsuCore',
      format: 'umd',
      sourcemap: false,
      globals
    }
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
        dir: 'dist',
        entryFileNames: '[name].js',
        format: 'cjs',
        sourcemap: false,
        globals
      },
      {
        dir: 'dist',
        entryFileNames: '[name].mjs',
        format: 'es',
        sourcemap: false,
        globals
      }
    ]
  }
]
