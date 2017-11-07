import Router from 'koa-router'
import koaBody from 'koa-body'

export default opts => {
  const Controller = opts.controller
  const instance = new Controller()
  const router = new Router({ prefix: Controller._prefix })

  if (opts.useBody) {
    router.use(koaBody(opts.bodyOpts))
  }

  for (let key in instance) {
    let route = instance[key]
    let config = route.config
    router[config.method](config.path, ...route.middlewares, route.handler)
  }

  return router
}
