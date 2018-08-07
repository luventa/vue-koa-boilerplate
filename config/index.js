const path = require('path')
const proxyTable = require('./proxy.conf')
const pm2Config = require('./pm2.conf')
const { dependencies } = require('../package.json')
const distRoot = path.resolve(`dist/${pm2Config.project}`)

module.exports = {
  project: pm2Config.project,
  dependencies: dependencies,
  isDev: process.env.NODE_ENV === 'development',
  isProd: process.env.NODE_ENV === 'production',
  build: {
    nodeServerEnabled: true,
    assetsSubDirectory: 'assets',
    assetsPublicPath: '/',
    includeModules: true,
    productionSourceMap: true,
    productionGzip: true,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    port: 2333,
    noInfo: true,
    assetsSubDirectory: 'assets',
    assetsPublicPath: '/',
    autoOpenBrowser: true,
    hotApiRegex: /[\/\\](route|util|middleware|controller)[\/\\]/,
    proxyTable: proxyTable,
    cssSourceMap: false
  },
  source: {
    root: path.resolve('src'),
    bin: path.resolve('src/bin'),
    client: path.resolve('src/client'),
    server: path.resolve('src/server'),
    static: path.resolve('src/static'),
    dll: path.resolve('src/dll')
  },
  output: {
    root: distRoot,
    bin: path.resolve(distRoot, 'bin'),
    client: path.resolve(distRoot, 'client'),
    server: path.resolve(distRoot, 'server'),
    static: path.resolve(distRoot, 'static'),
    dll: path.resolve(distRoot, 'dll')
  },
  env: {
    development: require('./dev.env'),
    testing: require('./test.env'),
    production: require('./prod.env')
  },
  pm2: {
    apps: [pm2Config]
  }
}
