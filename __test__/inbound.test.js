const request = require('supertest');
const app = require('../app');

describe('POST inbound', () => {
    test('from is invalid', async () => {
        const datas = [
            { from: '284', to: '1234567', text: 'jnvjd' },
            { from: '284123456789123456', to: '1234567', text: 'jnvjd' }
        ];
        for (const data of datas) {
            const response = await request(app)
                .post('/api/v1/inbound/sms')
                .send(data).set({
                token: "{\"id\":1,\"auth_id\":\"20S0KPNOIM\",\"username\":\"azr1\",\"token\":\"token\"}"
                });
            expect(JSON.parse(response.text).error).toBe('from is invalid')
        }
    })
    test('from is null', async () => {
        const response = await request(app)
            .post('/api/v1/inbound/sms')
            .send({ to: '1234567', text: 'jnvjd' }).set({
                token: "{\"id\":1,\"auth_id\":\"20S0KPNOIM\",\"username\":\"azr1\",\"token\":\"token\"}"
            });
            expect(JSON.parse(response.text).error).toBe('from is missing')
    })
    test('to is null', async () => {
        const response = await request(app)
            .post('/api/v1/inbound/sms')
            .send({ from: '309329847348', text: 'jnvjd' }).set({
                token: "{\"id\":1,\"auth_id\":\"20S0KPNOIM\",\"username\":\"azr1\",\"token\":\"token\"}"
            });
            expect(JSON.parse(response.text).error).toBe('to parameter not found')
    })
    test('to is invalid', async () => {
        const response = await request(app)
            .post('/api/v1/inbound/sms')
            .send({ from: '309329847348', to: '329847348', text: 'jnvjd' }).set({
                token: "{\"id\":1,\"auth_id\":\"20S0KPNOIM\",\"username\":\"azr1\",\"token\":\"token\"}"
            });
            expect(JSON.parse(response.text).error).toBe('to parameter not found')
    })
    test('message is null/invalid', async () => {
        const response = await request(app)
            .post('/api/v1/inbound/sms')
            .send({ to: '4924195509198', from: '309329847348' }).set({
                token: "{\"id\":1,\"auth_id\":\"20S0KPNOIM\",\"username\":\"azr1\",\"token\":\"token\"}"
            });
            expect(JSON.parse(response.text).error).toBe('unknown failure')
    })
    test('everything is valid', async () => {
        const response = await request(app)
            .post('/api/v1/inbound/sms')
            .send({ to: '4924195509198', from: '309329847348', text: 'jnvjd'  }).set({
                token: "{\"id\":1,\"auth_id\":\"20S0KPNOIM\",\"username\":\"azr1\",\"token\":\"token\"}"
            });
            expect(JSON.parse(response.text).message).toBe('inbound sms ok')
    })
})