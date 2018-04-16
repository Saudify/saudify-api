'use strict'

const https = require('https')
const pem = require('pem')

/**
 * Starts application server.
 * @param {Object} app Server request handler.
 * @returns {Promise<Server>}
 */
function create (app) {
  return new Promise((resolve, reject) => {
    pem.createCertificate({ days: 365, selfSigned: true }, function (err, keys) {
      if (err) {
        return reject(err)
      }

      const options = {
        key: keys.serviceKey,
        cert: keys.certificate
      }

      const server = https.createServer(options, app)
      resolve(server)
    })
  })
}

module.exports = { create }
