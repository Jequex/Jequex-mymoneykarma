const redis = require('redis');
require('dotenv').config();

const { REDIS_STRING } = process.env;

const client = redis.createClient({
    url: REDIS_STRING,
    socket: {
        tls: true,
        rejectUnauthorized: false
    }
});

module.exports = client;