'use strict'

const { connect } = require('../../database')
const Model = require('./model')

describe('Unit: resources/feature-collection', function () {
  let database = null
  let FeatureCollection = null

  before(async function () {
    database = await connect(process.env.MONGO_URI)
    FeatureCollection = Model(database)
  })

  after(function () {
    // TODO: Disconnect
    database = null
  })

  function setup (data) {
    return new FeatureCollection(data)
  }

  describe('validation', function () {
    describe('when is invalid model', function () {
      describe('#details', function () {
        describe('required', function () {
          it('should be invalid when details.name is not defined', async function () {
            try {
              await setup({
                geometry: {
                  type: 'Point',
                  coordinates: [-73.856077, 40.848447]
                }
              }).validate()

              expect.fail(null, null, 'Not throw required error')
            } catch (error) {
              expect(error.errors['details.name'].message).to.equal('Path `details.name` is required.')
            }
          })
        })
      })
    })

    describe('when is valid model', function () {
      it('should create a valid instance', async function () {
        const error = await setup({
          details: {
            name: 'Foo'
          },
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
          details: {
            name: 'Foo'
          },
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
