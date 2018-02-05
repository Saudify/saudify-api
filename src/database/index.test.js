'use strict'

const { connect } = require('./')

describe('Integration: database', function () {
  describe('#connect', function () {
    let conn

    afterEach(async function () {
      if (conn) {
        conn.disconnect()
      }

      conn = null
    })

    describe('connect success', function () {
      it('should connect with mongodb', async function () {
        conn = await connect(process.env.MONGO_URI)
        expect(conn.connection.readyState).to.equal(1)
      })
    })

    describe('connect error', function () {
      describe('when connection uri not exists', function () {
        it('should thrown error when driver cannot connect with uri', async function () {
          try {
            await connect('mongodb://wrongggggg')
            expect.fail(0, 1, 'Connection exception is not thrown')
          } catch (error) {
            expect(error.message).to.match(/failed to connect to server/)
          }
        })
      })
    })
  })
})
