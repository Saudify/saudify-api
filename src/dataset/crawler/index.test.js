'use strict'

const Crawler = require('./')
const wrapper = require('./wrapper')
const config = require('../config')

describe('Suit: dataset/crawler', function () {
  let crawler = null

  beforeEach(function () {
    crawler = Crawler(wrapper.getInstance(), config.baseUrl)
  })

  afterEach(function () {
    crawler = null
  })

  // TODO: Is a good idea Unit and Integration test in the same
  // suit???

  describe('Unit', function () {
    describe('creation', function () {
      it('should return the crawler api', function () {
        expect(crawler).to.be.an('object')
      })
    })

    describe('#mountDatasetUrl', function () {
      it('should return the dataset url of a resource', function () {
        const actual = crawler.mountDatasetUrl('foo')
        const expected = `${config.baseUrl}/dataset/foo`

        expect(actual).to.equal(expected)
      })
    })

    describe('#mountResourcePageUrl', function () {
      it('should return the resource page url', function () {
        const href = '/foo'
        const actual = crawler.mountResourcePageUrl(href)
        const expected = `${config.baseUrl}${href}`

        expect(actual).to.equal(expected)
      })
    })
  })

  describe('Integration', function () {
    // url of resource page to execute testes.
    const resourceUrl = 'http://dados.gov.br/dataset/farmacia_popular_brasil/resource/c782a842-0c37-45b7-9c6e-0ad0a611575d'

    // TODO: Tests for crawler request error

    describe('#getResourcePage', function () {
      describe('when crawler request page with success', function () {
        it('should return the url of resource page', async function () {
          const url = await crawler.getResourcePage('farmacia_popular_brasil')

          expect(url).to.equal(resourceUrl)
        })
      })
    })

    describe('#getResourceEndpoint', function () {
      describe('when crawler request page with success', function () {
        it('should return the url of the resource\'s endpoint', async function () {
          const endpointUrl = await crawler.getResourceEndpoint(resourceUrl)
          const expectedUrl = 'http://i3geo.saude.gov.br/i3geo/ogc.php?service=WFS&version=1.0.0&request=GetFeature&typeName=farmacia_popular_brasil&outputFormat=JSON'

          expect(endpointUrl).to.equal(expectedUrl)
        })
      })
    })
  })
})
