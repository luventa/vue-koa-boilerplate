const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const archiver = require('archiver')
const config = require('../config')
const moment = require('moment')

try {
  fs.statSync(path.join(__dirname, '../dist'))
} catch (e) {
  console.log(e)
  console.log(chalk.red('\n  Please execute `npm run build (or build:debug)` first!'))
  process.exit(0)
}

// create write stream for archive
const output = fs.createWriteStream(path.resolve(config.build.name + '_' + moment().format('Y-M-d') + '.zip'))
const archive = archiver('zip', {
  zlib: { level: 9 }
})

// listen for all archive data to be written
output.on('close', () => {
  console.log(archive.pointer() + ' total bytes')
  console.log('archiver has been finalized and the output file descriptor has closed.')
})

// good practice to catch warnings
archive.on('warning', err => {
  if (err.code === 'ENOENT') {
    console.log(chalk.red(err))
  } else {
    throw err
  }
})

// good practive to catch this error  explicitly
archive.on('error', err => {
  throw err
})

archive.pipe(output)

archive.directory(config.paths.output, config.build.name).finalize()
