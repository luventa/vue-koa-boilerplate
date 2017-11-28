// export default {
//   appenders: {
//     console: { type: 'console' }
//   },
//   categories: { 
//     default: {
//       level: process.env.LOG_LEVEL || 'debug',
//       appenders: [ 'console' ]
//     }
//   }
// }

export default {
  appenders: {
    cheeseLogs: { type: 'file', filename: 'cheese.log' },
    console: { type: 'console' }
  },
  categories: {
    cheese: { appenders: ['cheeseLogs'], level: 'error' },
    another: { appenders: ['console'], level: 'trace' },
    default: { appenders: ['console', 'cheeseLogs'], level: 'trace' }
  }
}
