const request = require('supertest');
const app = require('../app');

describe('POST outbound', () => {
    // test('required parameter is missing', async () => {
    //     const response = await request(app).post('/api/v1/outbound/sms')
    //         .send({ to: '1234567', text: 'jnvjd' }).set({
    //             token: "{\"id\":1,\"auth_id\":\"20S0KPNOIM\",\"username\":\"azr1\",\"token\":\"token\"}"
    //         });
    //     expect(JSON.parse(response.text).error).toBe('to is missing')
    // })
    // test('parameter is invalid', () => {

    // })
    // test('to and from in cache STOP', () => {

    // })
    // test('from is not in phone number table', () => {

    // })
    // test('more than 50 requests in 24 hrs', () => {

    // })
    // test('other unexpected errors', () => {

    // })
    // test('all parameters are valid', () => {

    // })
})