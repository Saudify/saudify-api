'use strict'

const supertest = require('supertest')
const app = require('../../src/config/app')

const request = () => supertest(app)
  // supertest(`http://saudify-api:${process.env.SERVER_PORT}`)

module.exports = request
