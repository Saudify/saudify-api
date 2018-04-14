'use strict'

const { connect } = require('../../database')
const FeatureCollection = require('./model')
const FeatureCollectionType = require('../feature-collection-type/model')
const url = '/v1/feature-collections'

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

const validLat = -9.6460599
const validLng = -35.726711

describe('Acceptance: feature-collection', function () {
  describe('GET /feature-collections', function () {
    describe('status 200', function () {
      let db
      let created

      before(async function () {
        db = await connect(process.env.MONGO_URI)
        await clear()
        created = await createSingle()
      })

      after(async function () {
        await clear()
        await db.disconnect()
      })

      it('should return json with feature collections', async function () {
        const response = await request
          .get(url)
          .query({ lat: validLat, lng: validLng })
          .expect(200)
          .expect('Content-Type', /json/)

        const { data } = response.body
        expect(data).to.be.an('array').that.have.lengthOf(1)
        expect(data[0]._id).to.equal(created.get('id'))
      })
    })

    describe('status 500', function () {
      const errMsg = 'foo'
      const err = new Error(errMsg)
      let stub

      before(function () {
        const p = Promise.reject(err)
        p.catch(() => {})
        stub = sinon.stub(FeatureCollection, 'find')
        stub.returns(p)
      })

      after(function () {
        stub.restore()
      })

      it('should return json with 500 error', async function () {
        const response = await request
          .get(url)
          .query({ lat: validLat, lng: validLng })
          .expect(500)
          .expect('Content-Type', /json/)

        expect(response.body.message).to.equal(errMsg)
      })
    })

    describe('status 400', function () {
      describe('coordinates querystring', function () {
        it('should return json with status 400 when lat is not defined', async function () {
          const response = await request
            .get(url)
            .query({ lng: validLng })
            .expect(400)
            .expect('Content-Type', /json/)

          expect(response.body.message).to.equal('Invalid coordinates')
        })

        it('should return json with status 400 when lng is not defined', async function () {
          const response = await request
            .get(url)
            .query({ lat: validLat })
            .expect(400)
            .expect('Content-Type', /json/)

          expect(response.body.message).to.equal('Invalid coordinates')
        })

        it('should return json with status 400 when lat is invalid', async function () {
          const response = await request
            .get(url)
            .query({ lat: 91, lng: validLng })
            .expect(400)
            .expect('Content-Type', /json/)

          expect(response.body.message).to.equal('Invalid coordinates')
        })

        it('should return json with status 400 when lng is invalid', async function () {
          const response = await request
            .get(url)
            .query({ lat: validLng, lng: 181 })
            .expect(400)
            .expect('Content-Type', /json/)

          expect(response.body.message).to.equal('Invalid coordinates')
        })
      })
    })
  })
})
