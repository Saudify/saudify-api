'use strict'

/**
 * Wrap a middleware function to handle errors in a single way.
 * @param {Function} fn Middleware function.
 * @returns {Function}
 */
const wrapper = fn =>
  (req, res, next) =>
    Promise
      .resolve(fn(req, res))
      .catch(error => next(error))

module.exports = wrapper
