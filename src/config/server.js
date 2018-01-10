/**
 * Module that create and starts
 * api server.
 *
 * @module config/server
 */

'use strict'

const https = require('https')
const { join } = require('path')
const { readFileSync } = require('fs')
const { connect } = require('../database')

const certPaths = join(__dirname, 'csr')
const options = {
  key: readFileSync(join(certPaths, 'saudify.key')),
  cert: readFileSync(join(certPaths, 'saudify.crt'))
}

module.exports = init

/**
 * Starts application server.
 *
 * @param {Object} app Application instance.
 */
function init (app) {
  https.createServer(options, app)
    // TODO: put port in config env file.
    .listen(3000, async () => {
      // TODO: put url in config file
      await connect('mongodb://localhost')

      console.log(`Server running`)
    })
}
