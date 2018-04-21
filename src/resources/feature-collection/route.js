'use strict'

const { buildSuccess } = require('../../lib/http/responser')
const { validateCoords } = require('./middlewares')
const wrapper = require('../../lib/http/middlewares/wrapper')
const FeatureCollection = require('./model')

module.exports = router => {
  router
    .route('/feature-collections')
    .all(validateCoords)
    .get(wrapper(async (req, res) => {
      const { lng, lat } = req.query
      const findConds = {
        'geometry.coordinates': {
          $near: [lng, lat],
          // 12 km
          $maxDistance: 0.12
        }
      }
      const featureCollections = await FeatureCollection
        .find(findConds)
        .populate('type')

      const json = buildSuccess(200, featureCollections)
      res.status(200).json(json)
    }))
}
