// import Controller from './base'
// import decipher from '../middleware/decipher'
// import { controller, route } from '../util/decorator'
import { decorators } from '../deacon'

const { Controller, Post } = decorators

@Controller('/api/user', true)
class UserController {
  constructor () {
  }

  @Post('/login')
  async login () {
    console.log('Login process starts')
    return await this.ctx.success('Logged in!' + this.test(), { content: this.ctx.request.body })
  }

  @Post('/register')
  async register (context) {
    console.log('Register process starts')
    return await context.success('Register in!', { content: context.request.body })
  }

  test () {
    console.log('testing')
    return 'hahahaha'
  }
}

export default UserController
