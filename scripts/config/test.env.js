module.exports = {
  NODE_ENV: '"testing"',
  ROUTE_MODE: '"history"',
  DEBUG: false,
  API_CONF: {
    baseURL : '"/api"',
    timeout: 120 * 1000,
    withCredentials: true,
    headers: {
      'x-request-token': '"unique-token"'
    }
  }
}
