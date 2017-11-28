import store from '../util/MetaStore'

/**
* Marking a function as a Post action for router.
* [route]: route path for this action
* [params]: inject fields from ctx.request.body as args
**/
export default (route, params) => {

  return (obj, key) => {
    store.actions.push({
      type: 'post',
      target: obj.constructor,
      method: key,
      route: route,
      params: params
    })
  }
}
