import identity from '../config/identity'

const resCode = {
  success: 0,
  fail: -1
}

const commonRes = (ctx, status) => {
  return async (msg, obj = {}) => {
    if (msg instanceof Object) {
      obj = msg
      msg = undefined
    }

    let rtn = { rtnCode: status }
    if (status < 0) {
      rtn.errMsg = msg || '请求失败'
    } else {
      rtn.rtnMsg = msg || '请求成功'
    }

    return ctx.body = Object.assign(rtn, obj)
  }
}

export const enrichResponse = async (ctx, next) => {
  if (ctx.headers['x-requested-by'] === identity.sentBy && ctx.method === 'POST') {
    !ctx.success && (ctx.success = commonRes(ctx, resCode.success))
    !ctx.error && (ctx.error = commonRes(ctx, resCode.fail))
  }
  
  await next()
}

export const enrichSession = async (ctx, next) => {
  if (process.env.NODE_ENV === 'development' && !ctx.session.user) {
    if (ctx.cookies.get('dev-user')) {
      ctx.session.user = JSON.parse(ctx.cookies.get('dev-user'))
    } else if (ctx.headers['x-post-by'] === identity.postBy) {
      ctx.session.user = { id: 'postman' }
    }
  }

  if (ctx.session.user) {
    ctx.state.user = ctx.session.user
  }

  await next()
}
