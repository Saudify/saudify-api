'use strict'

const mongoose = require('mongoose')

mongoose.Promise = global.Promise

// TODO: Create pool connection function

/**
 * Connect with mongodb.
 *
 * @async
 * @param {Strong} uri Connection uri.
 * @returns {Promise<Mongoose>}
 */
function connect (uri) {
  return mongoose.connect(uri, {
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0
  })
}

// TODO: Expose disconnect function

module.exports = {
  connect
}
