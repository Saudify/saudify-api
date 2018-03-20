'use strict'

const { route: status } = require('../../../resources/status')

module.exports = router => {
  [
    status
  ].forEach(route => route(router))
}
