const { Router } = require('express');

const inbound = require('../controllers/inbound');

const { auth, verbCheck } = require('../middlewares/middlewares');

const router = Router();

router.use('/sms', verbCheck, auth, inbound.inboundSms);


module.exports = router;