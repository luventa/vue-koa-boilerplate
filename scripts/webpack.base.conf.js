const path = require('path')
const webpack = require('webpack')
const config = require('../config')
const utils = require('./utils')
const externals = _externals()

function _externals() {
  let dependencies =  require('../src/server/package.json').dependencies
  let externals = {}
  for (let dep in dependencies) {
    externals[dep] = 'commonjs ' + dep
  }
  return externals
}

const clientWebpackConfig = {
  name: 'client',
  entry: {
    app: ['./src/client/index.js'],
    vendor: [ 'vue', 'vue-router', 'vuex', 'vuex-router-sync' ]
  },
  // disable devtool for production env
  // '#source-map' is an alternative option for '#eval-source-map'
  devtool: process.env.NODE_ENV === 'production' ? false : '#eval-source-map',
  plugins: [
    // http://vuejs.github.io/vue-loader/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': config.env[process.env.NODE_ENV]
    }),
    // minimize moment
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/,/en|zh/)
  ],
  resolve: {
    extensions: ['.js', '.vue', '.css', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve('src/client'),
      '@store': path.resolve('src/client/store'),
      '@comp': path.resolve('src/client/components'),
      '@view': path.resolve('src/client/views')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        include: config.paths.client,
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
        include: config.paths.client,
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

const serverWebpackConfig = {
  name: 'server',
  devtool: false,
  entry: [ './src/server/index.js' ],
  output: {
    path: config.paths.output,
    filename: '[name].js'
  },
  target: 'node',
  node: {
    __filename: false,
    __dirname: false
  },
  externals: externals,
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        include: config.paths.server,
        exclude: /node_modules/,
        enforce: 'pre',
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: config.paths.server,
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json']
  }
}

module.exports = {
  client: clientWebpackConfig,
  server: serverWebpackConfig
}
