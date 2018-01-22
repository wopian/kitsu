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
  ...Object.keys(pkg.dependencies),
  'babel-runtime/regenerator',
  'babel-runtime/helpers/slicedToArray',
  'babel-runtime/helpers/asyncToGenerator',
  'babel-runtime/helpers/classCallCheck',
  'babel-runtime/helpers/createClass',
  'babel-runtime/helpers/typeof'
]

let globals = {
  'axios': 'axios',
  'babel-runtime/regenerator': '_regeneratorRuntime',
  'babel-runtime/helpers/slicedToArray': '_slicedToArray',
  'babel-runtime/helpers/asyncToGenerator': '_asyncToGenerator',
  'babel-runtime/helpers/classCallCheck': '_classCallCheck',
  'babel-runtime/helpers/createClass': '_createClass',
  'babel-runtime/helpers/typeof': '_typeof'
}

let plugins = [
  minify({ comments: false, mangle: false }),
  local()
]
let pluginsMain = [
  babel({ exclude: [ '*.json', 'node_modules/**/*' ], runtimeHelpers: true }),
  ...plugins
]
let pluginsNode = [
  babel({
    babelrc: false,
    exclude: [ '*.json', 'node_modules/**/*' ],
    runtimeHelpers: true,
    presets: [ [ 'env', { targets: { node: 6 }, modules: false } ], 'stage-0' ],
    plugins: [ [ 'transform-runtime', { polyfill: false, regenerator: true } ]
    ]
  }),
  ...plugins
]
let pluginsLegacy = [
  babel({
    exclude: [ '*.json', 'node_modules/**/*' ],
    runtimeHelpers: true,
    presets: [ [ 'env', { targets: { browsers: ['last 10 years'], node: 6 }, modules: false } ], 'stage-0' ]
  }),
  ...plugins
]

export default [
  {
    input: 'src/index.js',
    external,
    plugins: pluginsMain,
    onwarn,
    output: [
      {
        file: pkg.main,
        format: 'umd',
        name: 'Kitsu',
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
    // Node-only bundle
    input: 'src/index.js',
    external,
    plugins: pluginsNode,
    onwarn,
    output: [
      {
        file: 'lib/node.js',
        format: 'umd',
        name: 'Kitsu',
        globals
      },
      {
        file: 'lib/node.mjs',
        format: 'es',
        globals
      }
    ]
  },
  {
    // Legacy IE10+ bundle
    input: 'src/index.js',
    external,
    plugins: pluginsLegacy,
    onwarn,
    output: {
      file: 'lib/legacy.js',
      format: 'umd',
      name: 'Kitsu',
      globals
    }
  }
]
