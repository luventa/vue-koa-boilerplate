'use strict'

const path = require('path')
const config = require('../config')
const utils = require('./utils')
const webpack = require('webpack')
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin')

module.exports = {
  name: 'client',
  // disable devtool for production env
  // '#source-map' is an alternative option for '#eval-source-map'
  devtool: config.isProd ? false : '#eval-source-map',
  entry: {
    app: [ './src/client/index.js' ]
  },
  externals: Object.keys(config.dependencies),
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': config.source.client,
      '@store': path.resolve(config.source.client, 'store'),
      '@comp': path.resolve(config.source.client, 'components'),
      '@view': path.resolve(config.source.client, 'views')
    },
    extensions: [ '.js', '.vue', '.json', '.css' ],
    modules: [ path.resolve('node_modules') ]
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre',
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: require('./vue-loader.conf')
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.env[process.env.NODE_ENV]
    }),
    new DllReferencePlugin({
      context: __dirname,
      manifest:require('../src/dll/vendor.manifest.json')
    }),
    new DllReferencePlugin({
      context: __dirname,
      manifest:require('../src/dll/polyfill.manifest.json')
    }),
    // minimize moment locales
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/,/en|zh/)
  ],
  performance: {
    hints: false
  }
}
