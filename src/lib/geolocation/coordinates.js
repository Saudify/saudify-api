'use strict'

/**
 * Verify if latitude and longitude are valid.
 * @param {Number[]} coords Coordinates.
 * @param {Number} coords[0] Longitude.
 * @param {Number} coords[1] Latitude.
 * @returns {Boolean}
 */
function isValidCoords (coords) {
  const lng = coords[0] * 1
  const lat = coords[1] * 1

  return (lng >= -180 && lng <= 180) &&
    (lat >= -90 && lat <= 90)
}

module.exports = {
  isValidCoords
}
