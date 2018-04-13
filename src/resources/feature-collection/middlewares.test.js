'use strict'

const httpMocks = require('node-mocks-http')
const { validateCoords } = require('./middlewares')

const validLat = -9.6460599
const validLng = -35.726711
const getRequest = coords => httpMocks.createRequest({
  method: 'GET',
  url: '/v1/feature-collections',
  query: coords
})
const getResponse = () => httpMocks.createResponse()

describe('Unit: resources/feature-collection/middlewares', function () {
  describe('#validateCoords', function () {
    describe('valid', function () {
      it('should call next when lat and lng are valid', function () {
        const req = getRequest({ lat: validLat, lng: validLng })
        const next = sinon.spy()
        validateCoords(req, {}, next)
        expect(next.called).to.be.true
      })
    })

    describe('invalid', function () {
      it('should be invalid when lat is not defined', function () {
        const req = getRequest({ lng: validLng })
        const res = getResponse()
        const next = sinon.spy()
        validateCoords(req, res, next)
        const body = JSON.parse(res._getData())
        expect(body.message).to.equal('Invalid coordinates')
        expect(res.statusCode).to.equal(400)
        expect(next.called).to.be.false
      })
    })
  })
})
