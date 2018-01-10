/**
 * Module that instaciate and configure application.
 *
 * @module config/app
 */

'use strict'

const express = require('express')
const app = express()
const router = express.Router()
const notFoundMiddleware = require('../lib/http/middlewares/not-found')

// application routes
const appRoutes = require('../lib/http/routes')
const namespace = '/v1'

// TODO: Register (cors, helmet, compression and morgan)
// middlewares.

// register route namespace
app.use(namespace, router)

// register application routes
appRoutes(router)

// Errors middlewares
app.use(notFoundMiddleware)

module.exports = app
