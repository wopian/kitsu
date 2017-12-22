import babel from 'rollup-plugin-babel'
import minify from 'rollup-plugin-babel-minify'
import local from 'rollup-plugin-local-resolve'
import pkg from './package.json'

let external = Object.keys(pkg.dependencies)
let plugins = [
  babel({
    exclude: [ '*.json', 'node_modules/**/*' ],
    runtimeHelpers: true
  }),
  minify({
    comments: false
  }),
  local()
]

export default {
  input: 'src/index.js',
  external: [
    'babel-runtime/helpers/asyncToGenerator',
    ...external
  ],
  plugins,
  globals: {
    'babel-runtime/helpers/asyncToGenerator': '_asyncToGenerator',
    decamelize: 'kebab',
    pluralize: 'plural',
    camelcase: 'camel',
    axios: 'axios'
  },
  output: [
    {
      file: pkg.main,
      format: 'umd',
      name: 'kitsu',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true
    }
  ],
  onwarn: ({ code, message }) => {
    // Suppress the following error message:
    // https://github.com/rollup/rollup/wiki/Troubleshooting#this-is-undefined
    if (code === 'THIS_IS_UNDEFINED') return
    console.error(message)
  }
}
