'use strict'

const { buildError } = require('../responser')

module.exports = (err, req, res, next) => {
  const json = buildError(500, err)
  res.status(500).json(json)
}
