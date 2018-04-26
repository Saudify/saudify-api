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
      type: [Number],
      index: '2d',
      required: true,
      validate: {
        validator: isValidCoords,
        message: 'Invalid coordinates: {VALUE}.'
      }
    }
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('FeatureCollection', featureCollection)
