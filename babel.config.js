const { babelMain, babelTest } = require('./config/presets')

module.exports = {
  env: {
    development: {
      presets: babelTest.presets
    },
    test: {
      presets: babelTest.presets
    },
    production: {
      presets: babelMain.presets,
      plugins: babelMain.plugins
    }
  }
}
