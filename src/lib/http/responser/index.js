/**
 * Construct responses.
 *
 * @module lib/http/responser
 */

'use strict'

/**
 * @param {Number} code Http response code.
 * @param {Object} data Response data.
 *
 * @returns {Object}
 */
module.exports.buildSuccess = (code = 200, data = {}) => ({
  code,
  data,
  status: 'success'
})

/**
 * @param {Number} code Http response code.
 * @param {Error} error
 *
 * @returns {Object}
 */
module.exports.buildError = (code, error) => ({
  code,
  message: error.message,
  status: 'error'
})
