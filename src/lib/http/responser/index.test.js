'use strict'

const { buildSuccess } = require('./')

describe('Unit: lib/http/responser', function () {
  describe('#buildSuccess', function () {
    describe('build with default params', function () {
      it('should build response with default code and data', function () {
        const actual = buildSuccess()

        expect(actual.code).to.equal(200)
        expect(actual.success).to.be.true
        expect(actual.data).to.be.an('object').that.is.empty
      })
    })

    describe('build with defined params', function () {
      it('should build response with code and params', function () {
        const code = 201
        const data = { foo: 'bar' }
        const actual = buildSuccess(code, data)

        expect(actual.code).to.equal(code)
        expect(actual.success).to.be.true
        expect(actual.data).to.eql(data)
      })
    })
  })
})
