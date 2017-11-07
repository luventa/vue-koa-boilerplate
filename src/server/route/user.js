import createRouter from './base'
import UserController from '../controller/user'

const userRouterConf = {
  controller: UserController,
  useBody: true
}
   
export default createRouter(userRouterConf)
