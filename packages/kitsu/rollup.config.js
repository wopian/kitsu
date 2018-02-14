import babel from 'rollup-plugin-babel'
import minify from 'rollup-plugin-babel-minify'
import local from 'rollup-plugin-local-resolve'
import pkg from './package.json'

let external = [
  ...Object.keys(pkg.dependencies)
]

let globals = {
}

let plugins = [
  babel({ exclude: [ '*.json', 'node_modules/**/*' ], runtimeHelpers: true }),
  minify({ comments: false, mangle: true }),
  local()
]

export default {
  input: 'src/index.js',
  external,
  plugins,
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
      globals
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
      globals
    }
  ]
}
