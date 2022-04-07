const { Router } = require('express');

const outbound = require('../controllers/outbound');

const { auth, verbCheck } = require('../middlewares/middlewares');
const cache = require('../middlewares/redis/outbound');

const router = Router();

router.use('/sms', verbCheck, auth, cache.checkCount, cache.outBoundSms, outbound.outboundSms);


module.exports = router;