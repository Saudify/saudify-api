'use strict'

const { isValidCoords } = require('../../lib/geolocation/coordinates')

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
        required: true,
        validate: {
          validator: isValidCoords,
          message: 'Invalid coordinates: {VALUE}.'
        }
      }
    },
    importedAt: {
      type: Date,
      default: Date.now
    }
  })

  return db.model('FeatureCollection', featureCollection)
}
