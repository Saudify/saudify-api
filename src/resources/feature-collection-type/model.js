'use strict'

module.exports = db => {
  const featureCollectionType = new db.Schema({
    type: {
      type: String,
      required: true
    }
  })

  return db.model('FeatureCollectionType', featureCollectionType)
}
