const request = require('supertest')
const app = require('../../app')
const { mongoConnect, mongoDisconnect } = require('../../services/mongo')

describe('Launches API', () => {
    beforeAll(async () => {
        await mongoConnect()
    })

    afterAll(async () => {
        await mongoDisconnect()
    })

    describe('GET /launches test', () => {
        test('Should response 200 status', async () => {
            const response = await request(app)
                .get('/v1/launches')
                .expect('Content-Type', /json/)
                .expect(200)
        })
    })
    
    describe('POST /launches tests', () => {
        const completeLaunchDate = {
            mission: 'test mission',
            rocket: 'Test IS1',
            target: 'Kepler-62 f',
            launchDate: 'August 28, 2028',
        }
    
        const launchDataWithoutDate = {
            mission: 'test mission',
            rocket: 'Test IS1',
            target: 'Kepler-62 f',
        }
    
        const launchDataWithInvalidDate = {
            mission: 'test mission',
            rocket: 'Test IS1',
            target: 'Kepler-62 f',
            launchDate: 'bad date',
        }
    
        test('Should response 201 created', async () => {
            const response = await request(app)
                .post('/v1/launches')
                .send(completeLaunchDate)
                .expect('Content-Type', /json/)
                .expect(201)
    
            const requestDate = new Date(completeLaunchDate.launchDate).valueOf()
            const responseDate = new Date(response.body.launchDate).valueOf()
    
            expect(responseDate).toBe(requestDate)
            expect(response.body).toMatchObject(launchDataWithoutDate)
        })
    
        test('Should check missing propoerties', async () => {
            const response = await request(app)
                .post('/v1/launches')
                .send(launchDataWithoutDate)
                .expect('Content-Type', /json/)
                .expect(400)
    
            expect(response.body).toStrictEqual({
                error: 'Missing launch property'
            })
        })
    
        test('Should catch invalid launch date', async () => {
            const response = await request(app)
                .post('/v1/launches')
                .send(launchDataWithInvalidDate)
                .expect('Content-Type', /json/)
                .expect(400)
    
            expect(response.body).toStrictEqual({
                error: 'Invalid Date'
            })
        })
    })
    
    describe('DELETE /launches tests', () => {})
})
