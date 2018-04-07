'use strict'

const { connect } = require('../../database')
const FeatureCollectionType = require('./model')

const setup = data =>
  new FeatureCollectionType(data)

describe('Unit: resources/feature-collection-type', function () {
  let database = null

  before(async function () {
    database = await connect(process.env.MONGO_URI)
  })

  after(async function () {
    await database.disconnect()
  })

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
