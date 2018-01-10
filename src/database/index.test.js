'use strict'

const { connect } = require('./')
const mongoose = require('mongoose')

describe('Integration: database', function () {
  describe('#connect', function () {
    describe('connect success', function () {
      after(async function () {
        await mongoose.disconnect()
      })

      it('should connect with mongodb', async function () {
        // .env file should be configured with test enviroment
        await connect(process.env.MONGO_URI)
        expect(mongoose.connection.readyState).to.equal(1)
      })
    })

    describe('connect error', function () {
      describe('when connection uri not exists', function () {
        it('should thrown error when driver cannot connect with uri', async function () {
          try {
            await connect('mongodb://wrongggggg')
            expect.fail(0, 1, 'Connection exception is not thrown')
          } catch (error) {
            expect(mongoose.connection.readyState).to.equal(0)
            expect(error.message).to.match(/failed to connect to server/)
          }
        })
      })
    })
  })
})
