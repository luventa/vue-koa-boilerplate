export default async (ctx, next) => {
  if (ctx.path.match(/^\/api\/user\//)) {
    return await require('./user').default.routes()(ctx, next)
  }

  if (ctx.path.match(/^\/api\/trade\//)) {
    return await require('./trade').default.routes()(ctx, next)
  }
}

