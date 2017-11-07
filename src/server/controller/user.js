import Controller from './base'
import decipher from '../middleware/decipher'
import { controller, route } from '../util/decorator'

@controller('/api/user')
class UserController extends Controller {
  constructor () {
    super('user')
  }

  @route('/login', 'post', decipher)
  async login (ctx) {
    this.logger.info('user is about to login')
    return await ctx.success('Logged in!' + this.test(), { content: ctx.request.body })
  }

  @route('/register', 'post')
  async register (ctx) {
    this.logger.info('user is about to register')
    return await ctx.success('Register in!', { content: ctx.request.body })
  }

  test () {
    this.logger.info('testing')
    return 'hahahaha'
  }
}

export default UserController
