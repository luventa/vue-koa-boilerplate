import HttpErrror from './HttpErrror'
/**
 * Unauthorized error.
 * Usage: throw new UnauthorizedError(message) in your controller action and.
 * http status code will be set to 404
 */
export default class UnauthorizedError extends HttpError {
  constructor (message) {
    super(401, message)
  }
}
