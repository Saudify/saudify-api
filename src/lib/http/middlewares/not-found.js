'use strict'

const { buildError } = require('../responser')

module.exports = (req, res) => {
  const notFound = new Error('Route not found')
  const json = buildError(404, notFound)

  res.status(404).json(json)
}
