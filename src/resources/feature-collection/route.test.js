'use strict'

const { connect } = require('../../database')
const FeatureCollection = require('./model')
const FeatureCollectionType = require('../feature-collection-type/model')
const url = '/v1/feature-collections'

const clear = async () => {
  await FeatureCollection.remove({})
  await FeatureCollectionType.remove({})
}

const validLat = -9.66451
const validLng = -35.69613
// +- 15.25 km awayt validLat and validLng
const pointOut = [ -35.78203, -9.55659 ]
// +- 2.15 km near validLat and validLng
const pointInTwo = [ -35.71201, -9.65266 ]
// +- 1.65 km near validLat and validLng
const pointInOne = [ -35.70806, -9.65537 ]

const fixtureCollection = async () => {
  const type = await FeatureCollectionType.create({ name: 'UPA' })
  await FeatureCollection.create(
    {
      type: type.get('id'),
      geometry: {
        type: 'Point',
        coordinates: pointInTwo
      }
    },
    {
      type: type.get('id'),
      geometry: {
        type: 'Point',
        coordinates: pointInOne
      }
    },
    {
      type: type.get('id'),
      geometry: {
        type: 'Point',
        coordinates: pointOut
      }
    }
  )
}

describe('Acceptance: feature-collection', function () {
  describe('GET /feature-collections', function () {
    describe('status 200', function () {
      let db

      before(async function () {
        db = await connect(process.env.MONGO_URI)
        await clear()
        await fixtureCollection()
      })

      after(async function () {
        await clear()
        await db.disconnect()
      })

      it('should return json with feature collections nearest point', async function () {
        const response = await request
          .get(url)
          .query({ lat: validLat, lng: validLng })
          .expect(200)
          .expect('Content-Type', /json/)

        const { data } = response.body
        expect(data).to.be.an('array').that.have.lengthOf(2)

        expect(data[0].type.name).to.equal('UPA')
        expect(data[0].createdAt).to.be.a.dateString()
        expect(data[0].updatedAt).to.be.a.dateString()
        expect(data[0].geometry.type).to.deep.equal('Point')
        expect(data[0].geometry.coordinates).to.deep.equal(pointInOne)

        expect(data[1].geometry.coordinates).to.deep.equal(pointInTwo)
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
