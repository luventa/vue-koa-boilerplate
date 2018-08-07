'use strict'

const path = require('path')
const chalk = require('chalk')
const config = require('../config')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.assetsPath = _path => {
  const assetsSubDirectory = config.isDev
    ? config.dev.assetsSubDirectory
    : config.build.assetsSubDirectory  
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = options => {
  options = options || {}
  // generate loader string to be used with extract text plugin
  const generateLoaders = loaders => {
    const sourceLoader = loaders.map(loader => {
      let extraParamChar
      if (/\?/.test(loader)) {
        loader = loader.replace(/\?/, '-loader?')
        extraParamChar = '&'
      } else {
        loader = loader + '-loader'
        extraParamChar = '?'
      }
      return loader + (options.sourceMap ? extraParamChar + 'sourceMap' : '')
    }).join('!')

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: sourceLoader,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader', sourceLoader].join('!')
    }
  }

  // http://vuejs.github.io/vue-loader/configurations/extract-css.html
  return {
    css: generateLoaders(['css']),
    postcss: generateLoaders(['css']),
    less: generateLoaders(['css', 'less']),
    sass: generateLoaders(['css', 'sass?indentedSyntax']),
    scss: generateLoaders(['css', 'sass']),
    stylus: generateLoaders(['css', 'stylus']),
    styl: generateLoaders(['css', 'stylus'])
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = options => {
  const output = []
  const loaders = exports.cssLoaders(options)
  for (const extension of Object.keys(loaders)) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      loader: loader
    })
  }
  return output
}

// Print process log
exports.procLog = (proc, data) => {
  let spliter = new Array((20 - proc.length) + 1).join('-')
  let log = chalk.yellow.bold(`${spliter} ${proc} Process ${spliter} \n\n`)

  if (typeof data === 'object') {
    data.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false,
      warnings: false,
      excludeAssets: /(node_modules|static)/
    }).split(/\r?\n/).forEach(line => {
      log += `  ${line}\n`
    })
  } else {
    log += `  ${data}\n`
  }

  log += chalk.yellow.bold(`\n${new Array(45).join('-')}\n`)

  console.log(log)
}

// Pack source code with webpack
exports.pack = config => {
  return new Promise((resolve, reject) => {
    webpack(config, (err, stats) => {
      if (err) {
        reject(err.stack || err)
      } else if (stats.hasErrors()) {
        reject(stats.toString({
          chunks: false,
          colors: true
        }).split(/\r?\n/).join('\n'))
      } else {
        resolve(stats)
      }
    })
  })
}
