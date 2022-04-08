const express = require('express');
const dbClient = require('./db');
const redisClient = require('./redis');
require('dotenv').config();


dbClient.connect();

redisClient.connect();

const app = express();

app.use(express.json());

app.use('/api/v1', require('./routes'));

module.exports = app;