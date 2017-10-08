const runtime = {
  NODE_ENV: '"production"',
  DEBUG: false
}

const external = {
  axios: {
    baseURL : '"/api"',
    timeout: 120 * 1000,
    withCredentials: true
  }
}

module.exports = {
  runtime,
  external
}
