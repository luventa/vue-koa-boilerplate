import path from 'path'
import koaStatic from 'koa-static'
import koaMount from 'koa-mount'
import koaViews from 'koa-views'
import koaSession from 'koa-session'
import { configure, getLogger } from 'log4js'
import logconf from './config/log'
import sessionconf from './config/session'
import { enrichResponse, enrichSession } from './middlewares/enrichment'
import router from './routes'
// import koaCors from 'koa2-cors'

const webroot = path.join(__dirname, '../../client')
const staticroot = path.join(__dirname, '../static')

// configure log4js
configure(logconf)
const logger = getLogger('server')

export default app => {
  logger.debug('Registering middlewares for app...')

  app.keys = ['this is a secret key hehe']
  app.use(koaSession(sessionconf, app))
  // app.use(koaCors({ credentials: true }))

  // serve pure static assets
  app.use(koaMount('/static', koaStatic(staticroot)))

  if (app.env !== 'development') {
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

  app.use(async ctx => {
    if (!ctx.headerSent && app.env !== 'development') {
      await ctx.render('index.html')
    }
  })

  logger.debug('Middlewares registering completed\n')

  return { app, logger }
}
