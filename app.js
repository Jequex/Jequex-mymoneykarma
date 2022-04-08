const express = require('express');
const dbClient = require('./db');
const redisClient = require('./redis');
const cors = require('cors');
require('dotenv').config();


dbClient.connect();

redisClient.connect();

const app = express();

// app.use(cors);

app.use(express.json());

app.use('/api/v1', require('./routes'));

module.exports = app;