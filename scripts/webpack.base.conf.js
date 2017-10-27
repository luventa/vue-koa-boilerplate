const _ = require('lodash')
const path = require('path')
const webpack = require('webpack')
const config = require('./config')
const utils = require('./utils')

const env = config.env[process.env.NODE_ENV]
const srcRoots = process.env.isBuild
  ? config.paths.client
  : [ config.paths.client, config.paths.server ]

module.exports = {
  entry: {
    app: ['./src/client/index.js'],
    vendor: [
      'vue',
      'vue-router',
      'vuex',
      'vuex-router-sync'
    ]
  },
  output: {
    path: config.paths.output,
    publicPath: config.paths.public,
    filename: '[name].js'
    // chunkFilename: '[id].chunk.js'
  },
  // disable devtool for production env
  // '#source-map' is an alternative option for '#eval-source-map'
  devtool: process.env.NODE_ENV === 'production' ? false : '#eval-source-map',
  plugins: [
    // http://vuejs.github.io/vue-loader/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env.runtime,
      'extconf': env.external
    })
  ],
  resolve: {
    extensions: ['.js', '.vue', '.css', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve('src/client'),
      '@store': path.resolve('src/client/store'),
      '@comp': path.resolve('src/client/components')
    }
  },
  module: {
    loaders: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        include: srcRoots,
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
        include: srcRoots,
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
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  performance: {
    hints: false
  }
}
