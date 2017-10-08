'use strict'

const utils = require('./utils')
const config = require('./config')

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: process.env.isBuild ? config.build.productionSourceMap : config.dev.cssSourceMap,
    extract: process.env.isBuild
  }),
  postcss: [
    require('autoprefixer')({
      browsers: ['last 3 versions']
    })
  ]
}
