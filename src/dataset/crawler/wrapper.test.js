'use strict'

// node-crawler
const Crawler = require('crawler')
const { getInstance, fishUri } = require('./wrapper')

describe('Suit: dataset/crawler/crawler', function () {
  describe('Unit', function () {
    describe('#getInstance', function () {
      it('should return the crawler instance', function () {
        const actual = getInstance()
        expect(actual).to.be.instanceof(Crawler)
      })
    })
  })

  describe('Integration', function () {
    describe('#fishUri', function () {
      describe('when request success', function () {
        it('should resolve promise with response', async function () {
          const res = await fishUri('https://github.com/Saudify/saudify-api')
          expect(res).to.be.an('object').that.have.property('$')
        })
      })

      describe('when request error', function () {
        it('should reject promise with error', async function () {
          try {
            await fishUri('https://url.not.exists')
            expect.fail(0, 1, 'fishUri not throw error')
          } catch (error) {
            expect(error.message).to.match(/getaddrinfo ENOTFOUND/)
          }
        })
      })
    })
  })
})
