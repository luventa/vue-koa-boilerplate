import HttpErrror from './HttpErrror'
/**
 * Forbidden error.
 * Usage: throw new ForbiddenError(message) in your controller action and.
 * default error handler will deal with it.
 * http status code will be set to 403
 */
export default class ForbiddenError extends HttpError {
  constructor (message) {
    super(403, message)
  }
}
