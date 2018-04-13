'use strict'

const { buildSuccess, buildError } = require('../../lib/http/responser')
const FeatureCollectionType = require('./model')

module.exports = router => {
  router.get('/feature-collection-types', async (req, res) => {
    let json

    try {
      const types = await FeatureCollectionType.find({})
      json = buildSuccess(200, types)
      res.status(200)
    } catch (e) {
      json = buildError(500, e)
      res.status(500)
    }

    res.json(json)
  })
}
