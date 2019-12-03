const minNode = 8
const mainBrowsers = [
  'last 2 years',
  'not < 0.05%'
]

const sharedExternals = [
]

const sharedGlobals = {
}

/* Babel Config */
const exclude = [ '*.json', 'node_modules/**/*' ]

const runtimeHelpers = true

const sharedConfig = {
  babelrc: false,
  configFile: false,
  comments: false,
  exclude,
  runtimeHelpers
}

const babelTest = {
  retainLines: true,
  presets: [
    [ '@babel/env', {
      targets: {
        node: 6
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

module.exports = {
  sharedExternals,
  sharedGlobals,
  babelTest,
  babelMain
}
