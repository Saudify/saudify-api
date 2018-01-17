'use strict'

// node-crawler
const Crawler = require('crawler')
// local module
const { getInstance } = require('./factory')

describe('Unit: dataset/crawler/crawler', function () {
  describe('#getInstance', function () {
    it('should return the crawler instance', function () {
      const actual = getInstance()
      expect(actual).to.be.instanceof(Crawler)
    })
  })
})
