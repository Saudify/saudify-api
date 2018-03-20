'use strict'

const express = require('express')
const router = require('./')

describe('Unit: lib/http/routes', function () {
  describe('default exports', function () {
    it('should load all routes', function () {
      // TODO: refactor
      const expressRoute = express.Router()
      const spyGet = sinon.spy(expressRoute, 'get')
      router(expressRoute)
      expect(spyGet).to.have.been.called
    })
  })
})
