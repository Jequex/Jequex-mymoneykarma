const dbClient = require('../db');
const redisClient = require('../redis');
const { promisify } = require('util');

const query = promisify(dbClient.query).bind(dbClient);

exports.inboundSms = async (req, res) => {
    const { from, to, text } = req.body;
    const { id } = req.user;

    try {
        const checkTo = await query(`SELECT * FROM phone_number
            WHERE number = $1 AND account_id = $2`, [to, id]);
        if (!from) {
            return res.send({ message: '', error: 'from is missing' });
        } else if (from.length < 6 || from.length > 16) {
            return res.send({ message: '', error: 'from is invalid'  });
        } else if (!to) {
            return res.send({ message: '', error: 'to parameter not found' });
        } else if (checkTo.rows.length < 1) {
            return res.send({ message: '', error: 'to parameter not found' });
        } else if (!text || text.length < 1 || text.length > 120) {
            return res.send({ message: '', error: 'unknown failure' });
        } else if (text.includes('STOP')) {
            redisClient.setEx(`${from}${to}`, 14400, JSON.stringify({message: '', error: `sms from ${from} to ${to} blocked by STOP request`}))
            return res.send({ message: '', error: 'unknown failure' });
        } else {
            redisClient.setEx(`${from}`, 86400, JSON.stringify({number: 0}))
            return res.send({ message: 'inbound sms ok', error: '' });
        }
    } catch (e) {
        res.status(500).send({ message: 'SERVER ERROR' });
    }
};