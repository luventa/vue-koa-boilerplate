import HttpErrror from './HttpErrror'
/**
 * Bad request error.
 * Usage: throw new BadRequestError(message) in your controller action and.
 * default error handler will deal with it.
 * http status code will be set to 400
 */
export default class BadRequestError extends HttpError {
  constructor (message) {
    super(400, message)
  }
}
