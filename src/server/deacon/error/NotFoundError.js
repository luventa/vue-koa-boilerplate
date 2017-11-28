import HttpErrror from './HttpErrror'
/**
 * Not found error.
 * Usage: throw new NotFoundError(message) in your controller action and.
 * http status code will be set to 404
 */
export default class NotFoundError extends HttpError {
  constructor (message) {
    super(404, message)
  }
}
