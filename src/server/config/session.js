export default {
  key: 'fucking-nice-session.id',
  signed: false,
  rolling: true,
  httpOnly: process.env.NODE_ENV === 'development',
  maxAge: 5 * 3600 * 1000
}
