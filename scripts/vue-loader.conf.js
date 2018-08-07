'use strict'

const utils = require('./utils')
const config = require('../config')

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: config.isDev ? config.dev.cssSourceMap : config.build.productionSourceMap,
    extract: !config.isDev
  }),
  postcss: [
    require('autoprefixer')({
      browsers: ['last 3 versions']
    })
  ]
}
