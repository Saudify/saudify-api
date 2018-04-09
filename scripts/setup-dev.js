/**
 * Import static contrib data to development.
 */

'use strict'

const mongoose = require('mongoose')
const upaJson = require('../contrib/data/upa_pac2_func.json')
const { connect } = require('../src/database')
const FeatureCollection = require('../src/resources/feature-collection/model')
const FeatureCollectionType = require('../src/resources/feature-collection-type/model')

// mongoose.set('debug', true)

async function setup () {
  await connect(process.env.MONGO_URI)
  await clear()

  const featureType = await FeatureCollectionType.create({ name: 'UPA' })
  const featuresCollections = upaJson.features.map(feature => ({
    type: featureType.get('id'),
    geometry: feature.geometry
  }))

  await FeatureCollection.collection.insert(featuresCollections)
}

async function clear () {
  const clearPromises = [ 
    FeatureCollection.remove({}),
    FeatureCollectionType.remove({})
  ]
  await Promise.all(clearPromises)
}

setup()
  .then(() => {
    console.log('Imported')
    process.exit(0)
  })
  .catch(e => {
    console.error(e.message)
    process.exit(1)
  })
