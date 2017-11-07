require('shelljs/global')

const _ = require('lodash')
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

const copyModules = config => {
  const counter = { current: 0, total: 0, caret: 4 }

  const copyModule = deps => {
    for (let dep in deps) {
      let modulePath = path.resolve(config.paths.modules, dep)
      counter.current ++
      let percentage = Math.floor(counter.current / counter.total * 100)
      printProcess(`${percentage}% copying modules ${counter.current}/${counter.total} current ${dep}...`);
      cp('-R', modulePath, config.dists.modules)
      try {
        let manifest = require(`${modulePath}/package.json`)
        let childModules = _.get(manifest, 'dependencies')
        if (childModules) {
          counter.total += _.size(childModules)
          copyModule(childModules)
        }
      } catch (err) {
        console.log(err)
        console.log(chalk.red('No package.json found in', modulePath))
      }
    }
  }

  const printProcess = msg => {
    let backSpaces = ''
    while(counter.caret > msg.length) {
      counter.caret--
      backSpaces += '\b \b'
    }
    for(let i = 0; i < counter.caret; i++) {
      backSpaces += '\b'
    }
    counter.caret = msg.length
    if (backSpaces) process.stderr.write(backSpaces)
    process.stderr.write(msg)
  }

  printProcess('build manifest files for pm2...')
  fs.writeFileSync(path.resolve(config.dists.server, 'pm2.json'), JSON.stringify(config.pm2, null, 2))

  printProcess('copy package.json for server...')
  cp('-R', path.resolve(config.paths.server, 'package.json'), path.normalize(`${config.dists.server}/`))

  if (config.build.includeModules) {
    printProcess('start to copy server modules...')
    mkdir('-p', config.dists.modules)
    let manifest = require('../src/server/package.json')
    let serverModules = _.get(manifest, 'dependencies')
    if (serverModules) {
      counter.total += _.size(serverModules)
      copyModule(serverModules)
      cp('-R', path.resolve(config.paths.modules, '.bin'), config.dists.modules)
    }
  }
  printProcess('\n')
}

module.exports = copyModules
