const redis = require('redis');
require('dotenv').config();

const { REDIS_TLS_URL } = process.env;

const client = redis.createClient({
    url: REDIS_TLS_URL,
    socket: {
        tls: true,
        rejectUnauthorized: false
    }
});

module.exports = client;