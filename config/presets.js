const minNode = 12
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

const sharedConfig = {
  babelrc: false,
  configFile: false,
  comments: false,
  exclude,
  babelHelpers: 'bundled'
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

module.exports = {
  sharedExternals,
  sharedGlobals,
  babelTest,
  babelMain
}
