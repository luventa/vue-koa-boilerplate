module.exports = {
  NODE_ENV: '"development"',
  ROUTE_MODE: '"hash"',
  DEBUG: true,
  API_CONF: {
    baseURL : '"/api"',
    timeout: 60 * 1000,
    withCredentials: true,
    headers: {
      'x-request-token': '"unique-token"'
    }
  }
}

