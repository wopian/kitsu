const minNode = 6
const mainBrowsers = [
  'last 2 years',
  'not < 0.05%'
]

const sharedExternals = [
  '@babel/runtime/regenerator',
  '@babel/runtime/helpers/asyncToGenerator'
]

const sharedGlobals = {
  '@babel/runtime/regenerator': '_regeneratorRuntime',
  '@babel/runtime/helpers/asyncToGenerator': '_asyncToGenerator'
}

/* Babel Config */
const exclude = [ '*.json', 'node_modules/**/*' ]

const runtimeHelpers = true

const plugins = [
  'babel-plugin-minify-constant-folding',
  'babel-plugin-minify-dead-code-elimination',
  'babel-plugin-minify-flip-comparisons',
  'babel-plugin-minify-guarded-expressions',
  'babel-plugin-minify-infinity',
  'babel-plugin-minify-simplify',
  'babel-plugin-minify-type-constructors',
  'babel-plugin-transform-inline-consecutive-adds',
  'babel-plugin-transform-member-expression-literals',
  'babel-plugin-transform-merge-sibling-variables',
  'babel-plugin-transform-minify-booleans',
  'babel-plugin-transform-property-literals',
  'babel-plugin-transform-regexp-constructors',
  'babel-plugin-transform-remove-undefined',
  'babel-plugin-transform-undefined-to-void',
  [ '@babel/plugin-transform-runtime', {
    regenerator: true
  } ]
]

const sharedConfig = {
  babelrc: false,
  comments: false,
  exclude,
  runtimeHelpers,
  plugins
}

const babelTest = {
  retainLines: true,
  presets: [
    [ '@babel/env', {
      targets: {
        node: minNode
      }
    } ]
  ]
}

const babelMain = {
  ...sharedConfig,
  presets: [
    [ '@babel/env', {
      targets: {
        browsers: mainBrowsers,
        node: minNode
      },
      modules: false
    } ]
  ]
}

const babelNode = {
  ...sharedConfig,
  presets: [
    [ '@babel/env', {
      targets: {
        node: minNode
      },
      modules: false
    } ]
  ]
}

module.exports = {
  sharedExternals,
  sharedGlobals,
  babelTest,
  babelMain,
  babelNode
}
