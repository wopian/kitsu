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
  /*
  resolve(),
  commonjs()
  */
]

export default {
  entry: 'src/index.js',
  external,
  plugins,
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
  ]
}
