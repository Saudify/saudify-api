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
      const featureCollections = await FeatureCollection
        .where('geometry.coordinates')
        .near({
          center: [ lng, lat ],
          maxDistance: 0.0012,
          spherical: true
        })
        .populate('type')

      const json = buildSuccess(200, featureCollections)
      res.status(200).json(json)
    }))
}
