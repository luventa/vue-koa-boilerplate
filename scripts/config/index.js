const path = require('path')
const proxyTable = require('./proxy.conf')
const projectName = 'myproject'
const srcPath = path.resolve('src')
const distPath = path.resolve(`dist/${projectName}`)

module.exports = {
  build: {
    index: path.resolve(distPath, 'index.html'),
    productionSourceMap: true,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    port: 2333,
    noInfo: true,
    autoOpenBrowser: false,
    registerApi: true,
    hotApiRegex: /[\/\\](route|util|middleware)[\/\\]/,
    proxyTable: proxyTable,
    cssSourceMap: false
  },
  paths: {
    public: '/',
    output: distPath,
    assetSub: 'assets',
    client: path.resolve(srcPath, 'client'),
    server: path.resolve(srcPath, 'server'),
    static: path.resolve(srcPath, 'static')
  },
  dists: {
    publicPath: '/',
    client: path.resolve(distPath, 'client'),
    server: path.resolve(distPath, 'server'),
  },
  env: {
    development: require('./dev.env'),
    testing: require('./test.env'),
    production: require('./prod.env')
  }
}
