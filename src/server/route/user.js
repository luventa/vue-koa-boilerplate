import { createRoute } from '../util/deacon'
import UserController from '../controller/user'

const userRoute = createRoute({
  controller: UserController
})

export default userRoute
