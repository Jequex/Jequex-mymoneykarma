const request = require('supertest');
const app = require('../app');

describe('POST outbound', () => {
    describe('required parameter is missing', () => {
        test('from parameter is missing', async () => {
            const response = await request(app).post('/api/v1/outbound/sms')
                .send({ to: '1234567', text: 'jnvjd' }).set({
                    token: "1"
                });
            expect(JSON.parse(response.text).error).toBe('from is missing')
        })
        test('to parameter is missing', async () => {
            const response = await request(app).post('/api/v1/outbound/sms')
                .send({ from: '1234567', text: 'jnvjd' }).set({
                    token: "1"
                });
            expect(JSON.parse(response.text).error).toBe('to is missing')
        })
    })
    describe('parameter is invalid', () => {
        test('from parameter is invalid', async () => {
            const datas = [{ to: '1234567', from: '1234', text: 'jnvjd' }, { to: '1234567', from: '12345678901234567890', text: 'jnvjd' }]
            for (const data of datas) {
                const response = await request(app).post('/api/v1/outbound/sms')
                    .send(data).set({
                        token: "1"
                    });
                expect(JSON.parse(response.text).error).toBe('from is invalid')
            }
        })
        test('to parameter is invalid', async () => {
            const datas = [{ from: '1234567', to: '1234', text: 'jnvjd' }, { from: '1234567', to: '12345678901234567890', text: 'jnvjd' }]
            for (const data of datas) {
                const response = await request(app).post('/api/v1/outbound/sms')
                    .send(data).set({
                        token: "1"
                    });
                expect(JSON.parse(response.text).error).toBe('to is invalid')
            }
        })
    })
    test('to and from in cache STOP', async () => {
        await request(app)
            .post('/api/v1/inbound/sms')
            .send({ to: '4924195509198', from: '309329847348', text: 'STOP' })
            .set({token: "1"});
        const response = await request(app)
            .post('/api/v1/outbound/sms')
            .send({ to: '4924195509198', from: '309329847348', text: 'STOP' })
            .set({token: "1"});
        expect(JSON.parse(response.text).error).toBe('sms from 309329847348 to 4924195509198 blocked by STOP request')
    })
    test('from is not in phone number table', async () => {
        const response = await request(app)
            .post('/api/v1/outbound/sms')
            .send({ to: '4924195504628', from: '309329847348', text: 'jnvjd' })
            .set({
                token: "1"
            });
        expect(JSON.parse(response.text).error).toBe('from parameter not found')
    })
    test('other unexpected errors', async () => {
        const datas = [
            { to: '4924195504628', from: '4924195509196' },
            { to: '4924195504628', from: '4924195509196', text: '' }
        ]
        for (const data of datas) {
            const response = await request(app)
                .post('/api/v1/outbound/sms')
                .send(data)
                .set({
                    token: "1"
                });
            expect(JSON.parse(response.text).error).toBe('unknown failure')
        }
    })
    test('all parameters are valid', async () => {
        const response = await request(app)
            .post('/api/v1/outbound/sms')
            .send({ to: '4924195504628', from: '4924195509196', text: 'jnvjd' })
            .set({
                token: "1"
            });
        expect(JSON.parse(response.text).message).toBe('outbound sms ok')
    })
})

describe('case of multiple requests', () => {
    test('more than 50 requests in 24 hrs', async () => {
        for (let i = 0; i < 52; i++) {
            await request(app)
                .post('/api/v1/outbound/sms')
                .send({ to: '4924195509198', from: '4924195509196', text: 'jnvjd' })
                .set({
                    token: "1"
                });
        }
        const response = await request(app)
            .post('/api/v1/outbound/sms')
            .send({ to: '4924195509198', from: '4924195509196', text: 'jnvjd' })
            .set({
                token: "1"
            });
        expect(JSON.parse(response.text).error).toBe('limit reached for from 4924195509196')
    })
})