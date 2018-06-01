'use strict'

const { createServer } = require('http')

/**
 * Starts application server.
 * @param {Object} app Server request handler.
 * @returns {Promise<Server>}
 */
function create (app) {
  return new Promise((resolve, reject) => {
    const server = createServer(app)
    return resolve(server)
  })
}

module.exports = { create }
