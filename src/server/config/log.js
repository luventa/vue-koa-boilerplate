export default env => {
  if (env === 'development') {
    return {
      appenders: { console: { type: 'console' } },
      categories: { 
        default: {
          level: 'debug',
          appenders: [ 'console' ]
        }
      }
    }
  } else {
    return {
      appenders: [{
        type: 'clustered',
        level: env === 'testing' ? 'debug' : 'info',
        appenders: [{
          type: 'dateFile',
          filename: `../log/server.log`,
          pattern: '-yyyy-MM-dd',
          alwaysIncludePattern: false
        }, {
          type: 'logLevelFilter',
          level: 'error',
          appender: {
            type: 'file',
            filename: `../log/error.log`,
          }
        }]
      }]
    }
  }
} 
