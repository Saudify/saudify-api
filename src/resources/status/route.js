'use strict'

const { buildSuccess } = require('../../lib/http/responser')

module.exports = router => {
  router.get('/status', (req, res) => {
    const response = buildSuccess(200, {
      status: 'ok',
      uptime: process.uptime()
    })

    res.status(200).json(response)
  })
}
