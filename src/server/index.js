import Koa from 'koa'
import { ports } from './config/identity'
import register from './register'
import log4js from 'log4js'

const app = new Koa()
// register middlewares
app.env = process.env.NODE_ENV
register(app)
const logger = log4js.getLogger('server')
app.listen(ports[app.env])
logger.info('Server is starting on port', ports[app.env])

export default app
