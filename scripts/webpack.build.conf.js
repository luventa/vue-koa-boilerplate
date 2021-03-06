'use strict'

const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('../config')
const baseConfig = require('./webpack.base.conf')
const utils = require('./utils')

const clientConfig = merge(baseConfig, {
  output: {
    path: config.output.client,
    publicPath: config.build.assetsPublicPath,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      'screw-ie8': true,
      sourceMap: true,
      compress: {
        warnings: false,
        drop_debugger: config.isProd,
        drop_console: config.isProd
      },
      output: {
        comments: false
      }
    }),
    // extract css into its own file. mini-css-extract-plugin only supports webpack 4, will update later.
    new ExtractTextPlugin(utils.assetsPath('css/[name].[contenthash].css')),
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      title: 'Vue Koa Boilerplate',
      filename: 'index.html',
      template: 'src/static/index.html',
      inject: true,
      favicon: 'src/static/favicon.ico',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options: https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    })
  ]
})

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  clientConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (!config.build.nodeServerEnabled) {
  const CopyWebpackPlugin = require('copy-webpack-plugin')

  clientConfig.plugins.push(
    new CopyWebpackPlugin([
      {
        from: '+(dll|static)/**',
        to: config.output.root,
        context: config.source.root,
        ignore: ['.*', '*.html', '*.ico']
      }
    ])
  )
}

if (process.env.MODE === 'analyze') {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  clientConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = clientConfig
