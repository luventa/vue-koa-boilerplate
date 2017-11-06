import Controller from './base'
import { autobind } from 'core-decorators'

@autobind
class UserController extends Controller {
  constructor () {
    super('user')
  }

  async login (ctx) {
    this.logger.info('user is about to login')
    return await ctx.success('Logged in!', { content: ctx.request.body })
  }
}

export default UserController
