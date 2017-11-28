/**
 * Http basic error.
 * Usage: throw new HttpError(status, message) in your controller action and.
 * default error handler will deal with it.
 */
export default class HttpError extends Error {
  constructor (status, message) {
    super()
    this.statusCode = status
    this.message = message
    this.stack = new Error().stack
  }
}
