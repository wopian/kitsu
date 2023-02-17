import babel from '@rollup/plugin-babel'
import del from 'rollup-plugin-delete'
import local from 'rollup-plugin-local-resolve'

import package_ from './package.json'

const {
  sharedExternals,
  sharedGlobals,
  babelMain
} = require('../../config/presets')

const external = [...Object.keys(package_.dependencies), ...sharedExternals]

const globals = {
  ...sharedGlobals,
  axios: 'axios',
  'kitsu-core': 'kitsuCore',
  pluralize: 'pluralise'
}

const plugins = [del({ targets: './dist/*' }), local()]

const pluginsMain = [babel(babelMain), ...plugins]

export default {
  input: 'src/index.js',
  external,
  plugins: pluginsMain,
  output: [
    {
      file: `${package_.main}.js`,
      format: 'cjs',
      sourcemap: false,
      globals
    },
    {
      file: `${package_.module}.mjs`,
      format: 'es',
      sourcemap: false,
      globals
    }
  ]
}
