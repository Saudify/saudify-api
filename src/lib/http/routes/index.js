'use strict'

const fs = require('fs')
const path = require('path')
const { RESOURCES_PATH } = require('../../../config/constants')

/**
 * Load all resources routes. PS: Should be
 * used only in startup because sync io.
 * @param {Object} routerObj
 */
function router (routerObj) {
  const dirs = fs.readdirSync(RESOURCES_PATH)
  dirs.forEach(resourceDir => {
    const resourcePath = path.join(RESOURCES_PATH, resourceDir)
    const files = fs.readdirSync(resourcePath)
    // assumes that if has 'route.js' the resource
    // should expose route property in entrypoint file
    if (files.includes('route.js')) {
      require(resourcePath).route(routerObj)
    }
  })
}

module.exports = router
