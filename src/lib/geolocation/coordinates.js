'use strict'

module.exports = {
  isValidCoords
}

/**
 * Verify if latitude and longitude are valid.
 *
 * @param {Number[]} coords
 * @returns {Boolean}
 */
function isValidCoords (coords) {
  const lng = coords[0] * 1
  const lat = coords[1] * 1

  return (lng >= -180 && lng <= 180) &&
    (lat >= -90 && lat <= 90)
}
