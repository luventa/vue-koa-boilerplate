import userRoute from './user'
import tradeRoute from './trade'

const routes = [
  userRoute,
  tradeRoute
]

export default app => {
  routes.forEach(route => {
    app.use(route.routes(), route.allowedMethods())
  })
}
