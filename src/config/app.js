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

// load enviroment data only in dev and test enviroments.
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load()
}

// TODO: Register (logs, cors, helmet, compression and morgan)
// middlewares.

// register app routes namespace
app.use(namespace, router)

// register application routes
appRoutes(router)

/**
 * Errors middlewares
 */

app.use(notFoundMiddleware)

module.exports = app
