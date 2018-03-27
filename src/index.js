/**
 * Api entrypoint
 */

'use strict'

const app = require('./config/app')
const server = require('./config/server').create(app)
const bootstrap = require('./config/bootstrap')

bootstrap(server)
