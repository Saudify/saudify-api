'use strict'

const { isValidCoords } = require('./coordinates')

describe('Unit: lib/geolocation/coordinates', function () {
  describe('#isValidCoords', function () {
    describe('when coordinates is invalid', function () {
      describe('when is out of limit', function () {
        it('should return false when lat is greater than max value', function () {
          const actual = isValidCoords([-180, 91])
          expect(actual).to.be.false
        })

        it('should return false when lng is less than min value', function () {
          const actual = isValidCoords([-181, 90])
          expect(actual).to.be.false
        })

        it('should return false when lat and lng is out of limit', function () {
          const actual = isValidCoords([-181, 91])
          expect(actual).to.be.false
        })
      })
    })

    describe('when coordinates is valid', function () {
      it('should return true when lat and lng min and max value', function () {
        const actual = isValidCoords([-180, 90])
        expect(actual).to.be.true
      })

      it('should return true when lat and lng are between max and min', function () {
        const actual = isValidCoords([-73.856077, 40.848447])
        expect(actual).to.be.true
      })
    })
  })
})
