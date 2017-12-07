'use strict'

const url = '/v1/status'

describe('Acceptance: Status', function () {
  describe('Route /status', function () {
    describe('status 200', function () {
      it('should return json with api status', async function () {
        const response = await request
          .get(url)
          .expect(200)
          .expect('Content-Type', /json/)

        const { data } = response.body

        expect(data.status).to.equal('ok')
        expect(data.uptime).to.be.an('number')
      })
    })
  })
})
