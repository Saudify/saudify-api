'use strict'

const { connect } = require('../../database')
const FeatureCollection = require('./model')
const FeatureCollectionType = require('../feature-collection-type/model')
const url = '/v1/feature-collection'

const clear = async () => {
  await FeatureCollection.remove({})
  await FeatureCollectionType.remove({})
}

const createSingle = async () => {
  const type = await FeatureCollectionType.create({ name: 'UPA' })
  const collection = await FeatureCollection.create({
    type: type.get('id'),
    geometry: {
      type: 'Point',
      coordinates: [ -61.999823896294, -11.935540304765 ]
    }
  })
  return collection
}

// TODO: Tests to all scenarios
describe('Acceptance: feature-collection', function () {
  describe('GET /feature-collection', function () {
    let db

    before(async function () {
      db = await connect(process.env.MONGO_URI)
    })

    after(async function () {
      await db.disconnect()
    })

    describe('status 200', function () {
      let created

      before(async function () {
        await clear()
        created = await createSingle()
      })

      after(async function () {
        await clear()
      })

      it('should return json with feature collections', async function () {
        const response = await request
          .get(url)
          .expect(200)
          .expect('Content-Type', /json/)

        const { data } = response.body
        expect(data).to.be.an('array').that.have.lengthOf(1)
        expect(data[0]._id).to.equal(created.get('id'))
      })
    })
  })
})
