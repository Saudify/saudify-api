'use strict'

const { connect } = require('../../database')
const FeatureCollectionType = require('../feature-collection-type/model')
const url = '/v1/feature-collection-types'

describe('Acceptance: feature-collection-type', function () {
  describe('GET /feature-collection-types', function () {
    describe('status 200', function () {
      let conn

      before(async function () {
        conn = await connect(process.env.MONGO_URI)
        await FeatureCollectionType.remove({})
        await FeatureCollectionType.create({ name: 'UPA' }, { name: 'UBS' })
      })

      after(async function () {
        await FeatureCollectionType.remove({})
        await conn.disconnect()
      })

      it('should return json with feature collection types', async function () {
        const response = await request
          .get(url)
          .expect(200)
          .expect('Content-Type', /json/)

        const { data } = response.body
        expect(data).to.be.an('array').that.have.lengthOf(2)
        expect(data[0].name).to.equal('UPA')
        expect(data[1].name).to.equal('UBS')
      })
    })
  })
})
