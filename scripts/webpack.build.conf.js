const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.conf')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const config = require('./config')
const utils = require('./utils')
const env = process.argv.slice(2) == '--debug' ? config.env.test : config.env.prod
const nodeModules = {}
fs.readdirSync('node_modules').filter((x) => {
  return ['.bin'].indexOf(x) === -1
}).forEach((mod) => {
  nodeModules[mod] = 'commonjs ' + mod
})

const clientWebpackConfig = merge(baseWebpackConfig, {
  name: 'client',
  entry: {
    vendor: [
      'es6-promise',
      'babel-polyfill'
    ]
  },
  module: {
    loaders: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  output: {
    path: config.dists.client,
    publicPath: config.dists.publicPath,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      'screw-ie8': true,
      sourceMap: true,
      compress: {
        warnings: false
      },
      output: {
        comments: false
      }
    }),
    // extract css into its own file
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
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    })
  ]
})

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  clientWebpackConfig.plugins.push(
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

const serverWebpackConfig = {
  name: 'server',
  devtool: 'cheap-source-map',
  entry: [ './src/server/index.js' ],
  output: {
    path: config.dists.server,
    filename: '[name].js',
    publicPath: '/build/'
  },
  target: 'node',
  node: {
    __dirname: true,
    __filename: true
  },
  externals: nodeModules,
  module: {
    loaders: [
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
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    })
  ]
}

module.exports = [ clientWebpackConfig, serverWebpackConfig ]
