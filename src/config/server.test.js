'use strict'

const https = require('https')
const serverModule = require('./server')

describe('Unit: config/server', function () {
  describe('#create', function () {
    let server

    after(function (done) {
      server.close(() => done())
    })

    it('should return Server instance', async function () {
      const app = () => {}
      server = await serverModule.create(app)
      expect(server).to.be.instanceOf(https.Server)
    })
  })
})
