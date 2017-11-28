module.exports = {
  NODE_ENV: '"production"',
  ROUTE_MODE: '"history"',
  DEBUG: false,
  API_CONF: {
    baseURL : '"/api"',
    timeout: 60 * 1000,
    withCredentials: true,
    headers: {
      'x-request-token': '"unique-token"'
    }
  }
}

