'use strict'

const { buildSuccess, buildError } = require('../../lib/http/responser')
const { validateCoords } = require('./middlewares')
const FeatureCollection = require('./model')

module.exports = router => {
  router.get('/feature-collections', validateCoords, async (req, res) => {
    // TODO: Filter by collections that are nearest coordinates
    let json
    try {
      const featureCollections = await FeatureCollection.find()
      json = buildSuccess(200, featureCollections)
      res.status(200)
    } catch (e) {
      json = buildError(500, e)
      res.status(500)
    }
    res.json(json)
  })
}
