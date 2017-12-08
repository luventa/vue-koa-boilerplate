import store from './util/MetaStore'
import ModuleLoader from './util/ModuleLoader'

import Controller from './decorator/Controller'
import Get from './decorator/Get'
import Post from './decorator/Post'
import KoaRouter from 'koa-router'
// import KoaBody from 'koa-body'

export const decorateApp = (app, config = {}) => {
  const router = new KoaRouter()
  const decorators = {
    controllers: ModuleLoader.loadModules(config.controllers)
  }

  store.controllers.filter(ctrl => {
    return decorators.controllers.filter(cls => ctrl.target === cls).length > 0
  }).forEach(ctrl => {
    const CtrlCls = ctrl.target
    const instance = new CtrlCls()
    store.actions.filter(action => action.target === ctrl.target).forEach(action => {
      router[action.type](ctrl.route + action.route, instance[action.method].bind(instance))
    })
  })

  app.use(router.routes(), router.allowedMethods())
}

export const decorators = {
  Controller,
  Get,
  Post
}
