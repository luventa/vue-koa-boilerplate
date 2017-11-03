import Koa from 'koa'
import register from './register'

// register middlewares
const { app, logger } = register(new Koa())
const port = process.env.PORT || 2333

app.listen(port)

logger.info(`Server ${process.pid} is listening on ${port}`)

export default app
