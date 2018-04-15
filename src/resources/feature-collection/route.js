'use strict'

const { buildSuccess, buildError } = require('../../lib/http/responser')
const { validateCoords } = require('./middlewares')
const FeatureCollection = require('./model')

module.exports = router => {
  router.get('/feature-collections', validateCoords, async (req, res) => {
    let json
    try {
      const { lng, lat } = req.query
      const featureCollections = await FeatureCollection
        .find({
          'geometry.coordinates': {
            $near: [ lng, lat ],
            // 5 km
            $maxDistance: 0.05
          }
        })

      json = buildSuccess(200, featureCollections)
      res.status(200)
    } catch (e) {
      json = buildError(500, e)
      res.status(500)
    }
    res.json(json)
  })
}
