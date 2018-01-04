'use strict'

const { buildSuccess, buildError } = require('./')

describe('Unit: lib/http/responser', function () {
  describe('#buildSuccess', function () {
    describe('build with default params', function () {
      it('should build response with default code and data', function () {
        const actual = buildSuccess()

        expect(actual.code).to.equal(200)
        expect(actual.status).to.equal('success')
        expect(actual.data).to.be.an('object').that.is.empty
      })
    })

    describe('build with defined params', function () {
      it('should build response with code and params', function () {
        const code = 201
        const data = { foo: 'bar' }
        const actual = buildSuccess(code, data)

        expect(actual.code).to.equal(code)
        expect(actual.status).to.equal('success')
        expect(actual.data).to.eql(data)
      })
    })
  })

  describe('#buildError', function () {
    describe('build error response', function () {
      it('should build error response', function () {
        const code = 400
        const msg = 'Foo'
        const error = new Error(msg)
        const actual = buildError(code, error)

        expect(actual.code).to.equal(code)
        expect(actual.message).to.equal(msg)
        expect(actual.status).to.equal('error')
      })
    })
  })
})
