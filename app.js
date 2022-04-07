const express = require('express');
const dbClient = require('./db');
const redisClient = require('./redis');
require('dotenv').config();


dbClient.connect();
dbClient.on('connect', () => {
    console.log("database connection successful");
})

redisClient.connect();
redisClient.on('connect', () => {
    console.log("redis connection successful");
})

const app = express();

app.use(express.json());

app.use('/api/v1', require('./routes'));

module.exports = app;