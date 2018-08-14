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
  [ '@babel/plugin-transform-runtime', {
    regenerator: true
  } ]
]

const babelTest = {
  retainLines: true,
  plugins,
  presets: [
    '@babel/env'
  ]
}

const babelMain = {
  babelrc: false,
  exclude,
  runtimeHelpers,
  plugins,
  presets: [
    [ '@babel/env', {
      targets: {
        browsers: mainBrowsers,
        node: minNode
      },
      modules: false
    } ],
    'minify'
  ]
}

const babelNode = {
  babelrc: false,
  exclude,
  runtimeHelpers,
  plugins,
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
