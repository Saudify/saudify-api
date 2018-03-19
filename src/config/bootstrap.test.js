'use strict'

const bootstrap = require('./bootstrap')

describe('Unit: config/bootstrap', function () {
  describe('default exports', function () {
    it('should starts server', function () {
      const { SERVER_PORT } = process.env
      const mock = { listen: () => {} }
      const stub = sinon.stub(mock, 'listen')
      bootstrap(mock)
      expect(stub).to.have.been.calledWith(SERVER_PORT)
    })
  })
})
