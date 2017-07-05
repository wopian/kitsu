import babel from 'rollup-plugin-babel'
import json from 'rollup-plugin-json'
import pkg from './package.json'

let external = Object.keys(pkg.dependencies)
let plugins = [
  babel({
    exclude: [ '*.json', 'node_modules/**/*' ],
    runtimeHelpers: true
  }),
  json()
]

export default {
  entry: 'src/index.js',
  external: [
    'babel-runtime/regenerator',
    'babel-runtime/helpers/asyncToGenerator',
    'babel-runtime/helpers/classCallCheck',
    'babel-runtime/helpers/createClass',
    'babel-runtime/helpers/typeof',
    ...external
  ],
  plugins,
  globals: {
    'babel-runtime/regenerator': '_regeneratorRuntime',
    'babel-runtime/helpers/asyncToGenerator': '_asyncToGenerator',
    'babel-runtime/helpers/classCallCheck': '_classCallCheck',
    'babel-runtime/helpers/createClass': '_createClass',
    'babel-runtime/helpers/typeof': '_typeof',
    'client-oauth2': 'OAuth2',
    camelcase: 'camel',
    got: 'r'
  },
  targets: [
    {
      dest: pkg.main,
      format: 'umd',
      moduleName: 'kitsu',
      sourceMap: false
    },
    {
      dest: pkg.module,
      format: 'es',
      sourceMap: false
    }
  ],
  onwarn: ({ code, message }) => {
    // Suppress the following error message:
    // https://github.com/rollup/rollup/wiki/Troubleshooting#this-is-undefined
    if (code === 'THIS_IS_UNDEFINED') return
    console.error(message)
  }
}
