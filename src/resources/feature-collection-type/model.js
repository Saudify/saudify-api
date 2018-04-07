'use strict'

const mongoose = require('mongoose')

const featureCollectionType = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('FeatureCollectionType', featureCollectionType)
