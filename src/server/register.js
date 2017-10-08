import path from 'path'
import koaStatic from 'koa-static'
import koaViews from 'koa-views'
import koaSession from 'koa-session'
import log4js from 'log4js'
import sessionconf from './config/session'
import { enrichResponse, enrichSession } from './middlewares/enrichment'
import router from './routes'
import logconf from './config/log'
// import koaCors from 'koa2-cors'

log4js.configure(logconf(process.env.NODE_ENV))
const webroot = path.join(__dirname, '../../client')
const staticroot = path.join(__dirname, '../static')
const logger = log4js.getLogger('register')

export default app => {
  logger.debug('Registering middlewares for app...')

  app.keys = ['this is a secret key hehe']
  app.use(koaSession(sessionconf, app))
  // app.use(koaCors({ credentials: true }))

  if (app.env === 'development') {
    logger.info('Setting packed resources directory', webroot, 'for env', process.env.NODE_ENV)
    app.use(koaStatic(webroot))
    app.use(koaViews(webroot, { extentions: 'html' }))
  }
  
  app.use(enrichResponse)
  app.use(enrichSession)

  app.use(async (ctx, next) => {
    try {
      await next()
    } catch (e) {
      logger.error('Uncaught exception:', e)
      ctx.status = 400
      ctx.body = '你特么发了个什么鬼东西给服务器'
    }
  })

  app.use(router)

  // routers.forEach(router => {
  //   app.use(router.routes(), router.allowedMethods())
  // })

  app.use(async ctx => {
    if (!ctx.headerSent && app.env !== 'development') {
      await ctx.render('index.html')
    }
  })

  logger.debug('Middlewares registering completed')
}
