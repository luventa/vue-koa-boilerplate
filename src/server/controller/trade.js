import { decorators } from '../deacon'

const { Controller, Post, Get } = decorators

@Controller('/api/trade', true)
class TradeController {
  constructor () {
  }

  @Post('/book')
  async bookTrade (ctx) {
    console.log('Book a trade')
    return await ctx.success('Logged in!' + this.test(), { content: ctx.request.body })
  }

  @Get('/list')
  async getTradeList (context) {
    console.log('Register process starts')
    return await context.success('Register in!', { content: context.request.body })
  }

  test () {
    console.log('hahaha')
  }
}

export default TradeController
