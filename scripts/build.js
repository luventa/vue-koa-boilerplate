// https://github.com/shelljs/shelljs
'use strict'

require('./check-versions')()
require('shelljs/global')

env.isBuild = true

const ora = require('ora')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('./config')
const webpackConfig = require('./webpack.build.conf')

const spinner = ora('building for production...')
spinner.start()

// copy static assets
rm('-rf', config.client.distPath)
mkdir('-p', config.client.distPath)
cp('-R', config.staticAssets.directory, config.client.staticDist)
cp('-R', 'robots.txt', config.client.distPath)

// pack server to dist
if (process.argv.slice(2) == '--package') {
  rm('-rf', config.server.distPath)
  mkdir('-p', config.server.distPath)
  cp('-R', config.server.directory, config.server.dest)
}

const compiler = webpack(webpackConfig)
const ProgressPlugin = require('webpack/lib/ProgressPlugin')
compiler.apply(new ProgressPlugin())

compiler.run((err, stats) => {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n')

  console.log(chalk.cyan('  Build complete.\n'))
  console.log(chalk.yellow(
    '  Tip: built files are meant to be served over an HTTP server.\n' +
    '  Opening index.html over file:// won\'t work.\n'
  ))
})
