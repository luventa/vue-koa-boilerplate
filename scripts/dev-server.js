'use strict'

require('./check-versions')()
const Koa = require('koa')
const c2k = require('koa2-connect')
const chalk = require('chalk')
const path = require('path')
const webpack = require('webpack')
const opn = require('opn')
const config = require('../config')
const KWM = require('koa-webpack-middleware')
const proxyMiddleware = require('http-proxy-middleware')
const chafMiddleware = require('connect-history-api-fallback')
const webpackConfig = require('./webpack.dev.conf')

// set process env
process.env.isBuild = false

// default port where dev server listens for incoming traffic
const port = process.env.PORT || config.dev.port
const proxyTable = config.dev.proxyTable

// init koa server
const app = new Koa()
const compiler = webpack(webpackConfig)

const devMiddleware = KWM.devMiddleware(compiler, {
  noInfo: config.dev.noInfo,
  watchOptions: {
    aggregateTimeout: 300,
    poll: false
  },
  publicPath: config.dev.assetsPublicPath,
  stats: {
    colors: true,
    chunks: false
  }
})

// only client need hot middleware
const hotMiddleware = KWM.hotMiddleware(compiler)

// proxy api requests
Object.keys(proxyTable).forEach(context => {
  let options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(c2k(proxyMiddleware(options.filter || context, options)))
})

app.env = 'development'
app.use(c2k(chafMiddleware()))
app.use(devMiddleware)
app.use(hotMiddleware)

// register server api
if (!config.build.nodeServerEnabled) {
  const koaStatic = require('koa-static')
  const koaMount = require('koa-mount')

  app.use(koaMount('/dll', koaStatic(config.source.dll)))
  app.use(koaMount('/static', koaStatic(config.source.static)))

} else {
  require('babel-polyfill')
  require('babel-core/register')({
    presets: [
      ['env', {
        targets: { node: 'current' }
      }]
    ]
  })

  console.log(chalk.yellow('> Registering server Api... \n'))
  const registerApi = require('../src/server/register').default
  const watcher = require('chokidar').watch(config.source.server)

  registerApi(app)

  watcher.on('ready', () => {
    watcher.on('all', (err, file) => {      
      if (!config.dev.hotApiRegex.test(file)) {
        console.log(chalk.red('> Rebooting server... \n [Not implemented yet]'))
        // TBD
      } else {
        console.log(chalk.yellow('> Reloading hot modules of server... \n'))
        Object.keys(require.cache).forEach(id => {
          if (config.dev.hotApiRegex.test(id)) delete require.cache[id]
        })
        console.log(chalk.green('> Hot modules of server are reloaded... \n'))
      }
    })
  })
}

// start dev server
const uri = 'http://localhost:' + port

devMiddleware.waitUntilValid(() => {
  console.log(chalk.green(`> Listening at ${uri} \n`))
})

module.exports = app.listen(port, err => {
  if (err) {
    console.log(chalk.red(err))
    return
  }

  // automatically open default browser
  if (config.dev.autoOpenBrowser) {
    opn(uri)
  }
})
