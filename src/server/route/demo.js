import { koaRouter, getLogger } from '../util'
import decipher from '../middleware/decipher'
// import _ from 'lodash'

const logger = getLogger('demo')
const router = koaRouter({ prefix: '/api/demo' })

router.post('/test', async ctx => {
  logger.info('in test api')
  return await ctx.success('FUCK YOU, WORLD!!')
})

router.post('/encTest', decipher, async ctx => {
  logger.info('in encTest api')
  return await ctx.success('Gotcha!', { content: ctx.request.body })
})
   
export default router
