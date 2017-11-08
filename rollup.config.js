import babel from 'rollup-plugin-babel'
import minify from 'rollup-plugin-babel-minify'
import json from 'rollup-plugin-json'
import cleanup from 'rollup-plugin-cleanup'
import local from 'rollup-plugin-local-resolve'
import pkg from './package.json'

let external = Object.keys(pkg.dependencies)
let plugins = [
  babel({
    exclude: [ '*.json', 'node_modules/**/*' ],
    runtimeHelpers: true
  }),
  minify({
    comments: false,
    removeConsole: true,
    removeDebugger: true
  }),
  local(),
  json(),
  cleanup({
    extensions: [ '.js', '.mjs' ]
  })
]

export default {
  input: 'src/index.js',
  external: [
    'babel-runtime/helpers/asyncToGenerator',
    'babel-runtime/helpers/classCallCheck',
    'babel-runtime/helpers/createClass',
    'babel-runtime/helpers/typeof',
    'babel-runtime/regenerator',
    ...external
  ],
  plugins,
  globals: {
    'babel-runtime/helpers/asyncToGenerator': '_asyncToGenerator',
    'babel-runtime/helpers/classCallCheck': '_classCallCheck',
    'babel-runtime/helpers/createClass': '_createClass',
    'babel-runtime/helpers/typeof': '_typeof',
    'babel-runtime/regenerator': '_regeneratorRuntime',
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
      sourcemap: false
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: false
    }
  ],
  onwarn: ({ code, message }) => {
    // Suppress the following error message:
    // https://github.com/rollup/rollup/wiki/Troubleshooting#this-is-undefined
    if (code === 'THIS_IS_UNDEFINED') return
    console.error(message)
  }
}
