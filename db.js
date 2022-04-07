const { Client } = require('pg');
require('dotenv').config();

const { DB_STRING } = process.env;

const client = new Client({
    connectionString: DB_STRING,
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = client;