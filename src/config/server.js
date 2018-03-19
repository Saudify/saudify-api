'use strict'

const https = require('https')
const { join } = require('path')
const { readFileSync } = require('fs')
const { CSR_PATH } = require('./constants')

const options = {
  key: readFileSync(join(CSR_PATH, 'saudify.key')),
  cert: readFileSync(join(CSR_PATH, 'saudify.crt'))
}

/**
 * Starts application server.
 * @param {Object} app Application instance.
 * @returns {Server}
 */
function server (app) {
  return https.createServer(options, app)
}

module.exports = server
