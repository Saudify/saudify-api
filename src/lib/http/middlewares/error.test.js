'use strict'

const httpMocks = require('node-mocks-http')
const errorMid = require('./error')

describe('Unit: lib/http/middlewares/error', function () {
  it('should respond with 500 json', async function () {
    const msg = 'Bug'
    const error = new Error(msg)
    const req = {}
    const res = httpMocks.createResponse()
    const next = sinon.spy()

    errorMid(error, req, res, next)

    expect(JSON.parse(res._getData())).to.eql({
      code: 500,
      message: msg,
      status: 'error'
    })
    expect(res.statusCode).to.equal(500)
    expect(res._isEndCalled()).to.be.true
    expect(res._isJSON()).to.be.true
    expect(next.called).to.be.false
  })
})
