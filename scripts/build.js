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

// Clean dist
del.sync(['dist/*', '!.gitkeep'])

// Setup tasks and spinners
const results = Array.apply(null)
const tasks = !process.env.TASK
            ? (!config.build.nodeServerEnabled ? ['client'] : ['client', 'server'])
            : [ process.env.TASK ] 
const spinners = new Multispinner(tasks, {
  preText: 'packing',
  postText: 'process'
})

spinners.on('success', () => {
  process.stdout.write('\x1B[2J\x1B[0f\n\n')
  results.forEach(result => utils.procLog(result.proc, result.stats))
  console.log(`> Webpack packing process completed`)
  console.log(`> Start to build application`)
  if (process.env.MODE !== 'analyze') {
    process.exit()
  }
})

// Compile client code
if (tasks.indexOf('client') > -1) {
  utils.pack(clientConfig).then(stats => {
    results.push({ proc: 'Client', stats })
    spinners.success('client')
  }).catch(err => {
    spinners.error('client')
    console.log(`\n  Error: failed to pack client code`)
    console.error(`\n${err}\n`)
    process.exit(1)
  })
}

// Compile server code
if (tasks.indexOf('server') > -1) {
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
