/**
 * Module that creates crawler instance.
 */

'use strict'

const Crawler = require('crawler')

/**
 * Create a crawler instance.
 *
 * @returns {Crawler}
 */
module.exports.getInstance = () =>
  new Crawler({ maxConnections: 10 })
