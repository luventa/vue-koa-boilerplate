const path = require('path')
const proxyTable = require('./proxy.conf')
const projectName = 'myproject'
const srcPath = path.resolve('src')
const distPath = path.resolve(__dirname, `dist/${projectName}`)

module.exports = {
  build: {
    index: path.resolve(distPath, `index.html`),
    productionSourceMap: true,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    port: 2333,
    autoOpenBrowser: true,
    registerApi: true,
    hotApiRegex: /[\/\\](routes|utils|middlewares)[\/\\]/,
    proxyTable: proxyTable,
    cssSourceMap: false
  },
  paths: {
    public: '/',
    output: distPath,
    server: path.resolve(srcPath, 'server'),
    static: path.resolve(srcPath, 'static')
  },
  staticAssets: {
    prefix: '/static',
    directory: path.resolve(__dirname, 'src/static')
  },
  assets: {
    subDirectory: 'assets',
    dist: path.resolve(__dirname, '../../dist/client')
  },
  client: {
    distPath: path.resolve(__dirname, '../../dist/client'),
    staticDist: path.resolve(__dirname, '../../dist/client/static'),
    publicPath: '/'
  },
  server: {
    directory: path.resolve(__dirname, '../../server'),
    distPath: path.resolve(__dirname, '../../dist/server'),
    dest: path.resolve(__dirname, '../../dist')
  },
  env: {
    development: require('./dev.env'),
    testing: require('./test.env'),
    production: require('./prod.env')
  }
}
