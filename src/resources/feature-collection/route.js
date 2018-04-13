'use strict'

const { buildSuccess } = require('../../lib/http/responser')
const FeatureCollection = require('./model')

module.exports = router => {
  router.get('/feature-collections', async (req, res) => {
    // TODO: all :)
    const featureCollections = await FeatureCollection.find()
    const json = buildSuccess(200, featureCollections)
    res.status(200).json(json)
  })
}
