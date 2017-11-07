// https://github.com/shelljs/shelljs
'use strict'

require('./check-versions')()
require('shelljs/global')

env.isBuild = true

const fs = require('fs')
const ora = require('ora')
const path = require('path')
const chalk = require('chalk')
const ProgressBar = require('progress')
const webpack = require('webpack')
const config = require('./config')
const webpackConfig = require('./webpack.build.conf')
const serverDeps =  Object.keys(require('../src/server/package.json').dependencies)

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
  packServerFiles()
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

const packServerFiles = () => {
  let pm2File = path.resolve(config.dists.server, 'pms2.json')
  let pkgFile = path.resolve(config.paths.server, 'package.json')
  fs.writeFileSync(pm2File, JSON.stringify(config.pm2, null, 2))
  cp('-R', pkgFile, path.normalize(`${config.dists.server}/`))
  if (config.build.includeModules) {
    console.log(chalk.cyan('copying modules for server.'))
    mkdir('-p', config.dists.modules)
    copyModule(serverDeps)
    cp('-R', path.resolve(config.paths.modules, '.bin'), config.dists.modules)
    console.log(chalk.cyan('server modules ready\n'))
  }
}

const copyModule = deps => {
  // if (deps === null) return
  for (let i = 0, l = deps.length; i < l; i++) {
    let modulePath = path.resolve(config.paths.modules, deps[i])
    cp('-R', modulePath, config.dists.modules)
    try {
      let childDeps = require(`${modulePath}/package.json`).dependencies
      if (childDeps) {
        copyModule(Object.keys(childDeps))
      }
    } catch (err) {
      console.log(chalk.red('No package.json found in', modulePath))
    }
  }
}
