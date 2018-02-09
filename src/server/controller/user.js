import { Controller, Post } from '../deacon/decorator'

@Controller('/api/user')
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
