const dbClient = require('../db');
const redisClient = require('../redis');
const util = require('util');

const query = util.promisify(dbClient.query).bind(dbClient);

exports.outboundSms = async (req, res) => {
    const { from, to, text } = req.body;
    const id = req.user;
    const { count, ttl } = req.count;

    try {
        const checkFrom = await query(`SELECT * FROM phone_number
            WHERE number = $1 AND account_id = $2`, [from, id]);
        if (!to || !from) {
            return res.send({ message: '', error: !to ? 'to is missing' : 'from is missing' });
        } else if (to.length < 6 || to.length > 16 || from.length < 6 || from.length > 16) {
            const type = to.length < 6 || to.length > 16 ? 'to' : 'from';
            return res.send({ message: '', error: `${type} is invalid`  });
        } else if (checkFrom.rows.length < 1) {
            return res.send({ message: '', error: 'from parameter not found' });
        } else if (!text || text.length < 1 || text.length > 120) {
            return res.send({ message: '', error: 'unknown failure' });
        } else {
            const timeLeft = ttl || 86400;
            redisClient.setEx(`${from}`, timeLeft, JSON.stringify(count + 1 || 0));
            return res.send({ message: 'outbound sms ok', error: '', dt: req.count });
        }
    } catch (e) {
        res.status(500).send({ message: 'SERVER ERROR' });
    }
};