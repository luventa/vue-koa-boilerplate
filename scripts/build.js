'use strict'

const fs = require('fs')
const del = require('del')
const path = require('path')
const { spawn } = require('child_process')
const Multispinner = require('multispinner')
const config = require('../config')
const clientConfig = require('./webpack.build.conf')
const serverConfig = require('./webpack.server.conf')
const utils = require('./utils')

// Check if dll exists
try {
  fs.statSync(path.join(__dirname, '../src/dll'))
} catch (e) {
  console.log(e)
  console.log('\n  Please execute `npm run dll` first!')
  process.exit(0)
}

const results = Array.apply(null)
const tasks = config.build.nodeServerEnabled ? ['client', 'server'] : ['client']
const spinners = new Multispinner(tasks, {
  preText: 'packing',
  postText: 'process'
})

del.sync(['dist/*', 'build/*', '!.gitkeep'])

spinners.on('success', () => {
  process.stdout.write('\x1B[2J\x1B[0f\n\n')
  results.forEach(result => utils.procLog(result.proc, result.stats))
  console.log(`> Webpack packing process completed`)
  console.log(`> Start to build application`)
  process.exit()
})

utils.pack(clientConfig).then(stats => {
  results.push({ proc: 'Client', stats })
  spinners.success('client')
}).catch(err => {
  spinners.error('client')
  console.log(`\n  Error: failed to pack client code`)
  console.error(`\n${err}\n`)
  process.exit(1)
})

if (config.build.nodeServerEnabled) {
  utils.pack(serverConfig).then(stats => {
    results.push({ proc: 'Server', stats })
    // setup pm2.json file for server.
    fs.writeFileSync(path.resolve(config.output.server, 'pm2.json'), JSON.stringify(config.pm2, null, 2))
    spinners.success('server')
  }).catch(err => {
    spinners.error('server')
    console.log(`\n  Error: failed to pack server code`)
    console.error(`\n${err}\n`)
    process.exit(1)
  })
}
