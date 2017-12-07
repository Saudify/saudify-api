/**
 * Construct responses.
 *
 * @module lib/http/responser
 */

'use strict'

module.exports = {
  buildSuccess
}

/**
 * @param {Number} code Http response code.
 * @param {Object} data Response data.
 *
 * @returns {Object}
 */
function buildSuccess (code = 200, data = {}) {
  return {
    code,
    data,
    success: true
  }
}

// TODO: buildError
