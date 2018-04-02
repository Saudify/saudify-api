'use strict'

const https = require('https')
const { resolve } = require('path')
const { readFileSync } = require('fs')
const { CERTS_PATH } = require('./constants')

const options = {
  key: readFileSync(resolve(CERTS_PATH, 'saudify.key')),
  cert: readFileSync(resolve(CERTS_PATH, 'saudify.cert'))
}

/**
 * Starts application server.
 * @param {Object} app Server request handler.
 * @returns {Server}
 */
function create (app) {
  return https.createServer(options, app)
}

module.exports = { create }
