/**
 * Setup application tests helpers
 * and globals reference.
 */

'use strict'

process.env.NODE_ENV = 'test'

const chai = require('chai')
const supertest = require('supertest')
const app = require('../config/app')

global.request = supertest(app)
global.expect = chai.expect
