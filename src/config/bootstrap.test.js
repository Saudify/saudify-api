'use strict'

const bootstrap = require('./bootstrap')

describe('Unit: config/bootstrap', function () {
  describe('default exports', function () {
    it('should starts server', function () {
      const mock = { listen: sinon.spy() }
      bootstrap(mock)
      expect(mock.listen).to.have.been.calledWith(process.env.SERVER_PORT)
    })
  })
})
