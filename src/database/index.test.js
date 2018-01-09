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
        // TODO: Uri in env
        await connect('mongodb://localhost/test')
        expect(mongoose.connection.readyState).to.equal(1)
      })
    })

    // TODO
    // describe('connect error')
  })
})
