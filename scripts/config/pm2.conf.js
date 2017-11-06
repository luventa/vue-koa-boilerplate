module.exports = {
  // define your project name here. for package and deployment
  name: 'MyProject',
  script: './index.js',
  cwd: './server',
  instances: '2',
  exec_mode: 'cluster',
  max_memory_restart: '1G',
  'autorestart': true,
  'out_file': '../log/server.log',
  'error_file': '../log/error.log',
  'merge_logs': true,
  'env_testing': {
    'PORT': 2334,
    'NODE_ENV': 'testing'
  },
  'env_production': {
    'PORT': 2334,
    'NODE_ENV': 'production'
  }
}