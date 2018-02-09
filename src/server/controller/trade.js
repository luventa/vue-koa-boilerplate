import BaseController from './base'
import { Controller, Post, Get } from '../util/deacon'

@Controller('/api/trade')
class TradeController extends BaseController {
  constructor () {
    super('trade')
  }

  @Post('/book')
  async bookTrade (ctx) {
    return await ctx.success('Logged in!' + this.test(), { content: ctx.request.body })
  }

  @Get('/list')
  async getTradeList (ctx) {
    return await ctx.success('Register in!', { content: ctx.request.body })
  }
}

export default TradeController
