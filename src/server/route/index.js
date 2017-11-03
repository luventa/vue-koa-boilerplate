import { pullAt, split } from 'lodash'
import demoRouter from './demo'

export const dynamicRoute = async (ctx, next) => {
  if (ctx.path.match(/^\/api/)) {
    let filename = './' + pullAt(split(ctx.path, '/', 3), 2)
    return await require(filename).default.routes()(ctx, next)
  }
}

export const initRoutes = app => {
  app.use(demoRouter.routes(), demoRouter.allowedMethods())
}

