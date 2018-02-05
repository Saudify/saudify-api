/**
 * Api entrypoint
 */

'use strict'

const app = require('./config/app')
const server = require('./config/server')

server(app)

module.exports = app
