import authconf from './config/auth'
import { getLogger } from 'log4js'

const logger = getLogger('middlewares')

/* Common response code
** Will be set to response as rtnCode */
const resCode = { success: 1, fail: -1 }

const commonRes = (ctx, status) => {
  return async (msg, obj = {}) => {
    const rtn = { rtnCode: status }

    if (msg instanceof Object) {
      obj = msg
      msg = undefined
    }
    
    (status < 0) ? (rtn.errMsg = msg || '请求失败') : (rtn.rtnMsg = msg || '请求成功')

    Object.assign(rtn, obj)

    logger.debug(`Response data for request ${ctx.path}:`, JSON.stringify(rtn))

    return ctx.body = rtn
  }
}

export const enrichResponse = async (ctx, next) => {
  if (ctx.headers['x-request-token'] === authconf['request-token'] && ctx.method === 'POST') {
    !ctx.success && (ctx.success = commonRes(ctx, resCode.success))
    !ctx.error && (ctx.error = commonRes(ctx, resCode.fail))
  }
  
  await next()
}

export const enrichSession = async (ctx, next) => {
  if (process.env.NODE_ENV === 'development' && !ctx.session.user) {
    if (ctx.cookies.get('dev-user')) {
      ctx.session.user = JSON.parse(ctx.cookies.get('dev-user'))
    } else if (ctx.headers['x-dev-token'] === authconf['dev-token']) {
      ctx.session.user = { id: 'dev-user' }
    }
  }

  if (ctx.session.user) {
    ctx.state.user = ctx.session.user
  }

  await next()
}
