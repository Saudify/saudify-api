/**
 * Module that instaciate and configure
 * application.
 *
 * @module config/app
 */

'use strict'

const express = require('express')
const app = express()
const router = express.Router()

// application routes
const appRoutes = require('../lib/http/routes')
const namespace = '/v1'

app.use(namespace, router)

appRoutes(router)

module.exports = app
