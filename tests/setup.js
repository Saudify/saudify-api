/**
 * Setup application tests helpers
 * and globals reference.
 */

'use strict'

require('dotenv').load()

const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const chai = require('chai')
const supertest = require('supertest')
const app = require('../src/config/app')

chai.use(sinonChai)

global.request = supertest(app)
global.expect = chai.expect
global.sinon = sinon
