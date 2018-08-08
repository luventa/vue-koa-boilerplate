'use strict'

const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const config = require('../config')
const baseConfig = require('./webpack.base.conf')
const utils = require('./utils')

Object.keys(baseConfig.entry).forEach(name => {
  baseConfig.entry[name] = ['./scripts/dev-client'].concat(baseConfig.entry[name])
})

module.exports = merge(baseConfig, {
  output: {
    path: config.output.root,
    publicPath: config.dev.assetsPublicPath,
    filename: '[name].js'
  },
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: '[DEV] Vue Koa Boilerplate',
      filename: 'index.html',
      template: 'src/static/index.html',
      inject: true,
      favicon: 'src/static/favicon.ico'
    }),
    new FriendlyErrorsPlugin()
  ]
})
