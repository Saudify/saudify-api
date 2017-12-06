/**
 * Module that load all application routes.
 *
 * @module lib/http/routes
 */

'use strict'

const { route: status } = require('../../../resources/status')

module.exports = router => {
  [
    status
  ].forEach(route => route(router))
}
