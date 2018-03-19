'use strict'

const https = require('https')
const serverModule = require('./server')

describe('Unit: config/server', function () {
  describe('default export', function () {
    let server

    after(function (done) {
      server.close(() => done())
    })

    it('should return Server instance', function () {
      const app = () => {}
      server = serverModule(app)
      expect(server).to.be.instanceOf(https.Server)
    })
  })
})
