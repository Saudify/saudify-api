/**
 * Setup application tests helpers
 * and globals reference.
 */

'use strict'

process.env.NODE_ENV = 'test'

const chai = require('chai')
const supertest = require('supertest')
const app = require('../../')

// TODO: init server only in acceptance tests
// process.env.npm_lifecycle_event

global.request = supertest(app)
global.expect = chai.expect
