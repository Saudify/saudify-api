'use strict'

const bootstrap = require('./bootstrap')
const database = require('../database')

describe('Unit: config/bootstrap', function () {
  describe('default exports', function () {
    let databaseSpy

    before(function () {
      databaseSpy = sinon.spy(database, 'connect')
    })

    after(function () {
      databaseSpy.restore()
    })

    it('should starts server', function () {
      const mock = { listen: (port, cb) => cb() }
      const listenSpy = sinon.spy(mock, 'listen')

      bootstrap(mock)

      expect(listenSpy).to.have.been.calledWith(process.env.SERVER_PORT)
      expect(databaseSpy).to.be.calledWith(process.env.MONGO_URI)
    })
  })
})
