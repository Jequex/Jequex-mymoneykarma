const request = require('supertest');
const app = require('../app');

describe('login test', () => {
    test('no username', async () => {
        const response = await request(app).post('/api/v1/login/').send({
            auth_id: 'hi'
        });
        expect(response.statusCode).toBe(403);
    })
    test('no auth_id', async () => {
        const response = await request(app).post('/api/v1/login/').send({
            username: 'hello'
        });
        expect(response.statusCode).toBe(403);
    })
    test('correct credentials', async () => {
        const response = await request(app).post('/api/v1/login/').send({
            username: 'azr1',
            auth_id: '20S0KPNOIM'
        });
        expect(response.statusCode).toBe(200);
    })
})