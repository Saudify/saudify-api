/**
 * Module that wrapper Crawler third party module.
 */

'use strict'

const Crawler = require('crawler')

module.exports = {
  getInstance,
  fishUri
}

/**
 * Create a crawler instance.
 *
 * @returns {Crawler}
 */
function getInstance () {
  return new Crawler({ maxConnections: 10 })
}

/**
 * Requests a page.
 *
 * @async
 * @param {String} uri Page url.
 * @returns {Promise}
 */
function fishUri (uri) {
  return new Promise((resolve, reject) => {
    getInstance().queue({
      uri,
      retries: 0,
      callback: (err, res, done) => {
        done()

        if (err) {
          return reject(err)
        }

        resolve(res)
      }
    })
  })
}
