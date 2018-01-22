'use strict'

module.exports = db => {
  const featureCollection = new db.Schema({
    details: {
      name: {
        type: String,
        required: true
      }
    },
    geometry: {
      type: {
        type: String,
        required: true,
        default: 'Point'
      },
      coordinates: {
        type: [Number],
        index: '2dsphere',
        required: true
      }
    },
    importedAt: {
      type: Date,
      default: Date.now
    }
  })

  return db.model('FeatureCollection', featureCollection)
}
