const { babelTest } = require('./presets')
module.exports = require('babel-jest').createTransformer(babelTest)
