const { babelTest } = require('./presets')
module.exports = require('babel-jest').default.createTransformer(babelTest)
