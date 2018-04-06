'use strict'

const { connect } = require('../../database')
const Model = require('./model')
const ModelType = require('../feature-collection-type/model')

describe('Unit: resources/feature-collection', function () {
  let database
  let FeatureCollection
  let FeatureCollectionType

  before(async function () {
    database = await connect(process.env.MONGO_URI)

    // TODO: Refactor mongoose connection
    // and model definitions!!
    // try load FeatureCollectionType to avoid compiled
    // once error.
    let typeModel
    try {
      typeModel = database.model('FeatureCollectionType')
    } catch (e) {}
    FeatureCollection = Model(database)
    FeatureCollectionType = typeModel || ModelType(database)
  })

  after(async function () {
    await database.disconnect()
  })

  const setup = data => new FeatureCollection(data)
  const setupType = () => new FeatureCollectionType({ type: 'Foo' })

  describe('validation', function () {
    describe('when is invalid model', function () {
      describe('#type', function () {
        describe('required', function () {
          it('should be invalid when type is not defined', async function () {
            try {
              await setup({
                geometry: {
                  type: 'Point',
                  coordinates: [-73.856077, 40.848447]
                }
              }).validate()
              expect.fail(null, null, 'Not throw required error')
            } catch (error) {
              expect(error.errors['type'].message).to.equal('Path `type` is required.')
            }
          })
        })
      })

      describe('#geometry.coordinates', function () {
        describe('invalid value', function () {
          it('should be invalid when geometry.coordinates is not valid coordinates', async function () {
            const lat = 91
            const lng = -181

            try {
              await setup({
                type: setupType(),
                geometry: {
                  type: 'Point',
                  coordinates: [lng, lat]
                }
              }).validate()

              expect.fail(null, null, 'Not throw invalid coordinates value error')
            } catch (error) {
              expect(error.errors['geometry.coordinates'].message).to.equal(`Invalid coordinates: ${lng},${lat}.`)
            }
          })

          it('should be invalid when geometry.coordinates is not a number', async function () {
            try {
              await setup({
                type: setupType(),
                geometry: {
                  coordinates: ['foo', 'bar']
                }
              }).validate()

              expect.fail(null, null, 'Not throw invalid coordinates')
            } catch (error) {
              expect(error.errors['geometry.coordinates'].message).to.equal('Cast to Array failed for value "[ \'foo\', \'bar\' ]" at path "geometry.coordinates"')
            }
          })
        })

        describe('required', function () {
          it('should be invalid when geometry.coordinates is not defined', async function () {
            try {
              await setup({
                type: setupType(),
                geometry: {
                  type: 'Point',
                  coordinates: []
                }
              }).validate()

              expect.fail(null, null, 'Not throw required error')
            } catch (error) {
              expect(error.errors['geometry.coordinates'].message).to.equal('Path `geometry.coordinates` is required.')
            }
          })
        })
      })
    })

    describe('when is valid model', function () {
      it('should create a valid instance', async function () {
        const error = await setup({
          type: setupType(),
          geometry: {
            type: 'Point',
            coordinates: [-73.856077, 40.848447]
          },
          importedAt: new Date()
        }).validate()
        expect(error).to.be.undefined
      })

      it('should create a valid instance with default values', async function () {
        const fCollection = setup({
          type: setupType(),
          geometry: {
            coordinates: [-73.856077, 40.848447]
          }
        })
        const error = await fCollection.validate()
        expect(error).to.be.undefined
        expect(fCollection.geometry.type).to.equal('Point')
      })
    })
  })
})
