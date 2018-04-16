'use strict'

const bootstrap = require('./bootstrap')
const server = require('./server')
const database = require('../database')

describe('Unit: config/bootstrap', function () {
  describe('#start', function () {
    const serverMock = { listen: (port, cb) => cb() }
    let serverStub
    let databaseSpy

    before(function () {
      databaseSpy = sinon.spy(database, 'connect')
      serverStub = sinon.stub(server, 'create')
      serverStub.returns(serverMock)
    })

    after(function () {
      databaseSpy.restore()
      serverStub.restore()
    })

    it('should starts server', async function () {
      const listenSpy = sinon.spy(serverMock, 'listen')
      const actual = await bootstrap.start()
      expect(actual).to.equal(serverMock)
      expect(listenSpy).to.have.been.calledWith(process.env.SERVER_PORT)
      expect(databaseSpy).to.be.calledWith(process.env.MONGO_URI)
    })
  })
})
