import Router from 'koa-router'
import koaBody from 'koa-body'
import decipher from '../middleware/decipher'
import UserController from '../controller/user'

const router = new Router({ prefix: '/api/user' })
router.use(koaBody())
const userCtrl = new UserController()

router.post('/login', decipher, userCtrl.login)
   
export default router
