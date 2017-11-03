import { pullAt, split } from 'lodash'

export default async (ctx, next) => {
  if (ctx.path.match(/^\/api/)) {
    let filename = './' + pullAt(split(ctx.path, '/', 3), 2)
    return await require(filename).default.routes()(ctx, next)
  }
}
