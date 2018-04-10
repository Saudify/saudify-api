'use strict'

const url = '/v1/feature-collection-type'
const { connect } = require('../../database')
const FeatureCollectionType = require('../feature-collection-type/model')

describe('Acceptance: feature-collection-type', function () {
  let conn

  before(async function () {
    conn = await connect(process.env.MONGO_URI)
  })

  after(async function () {
    await conn.disconnect()
  })

  describe('GET /feature-collection-type', function () {
    describe('status 500', function () {
      const errMsg = 'foo'
      const err = new Error(errMsg)
      let stub

      before(async function () {
        const p = Promise.reject(err)
        p.catch(() => {})

        stub = sinon.stub(FeatureCollectionType, 'find')
        stub.returns(p)
      })

      after(function () {
        stub.restore()
      })

      it('should return json with error', async function () {
        const response = await request
          .get(url)
          .expect(500)
          .expect('Content-Type', /json/)

        expect(response.body.message).to.equal(errMsg)
      })
    })

    describe('status 200', function () {
      before(async function () {
        await FeatureCollectionType.remove({})
        await FeatureCollectionType.create({ name: 'UPA' }, { name: 'UBS' })
      })

      after(async function () {
        await FeatureCollectionType.remove({})
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
