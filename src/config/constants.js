'use strict'

const { join } = require('path')

module.exports = {
  CERTS_PATH: join(__dirname, '..', '..', 'certs'),
  RESOURCES_PATH: join(__dirname, '..', 'resources')
}
