'use strict'

/**
 * Starts application.
 * @param {Server} server
 */
function bootstrap (server) {
  const { SERVER_PORT } = process.env
  server.listen(SERVER_PORT)
}

module.exports = bootstrap
