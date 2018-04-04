'use strict'

/**
 * Starts application.
 * @param {Server} server
 */
function bootstrap (server) {
  server.listen(process.env.SERVER_PORT, () =>
    console.log('saudify-api running')
  )
}

module.exports = bootstrap
