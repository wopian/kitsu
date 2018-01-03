import babel from 'rollup-plugin-babel'
import minify from 'rollup-plugin-babel-minify'
import local from 'rollup-plugin-local-resolve'
import pkg from './package.json'

let external = Object.keys(pkg.dependencies)
let plugins = [
  babel({ exclude: [ '*.json', 'node_modules/**/*' ], runtimeHelpers: true }),
  minify({ comments: false }),
  local()
]
let globals = {
  'babel-runtime/helpers/asyncToGenerator': '_asyncToGenerator',
  'axios': 'axios'
}
let legacy = {
  plugins: [
    babel({
      babelrc: false,
      exclude: [ '*.json', 'node_modules/**/*' ],
      runtimeHelpers: true,
      presets: [ 'minify', [ 'env', { targets: { browsers: ['>= 0.1%'], node: 6 }, modules: false } ], 'stage-0' ],
      plugins: [ [ 'transform-runtime', { polyfill: false, regenerator: true } ] ]
    }),
    minify({ comments: false }),
    local()
  ],
  globals: {
    'babel-runtime/regenerator': '_regeneratorRuntime',
    'babel-runtime/helpers/classCallCheck': '_classCallCheck',
    'babel-runtime/helpers/createClass': '_createClass',
    'babel-runtime/helpers/typeof': '_typeof',
    ...globals
  }
}

export default [
  {
    input: 'src/index.js',
    external: [
      'babel-runtime/helpers/asyncToGenerator',
      ...external
    ],
    plugins,
    output: [
      {
        file: pkg.main,
        format: 'umd',
        name: 'kitsu',
        sourcemap: true,
        globals
      },
      {
        file: pkg.module,
        format: 'es',
        sourcemap: true,
        globals
      }
    ],
    onwarn: ({ code, message }) => {
      // Suppress the following error message:
      // https://github.com/rollup/rollup/wiki/Troubleshooting#this-is-undefined
      if (code === 'THIS_IS_UNDEFINED') return
      console.error(message)
    }
  },
  {
    // Legacy IE10+ bundle
    input: 'src/index.js',
    external: [
      'babel-runtime/regenerator',
      'babel-runtime/helpers/asyncToGenerator',
      'babel-runtime/helpers/classCallCheck',
      'babel-runtime/helpers/createClass',
      'babel-runtime/helpers/typeof',
      ...external
    ],
    plugins: legacy.plugins,
    output: {
      file: 'lib/legacy/index.js',
      format: 'umd',
      name: 'kitsu',
      sourcemap: true,
      globals: legacy.globals
    },
    onwarn: ({ code, message }) => {
      // Suppress the following error message:
      // https://github.com/rollup/rollup/wiki/Troubleshooting#this-is-undefined
      if (code === 'THIS_IS_UNDEFINED') return
      console.error(message)
    }
  }
]
