/**
 * Setup application tests helpers
 * and globals reference.
 */

'use strict'

const sinon = require('sinon')
const chai = require('chai')
const sinonChai = require('sinon-chai')
const dateChai = require('chai-date-string')
const request = require('./helpers/request')

chai.use(sinonChai)
chai.use(dateChai)

global.request = request()
global.expect = chai.expect
global.sinon = sinon
