const request = require('supertest');
const app = require('../app');

describe('HTTP method test', () => {
    // where the method fails
    describe('Given the wrong http method', () => {
        test('should respond with a 405 status for a get request', async () => {
            const response = await request(app).get('/api/v1/init/').send();
            expect(response.statusCode).toBe(405);
        })
        test('should respond with a 405 status for a put request', async () => {
            const response = await request(app).put('/api/v1/init/').send();
            expect(response.statusCode).toBe(405);
        })
        test('should respond with a 405 status for a delete request', async () => {
            const response = await request(app).delete('/api/v1/init/').send();
            expect(response.statusCode).toBe(405);
        })
        test('should respond with a 405 status for a patch request', async () => {
            const response = await request(app).patch('/api/v1/init/').send();
            expect(response.statusCode).toBe(405);
        })
    })

    // where the method passes
    describe('Given the wrong http method', () => {
        test('should respond with a 200 status for a post request', async () => {
            const response = await request(app).post('/api/v1/init/').send();
            expect(response.statusCode).toBe(200);
        })
    })
})

describe('Authentication Test', () => {
    describe('Auth credentials', () => {
        test('shold allow login', async () => {
            const response = await request(app).post('/api/v1/init/auth').send().set({
                token: "{\"id\":1,\"auth_id\":\"20S0KPNOIM\",\"username\":\"azr1\",\"token\":\"token\"}"
            })
            expect(response.statusCode).toBe(200);
        })
    })
    describe('no auth credentials', () => {
        test('shold not allow login', async () => {
            const response = await request(app).post('/api/v1/init/auth').send();
            expect(response.statusCode).toBe(403);
        })
    })
})