export default {
  appenders: {
    console: { type: 'console' }
  },
  categories: { 
    default: {
      level: process.env.LOG_LEVEL || 'debug',
      appenders: [ 'console' ]
    }
  }
}
  