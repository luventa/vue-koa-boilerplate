import { koaRouter, log4js } from '../utils'
import _ from 'lodash'

const logger = log4js.getLogger('demo')
const router = koaRouter({ prefix: '/api/demo' })

router.post('/test', async ctx => {
  logger.info('here')
  return await ctx.success('FUCK YOU, WORLD!')
})
   
export default router
