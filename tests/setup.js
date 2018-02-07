/**
 * Setup application tests helpers
 * and globals reference.
 */

'use strict'

const chai = require('chai')
const supertest = require('supertest')
const app = require('../src/config/app')

global.request = supertest(app)
global.expect = chai.expect