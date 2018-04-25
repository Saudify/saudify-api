/**
 * Setup application tests helpers
 * and globals reference.
 */

'use strict'

// avoid self signed certificate error
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const chai = require('chai')
const request = require('./helpers/request')

chai.use(sinonChai)

global.request = request()
global.expect = chai.expect
global.sinon = sinon
