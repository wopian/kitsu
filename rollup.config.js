import babel from 'rollup-plugin-babel'
import minify from 'rollup-plugin-babel-minify'
import local from 'rollup-plugin-local-resolve'
import pkg from './package.json'

const onwarn = ({ code, message }) => {
  // Suppress the following error message:
  // https://github.com/rollup/rollup/wiki/Troubleshooting#this-is-undefined
  if (code === 'THIS_IS_UNDEFINED') return
  console.error(message)
}

let external = [
  'babel-runtime/helpers/asyncToGenerator',
  'babel-runtime/helpers/slicedToArray',
  ...Object.keys(pkg.dependencies)
]
let externalLegacy = [
  'babel-runtime/regenerator',
  'babel-runtime/helpers/asyncToGenerator',
  'babel-runtime/helpers/classCallCheck',
  'babel-runtime/helpers/createClass',
  'babel-runtime/helpers/slicedToArray',
  'babel-runtime/helpers/typeof',
  ...external
]

let pluginsCommon = [
  minify({ comments: false, mangle: false }),
  local()
]
let plugins = [
  babel({ exclude: [ '*.json', 'node_modules/**/*' ], runtimeHelpers: true }),
  ...pluginsCommon
]
let pluginsLegacy = [
  babel({
    exclude: [ '*.json', 'node_modules/**/*' ],
    runtimeHelpers: true,
    presets: [ [ 'env', { targets: { browsers: ['>= 0.1%'], node: 6 }, modules: false } ], 'stage-0' ]
  }),
  ...pluginsCommon
]

let globals = {
  'babel-runtime/helpers/asyncToGenerator': '_asyncToGenerator',
  'babel-runtime/helpers/slicedToArray': '_slicedToArray',
  'axios': 'axios'
}
let globalsLegacy = {
  'babel-runtime/regenerator': '_regeneratorRuntime',
  'babel-runtime/helpers/classCallCheck': '_classCallCheck',
  'babel-runtime/helpers/createClass': '_createClass',
  'babel-runtime/helpers/typeof': '_typeof',
  ...globals
}

export default [
  {
    input: 'src/index.js',
    external,
    plugins,
    onwarn,
    output: [
      {
        file: pkg.main,
        format: 'umd',
        name: 'kitsu',
        globals
      },
      {
        file: pkg.module,
        format: 'es',
        globals
      }
    ]
  },
  {
    // Legacy IE10+ bundle
    input: 'src/index.js',
    external: externalLegacy,
    plugins: pluginsLegacy,
    onwarn,
    output: {
      file: 'lib/legacy/index.js',
      format: 'umd',
      name: 'kitsu',
      globals: globalsLegacy
    }
  }
]
