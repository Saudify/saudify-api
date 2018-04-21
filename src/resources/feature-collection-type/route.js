'use strict'

const { buildSuccess } = require('../../lib/http/responser')
const wrapper = require('../../lib/http/middlewares/wrapper')
const FeatureCollectionType = require('./model')

module.exports = router => {
  router.get('/feature-collection-types', wrapper(async (req, res) => {
    const types = await FeatureCollectionType.find({})
    const json = buildSuccess(200, types)
    res.status(200).json(json)
  }))
}
