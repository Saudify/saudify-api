/**
 * Module that create and starts api server.
 *
 * @module config/server
 */

'use strict'

const https = require('https')
const { join } = require('path')
const { readFileSync } = require('fs')

const { CSR_PATH } = require('./constants')

const options = {
  key: readFileSync(join(CSR_PATH, 'saudify.key')),
  cert: readFileSync(join(CSR_PATH, 'saudify.crt'))
}

module.exports = init

/**
 * Starts application server.
 *
 * @param {Object} app Application instance.
 */
function init (app) {
  const { SERVER_PORT } = process.env

  https.createServer(options, app)
    .listen(SERVER_PORT, () =>
      console.log(`Server running at port: ${SERVER_PORT}`))
}
