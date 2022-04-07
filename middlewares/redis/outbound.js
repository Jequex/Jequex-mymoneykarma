const client = require('../../redis');

exports.outBoundSms = async (req, res, next) => {
    const { from, to } = req.body;
    
    try {
        const data = await client.get(`${from}${to}`);
        if (data) {
            return res.send(JSON.parse(data));
        }
        next();
    } catch (e) {
        return res.status(500).send({ message: 'SERVER ERROR' });
    }
}

exports.checkCount = async (req, res, next) => {
    const { from } = req.body;
    try {
        const data = await client.get(`${from}`);
        const ttl = await client.ttl(`${from}`);
        if (data) {
            let count = JSON.parse(data);
            if (count >= 50) {
                return res.send({message: '', error: `limit reached for from ${from}`})
            } else {
                req.count = {count, ttl};
                next();
            }
        } else {
            req.count = { count: 0, ttl: 0 };
            next();
        }
    } catch (e) {
        return res.status(500).send({ message: 'SERVER ERROR' });
    }
}