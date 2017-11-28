import HttpErrror from './HttpErrror'
/**
 * Internal server error.
 * Usage: throw new InternalServerError(message) in your controller action and.
 * http status code will be set to 500
 */
export default class InternalServerError extends HttpError {
  constructor (message) {
    super(500, message)
  }
}
