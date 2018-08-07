'use strict'

const path = require('path')
const webpack = require('webpack')
const DllPlugin = require('webpack/lib/DllPlugin')
const config = require('../config')

module.exports = {
  entry: {
    vendor: Object.keys(config.dependencies).filter(dep => dep != 'vue'),//.map(dep => dep === 'vue' ? 'vue/dist/vue.esm.js' : dep),
    polyfill: [ 'es6-promise', 'babel-polyfill' ]
  },
  output: {
    path: config.source.dll,
    filename: '[name].dll.js',
    library: '[name]_dll'
  },
  plugins:[
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    }),
    new DllPlugin({
      path: path.join(config.source.dll, '[name].manifest.json'),
      name:'[name]_dll',
      context: __dirname
    })
  ]
}
