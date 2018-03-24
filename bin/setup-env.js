#!/usr/bin/env node

/**
 * Script that rapidly setup .env data to dev and test enviroments.
 */

'use strict'

const path = require('path')
const fs = require('fs')
const [,, envArg] = process.argv

if (!envArg) {
  throw new Error('Should pass --test or --development :(')
}

const envName = envArg.slice(2)

// configs to rapidly setup enviroment data :)
const configs = {
  test: {
    SERVER_PORT: 3000,
    MONGO_URI: 'mongodb://localhost/saudify_test',
    NODE_ENV: 'test'
  },

  development: {
    SERVER_PORT: 3000,
    MONGO_URI: 'mongodb://localhost/saudify_dev',
    NODE_ENV: 'development'
  }
}

const envData = configs[envName]
const basePath = path.join(__dirname, '..')
const samplePath = path.join(basePath, '.env-sample')
const outEnvPath = path.join(basePath, '.env')

const charTemplate = '%'

fs.readFile(samplePath, 'utf8', (err, data) => {
  let lastReplaced = data
  for (let key in envData) {
    lastReplaced = lastReplaced.replace(`${charTemplate}${key}${charTemplate}`, envData[key])
  }
  
  fs.writeFile(outEnvPath, lastReplaced, err => {
    if (err) {
      throw err
    }
    process.stdout.write('.env created!\n')
  })
})

