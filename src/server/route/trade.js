import { createRoute } from '../util/deacon'
import TradeController from '../controller/trade'

const tradeRoute = createRoute({
  controller: TradeController,
})
   
export default tradeRoute
