'use strict'

const { isValidCoords } = require('../../lib/geolocation/coordinates')
const { buildError } = require('../../lib/http/responser')

/**
 * Verify if coordinates querystrings are valid.
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 * @param {Function} next
 */
function validateCoords (req, res, next) {
  const { lng, lat } = req.query
  if (!isValidCoords([ lng, lat ])) {
    const error = new Error('Invalid coordinates')
    const jsonError = buildError(400, error)
    return res
      .status(400)
      .json(jsonError)
  }

  next()
}

module.exports = { validateCoords }
