const { Client } = require('pg');
require('dotenv').config();

const { DATABASE_URL } = process.env;

const client = new Client({
    connectionString: DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = client;