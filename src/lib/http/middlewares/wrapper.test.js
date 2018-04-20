'use strict'

const wrapper = require('./wrapper')

const rejectedPromise = err => {
  const p = Promise.reject(err)
  p.catch(() => {})
  return p
}

describe('Unit: lib/http/middlewares/wrapper', function () {
  describe('when fn is resolved', function () {
    it('should resolve wrapped function', async function () {
      const req = {}
      const res = {}
      const next = sinon.spy()
      const fn = sinon.spy()
      const wrapped = wrapper(fn)
      await wrapped(req, res, next)
      expect(fn.calledWith(req, res)).to.be.true
      expect(next.called).to.be.false
    })
  })

  describe('when fn is rejected', function () {
    it('should call next function with error', async function () {
      const req = {}
      const res = {}
      const next = sinon.spy()
      const fn = sinon.stub()
      const err = new Error('bug')
      fn.returns(rejectedPromise(err))

      const wrapped = wrapper(fn)
      await wrapped(req, res, next)

      expect(fn.calledWith(req, res)).to.be.true
      expect(next.calledWith(err)).to.be.true
    })
  })
})
