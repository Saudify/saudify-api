'use strict'

const httpMocks = require('node-mocks-http')
const notFound = require('./not-found')

describe('Unit: lib/http/middlewares/not-found', function () {
  it('should response with 404 json', function () {
    const request = {}
    const response = httpMocks.createResponse()

    notFound(request, response)

    const jsonResponse = JSON.parse(response._getData())

    expect(jsonResponse).to.eql({
      code: 404,
      message: 'Route not found',
      status: 'error'
    })

    expect(response.statusCode).to.equal(404)
    expect(response._isEndCalled()).to.be.true
    expect(response._isJSON()).to.be.true
  })
})
