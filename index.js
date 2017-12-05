/**
 * Api entrypoint
 */

'use strict'

const app = require('./src/config/app')
const server = require('./src/config/server')

server(app)
