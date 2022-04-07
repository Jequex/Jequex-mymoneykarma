const client = require('../db');
const util = require('util');

const query = util.promisify(client.query).bind(client);


exports.login = async (req, res) => {
    const { username, auth_id } = req.body;
    try {
        if (!username || !auth_id) {
            return res.status(403).send({ message: 'invalid credentials' });
        } else {
            const user = await query('SELECT * FROM account WHERE username = $1 AND auth_id = $2',
                [username, auth_id]);
            if (user.rows) {
                return res.send(JSON.stringify({...user.rows[0], token: 'token'}));
            } else {
                return res.status(403).send({ message: 'invalid credentials' });
            }
        }
    } catch (e) {
        res.status(500).send({message: 'SERVER ERROR'})
    }
}