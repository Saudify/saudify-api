'use strict'

const { buildSuccess, buildError } = require('../../lib/http/responser')
const { validateCoords } = require('./middlewares')
const FeatureCollection = require('./model')

module.exports = router => {
  router.get('/feature-collections', validateCoords, async (req, res) => {
    let json
    try {
      const { lng, lat } = req.query
      const findConds = {
        'geometry.coordinates': {
          $near: [ lng, lat ],
          // 12 km
          $maxDistance: 0.12
        }
      }
      const featureCollections = await FeatureCollection
        .find(findConds)
        .populate('type')

      json = buildSuccess(200, featureCollections)
      res.status(200)
    } catch (e) {
      json = buildError(500, e)
      res.status(500)
    }
    res.json(json)
  })
}
