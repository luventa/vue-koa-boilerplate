import BaseController from './base'
import { Controller, Post } from '../util/deacon'

@Controller('/api/user')
class UserController extends BaseController {
  constructor () {
    super('user')
  }

  @Post('/login')
  async login (ctx) {
    this.logger.info('Login process starts')
    this.logger.info('Ctx body:', ctx.request.body)
    return ctx.success('Logged in!', { content: ctx.request.body })
  }

  @Post('/register')
  async register (ctx) {
    this.logger.info('Register process starts')
    return ctx.success('Register in!', { content: ctx.request.body })
  }

  test () {
    this.logger.info('hahahaha, this is a test!')
  }
}

export default UserController
