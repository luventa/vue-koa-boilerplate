'use strict'

const path = require('path')
const webpack = require('webpack')
const DllPlugin = require('webpack/lib/DllPlugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const config = require('../config')

module.exports = {
  entry: {
    vendor: [
      'buffer',
      'crypto', 
      ...Object.keys(config.dependencies).map(dep => dep === 'vue' ? 'vue/dist/vue.esm.js' : dep)
    ],
    polyfill: [ 'es6-promise', 'babel-polyfill' ]
  },
  output: {
    path: config.source.dll,
    filename: '[name].dll.js',
    library: '[name]_dll'
  },
  plugins:[
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_debugger: true,
        drop_console: true
      },
      output: { comments: false }
    }),
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
    }),
    new DllPlugin({
      path: path.join(config.source.dll, '[name].manifest.json'),
      name:'[name]_dll',
      context: __dirname
    })
  ]
}
