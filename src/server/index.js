// require('babel-polyfill')
// require('babel-core/register')()

// if (!process.env.NODE_ENV) {
//   console.error('Do not directly start server with cmd line!')
//   process.exit(-1)
// }

// require('./app')

import Koa from 'koa'
import register from './register'

// register middlewares
const { app, logger } = register(new Koa())
const port = process.env.PORT || 2333

app.listen(port)

logger.info(`Server [${process.pid}] is listening on ${port}`)

export default app
