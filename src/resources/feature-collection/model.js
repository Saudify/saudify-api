'use strict'

const mongoose = require('mongoose')
const { isValidCoords } = require('../../lib/geolocation/coordinates')

const featureCollection = new mongoose.Schema({
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FeatureCollectionType',
    required: true
  },
  geometry: {
    type: {
      type: String,
      required: true,
      default: 'Point'
    },
    coordinates: {
      // [0] - longitude, [1] - latitude
      type: [Number],
      index: '2d',
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

module.exports = mongoose.model('FeatureCollection', featureCollection)
