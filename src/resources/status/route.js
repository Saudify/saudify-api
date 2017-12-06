'use strict'

module.exports = router => {
  router.get('/status', (req, res) => {
    res.json({ status: 'ok' })
  })
}
