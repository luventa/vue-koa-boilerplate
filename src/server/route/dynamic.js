export default async (ctx, next) => {
  if (ctx.path.match(/^\/api\/user\//)) {
    return require('./user').default.routes()(ctx, next)
  }

  if (ctx.path.match(/^\/api\/trade\//)) {
    return require('./trade').default.routes()(ctx, next)
  }
}
