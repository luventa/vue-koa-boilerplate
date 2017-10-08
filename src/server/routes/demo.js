import { koaRouter, log4js } from '../utils'

const logger = log4js.getLogger('demo')
const router = koaRouter({ prefix: '/api/demo' })

router.post('/test', async ctx => {
  logger.info('here')
  return await ctx.success('FUCK YOU, WORLD!')
})

export default router
