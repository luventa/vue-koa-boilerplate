
import Router from 'koa-router'

const router = new Router({ prefix: '/api/trade' })

router.post('/book', async ctx => {
  // logger.info('booking new trade')
  return await ctx.success('New trade booked!')
})
   
export default router
