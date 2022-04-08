const app = require('./app');
const dbClient = require('./db');
const redisClient = require('./redis');

require('dotenv').config();

dbClient.on('connect', () => {
    console.log("database connection successful");
})

redisClient.on('connect', () => {
    console.log("redis connection successful");
})


const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`App is running on port: ${PORT}`);
})