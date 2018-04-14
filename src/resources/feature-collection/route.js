'use strict'

const { buildSuccess } = require('../../lib/http/responser')
const { validateCoords } = require('./middlewares')
const FeatureCollection = require('./model')

module.exports = router => {
  router.get('/feature-collections', validateCoords, async (req, res) => {
    // TODO: handle error
    // TODO: Filter by collections that are nearest coordinates
    const featureCollections = await FeatureCollection.find()
    const json = buildSuccess(200, featureCollections)
    res.status(200).json(json)
  })
}
