const runtime = {
  NODE_ENV: '"testing"',
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
