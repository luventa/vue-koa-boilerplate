const runtime = {
  NODE_ENV: '"development"',
  DEBUG: true
}

const external = {
  axios: {
    baseURL : '"/api"',
    timeout: 60 * 1000,
    withCredentials: true
  }
}

module.exports = {
  runtime,
  external
}
