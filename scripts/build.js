// https://github.com/shelljs/shelljs
'use strict'

require('./check-versions')()
require('shelljs/global')

env.isBuild = true

const ora = require('ora')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const copyModules = require('./copy-modules')
const webpackConfig = require('./webpack.build.conf')

const spinner = ora('building for production...')
spinner.start()

// copy static assets
mkdir('-p', config.paths.output)
cp('-R', config.paths.static, config.paths.output)
cp('-R', config.paths.bin, config.paths.output)

const compiler = webpack(webpackConfig)
const ProgressPlugin = require('webpack/lib/ProgressPlugin')
compiler.apply(new ProgressPlugin())

compiler.run((err, stats) => {
  copyModules(config)
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n')

  console.log(chalk.cyan(`  Build complete. Project: ${config.build.name}\n`))
  console.log(chalk.yellow(
    '  Tip: execute `npm run package` to get \n' + 
    '       a compressed file for deployment.\n' +
    '  Tip: built files under [client] are\n' + 
    '       meant to be served over an HTTP server.\n' +
    '       Opening index.html over file:// won\'t work.\n'
  ))
})

