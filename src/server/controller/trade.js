import BaseController from './base'
import { Controller, Post, Get } from '../util/deacon'

@Controller('/api/trade')
class TradeController extends BaseController {
  constructor () {
    super('trade')
  }

  @Post('/book')
  async bookTrade (ctx) {
    return ctx.success('Logged in!' + this.test(), { content: ctx.request.body })
  }

  @Get('/list')
  async getTradeList (ctx) {
    return ctx.success('Register in!', { content: ctx.request.body })
  }

  test () {
    this.logger.info('hahahaha, this is a test in trade.controller!')
  }
}

export default TradeController
