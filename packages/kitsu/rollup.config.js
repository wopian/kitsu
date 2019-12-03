import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'
import local from 'rollup-plugin-local-resolve'
import pkg from './package.json'

const {
  sharedExternals,
  sharedGlobals,
  babelMain
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

export default {
  input: 'src/index.js',
  external,
  plugins: pluginsMain,
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: false,
      globals
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: false,
      globals
    }
  ]
}
