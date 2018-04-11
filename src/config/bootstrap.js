'use strict'

const database = require('../database')

/**
 * Starts application.
 * @param {Server} server
 */
function bootstrap (server) {
  server.listen(process.env.SERVER_PORT, async () => {
    await database.connect(process.env.MONGO_URI)
    console.log('saudify-api running')
  })
}

module.exports = bootstrap
