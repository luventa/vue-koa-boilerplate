require('./check-versions')()
require('babel-polyfill')
require('babel-core/register')({
  presets: [ 'env', 'stage-0' ]
})

const Koa = require('koa')
const koaMount = require('koa-mount')
const koaStatic = require('koa-static')
const c2k = require('koa2-connect')
const path = require('path')
const webpack = require('webpack')
const opn = require('opn')
const config = require('./config')
const KWM = require('koa-webpack-middleware')
const proxyMiddleware = require('http-proxy-middleware')
const chafMiddleware = require('connect-history-api-fallback')
const webpackConfig = require('./webpack.dev.conf')
const registerApi = require('../src/server/register').default

process.env.isBuild = false

// default port where dev server listens for incoming traffic
const port = process.env.PORT || config.dev.port
const autoOpenBrowser = Boolean(config.dev.autoOpenBrowser)
const proxyTable = config.dev.proxyTable

// init koa server
const app = new Koa()
const compiler = webpack(webpackConfig)

const devMiddleware = KWM.devMiddleware(compiler, {
  noInfo: false,
  watchOptions: {
    aggregateTimeout: 300,
    poll: false
  },
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
})

const hotMiddleware = KWM.hotMiddleware(compiler)
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', compilation => {
  compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

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

// serve pure static assets
app.use(koaMount('/static', koaStatic(config.paths.static)))

// register server api
registerApi(app)

const uri = 'http://localhost:' + port

devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
})

module.exports = app.listen(port, err => {
  if (err) {
    console.log(err)
    return
  }

  // when env is testing, don't need open it
  if (autoOpenBrowser) {
    opn(uri)
  }
})