const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.conf')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const config = require('../config')
const utils = require('./utils')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.client.entry).forEach(name => {
  baseWebpackConfig.client.entry[name] = ['./scripts/dev-client'].concat(baseWebpackConfig.client.entry[name])
})

const clientWebpackConfig = merge(baseWebpackConfig.client, {
  name: 'client',
  output: {
    path: config.paths.output,
    publicPath: config.dev.assetsPublicPath,
    filename: '[name].js'
  },
  module: {
    loaders: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // extract vendor chunks for better caching
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js'
    }),
    // https://github.com/ampedandwired/html-webpack-plugin
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

module.exports = [ clientWebpackConfig, baseWebpackConfig.server ]
