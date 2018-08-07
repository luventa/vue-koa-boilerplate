'use strict'

const path = require('path')
const merge = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const config = require('../config')
const utils = require('./utils')
const dependencies =  require('../src/server/package.json').dependencies

const copyPatterns = Array.apply(null)

const generatePatterns = deps => {
  for (let dep in deps) {
    copyPatterns.push({
      from: `node_modules/${dep}/**`,
      to: config.output.server
    })
    
    try {
      collectModules(require(`../node_modules/${dep}/package.json`).dependencies)
    } catch (err) {
      // Do nothing
    }
  }
}

generatePatterns(dependencies)

module.exports = {
  name: 'server',
  devtool: false,
  entry: {
    main: path.resolve(config.source.server, 'index.js')
  },
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    chunkFilename:'[chunkhash].js',
    path: path.resolve(config.output.server)
  },
  externals: [
    ...Object.keys(dependencies)
  ],
  resolve: {
    extensions: ['.js', '.json']
  },
  target: 'node',
  node: {
    __filename: false,
    __dirname: false
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre',
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  plugins: [
    // copy static resources
    new CopyWebpackPlugin([
      {
        from: config.source.static,
        to: config.output.static,
        ignore: ['.*']
      },
      {
        from: path.resolve(config.source.server, 'package.json'),
        to: config.output.server
      },
      {
        from: 'node_modules/.bin/**',
        to: config.output.server
      },
      ...copyPatterns
    ])
  ]
}
