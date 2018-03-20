'use strict'

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
    status: 'success'
  }
}

/**
 * @param {Number} code Http response code.
 * @param {Error} error
 *
 * @returns {Object}
 */
function buildError (code, error) {
  return {
    code,
    message: error.message,
    status: 'error'
  }
}

module.exports = {
  buildSuccess,
  buildError
}
