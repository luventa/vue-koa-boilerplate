import { koaRouter, getLogger } from '../utils'
import decipher from '../middlewares/decipher'
import _ from 'lodash'

const logger = getLogger('demo')
const router = koaRouter({ prefix: '/api/demo' })

router.post('/test', async ctx => {
  return await ctx.success('FUCK YOU, WORLD!!')
})

router.post('/encTest', decipher, async ctx => {
  return await ctx.success('Gotcha!', { content: ctx.request.body })
})
   
export default router
