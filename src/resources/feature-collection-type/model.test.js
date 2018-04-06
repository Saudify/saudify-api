'use strict'

const { connect } = require('../../database')
const Model = require('./model')

describe('Unit: resources/feature-collection-type', function () {
  let database = null
  let FeatureCollectionType = null

  before(async function () {
    database = await connect(process.env.MONGO_URI)
    FeatureCollectionType = Model(database)
  })

  after(async function () {
    await database.disconnect()
  })

  function setup (data) {
    return new FeatureCollectionType(data)
  }

  describe('validation', function () {
    describe('when is invalid model', function () {
      describe('#name', function () {
        describe('required', function () {
          it('should be invalid when name is not defined', async function () {
            try {
              await setup({}).validate()
              expect.fail(null, null, 'Not throw required error')
            } catch (error) {
              expect(error.errors['name'].message).to.equal('Path `name` is required.')
            }
          })
        })
      })
    })

    describe('when is valid model', function () {
      it('should create a valid instance', async function () {
        const error = await setup({ name: 'UPA' }).validate()
        expect(error).to.be.undefined
      })
    })
  })
})
