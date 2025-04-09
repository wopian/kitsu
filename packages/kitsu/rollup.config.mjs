import babel from '@rollup/plugin-babel'
import local from 'rollup-plugin-local-resolve'
import del from 'rollup-plugin-delete'

import pkg from './package.json' with { type: 'json' }
import { sharedExternals, sharedGlobals, babelMain } from '../../config/presets.js'

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
  del({ targets: './dist/*' }),
  local()
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
      file: `${pkg.main}.js`,
      format: 'cjs',
      sourcemap: false,
      globals
    },
    {
      file: `${pkg.module}.mjs`,
      format: 'es',
      sourcemap: false,
      globals
    }
  ]
}
