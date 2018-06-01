'use strict'

const supertest = require('supertest')

const request = () =>
  supertest(`http://saudify-api:${process.env.SERVER_PORT}`)

module.exports = request
