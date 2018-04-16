'use strict'

const app = require('./app')
const server = require('./server')
const database = require('../database')

/**
 * Starts application.
 */
async function start () {
  const appServer = await server.create(app)
  return new Promise(resolve => {
    appServer.listen(process.env.SERVER_PORT, async () => {
      await database.connect(process.env.MONGO_URI)
      resolve(appServer)
    })
  })
}

module.exports = { start }
