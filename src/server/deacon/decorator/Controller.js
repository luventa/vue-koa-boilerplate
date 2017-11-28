import store from '../util/MetaStore'

/**
* Marking a class as a controller.
* Will inject logger and helpers to its instances
* param opts.baseRoute: Prefix of koa router
* param opts.logger: A logger provider which will be injected
* param opts.helpers: A logger provider which will be injected
**/
export default (baseRoute, useBody) => {
  return cls => {
    store.controllers.push({
      target: cls,
      route: baseRoute,
      body: !!useBody
    })
  }
}
