const client = require('./redis');

const flushCache = async () => {
    try {

        await client.connect();
        
        const dt = await client.flushAll()
        console.log(dt);

        await client.disconnect();
    } catch (e) {
        console.log(e);
    }
}

flushCache();

module.exports = flushCache;