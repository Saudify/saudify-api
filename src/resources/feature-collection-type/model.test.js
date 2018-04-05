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

  after(function () {
    // TODO: Disconnect
    database = null
  })

  function setup (data) {
    return new FeatureCollectionType(data)
  }

  describe('validation', function () {
    describe('when is invalid model', function () {
      describe('#type', function () {
        describe('required', function () {
          it('should be invalid when type is not defined', async function () {
            try {
              await setup({}).validate()
              expect.fail(null, null, 'Not throw required error')
            } catch (error) {
              expect(error.errors['type'].message).to.equal('Path `type` is required.')
            }
          })
        })
      })
    })

    describe('when is valid model', function () {
      it('should create a valid instance', async function () {
        const error = await setup({ type: 'UPA' }).validate()
        expect(error).to.be.undefined
      })
    })
  })
})
