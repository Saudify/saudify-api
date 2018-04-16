/**
 * Api entrypoint
 */

'use strict'

require('./config/bootstrap')
  .start()
  .then(() => console.log('api running'))
