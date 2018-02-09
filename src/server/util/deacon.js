import Router from 'koa-router'
import koaBody from 'koa-body'
import _ from 'lodash'

/**
* Marking a class as a controller.
* Will inject logger and helpers to its instances
* param baseRoute: Prefix of koa router
**/
export const Controller = baseRoute => {
  return clz => {
    clz._deacon_ = _.merge(clz._deacon_, {
      prefix: baseRoute
    })
  }
}

/**
* Marking a function as a Post action for router.
* [route]: route path for this action
* [params]: inject fields from ctx.request.body as args
**/
export const Post = opts => {
  return (target, key, descriptor) => {
    if (typeof descriptor.value !== 'function') {
      throw new SyntaxError('@Post can only mark methods of controller, not:' + descriptor.value)
    }

    mergeRouteDefinition(target, opts, descriptor.value, 'post')
  }
}

/**
* Marking a function as a Get action for router.
* [route]: route path for this action
* [params]: inject fields from ctx.request.body as args
**/
export const Get = opts => {
  return (target, key, descriptor) => {
    if (typeof descriptor.value !== 'function') {
      throw new SyntaxError('@Get can only mark methods of controller, not:' + descriptor.value)
    }

    mergeRouteDefinition(target, opts, descriptor.value, 'get')
  }
}

const mergeRouteDefinition = (target, opts, handler, verb) => {
  if (_.isString(opts)) {
    opts = { route: opts }
  } else if (!_.isPlainObject(opts)) {
    throw new SyntaxError('Router handler must be defined in @Controller' + handler)
  }
  // TODO validate target, before and after.
  let clz = target.constructor
  let routes = _.get(clz, '_deacon_.routes', [])
  routes.push({
    verb: verb,
    path: opts.route,
    useBody: _.defaultTo(opts.useBody, true),
    before: opts.before,
    handler: handler,
    after: opts.after
  })
  clz._deacon_ = _.merge(clz._deacon_, {
    routes: routes
  })
}

export const createRoute = opts => {
  // TODO validate opts
  let RouteController = opts.controller
  let _deacon_ = _.get(RouteController, '_deacon_')
  let instance = new RouteController()
  let router = new Router({ prefix: _deacon_.prefix })

  _deacon_.routes.forEach(route => {
    let handlers = []
    route.before && handlers.push(...route.before)
    route.useBody && handlers.push(koaBody(route.bodyOpts))
    handlers.push(route.handler.bind(instance))
    route.after && handlers.push(...route.after)
    router[route.verb](route.path, ...handlers)
  })

  return router
}
