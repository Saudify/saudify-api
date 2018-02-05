/**
 * Module that initialize and connect with database.
 *
 * @module database
 */

const mongoose = require('mongoose')

// config mongoose promise
mongoose.Promise = global.Promise

module.exports = {
  connect
}

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
