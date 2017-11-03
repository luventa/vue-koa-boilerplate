import { _, getLogger } from '../util'
import { decrypt } from '../util/helper'

const logger = getLogger('decipher')

export default async (ctx, next) => {
  logger.info('Start to decrypting request data')

  const requestBody = _.get(ctx, 'request.body')
  const cipherText = _.get(requestBody, 'cipher')

  if (_.isEmpty(requestBody) || _.isNil(cipherText)) {
    logger.warn(`Encrypted request post to ${ctx.path} does not contains cipher`)
    return next()
  }

  if (process.env.NODE_ENV !== 'production') {
    logger.debug('Original request body:', _.toString(_.get(requestBody, 'origin')))
  }

  try {
    logger.info('Decrypting cipher', cipherText)
    let decrypted = await decrypt(cipherText)

    if (_.isNil(decrypted)) {
      logger.warn('Successfully decrypted request data. But it is empty')
    } else {
      logger.debug('Successfully decypted request data:', decrypted)
      ctx.request.body = JSON.parse(decrypted)
    }
  } catch (err) {
    logger.error('Error in decrypt process:', err)
  } finally {
    await next()
  }
}
