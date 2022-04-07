const { Router } = require('express');

const router = Router();

router.use('/inbound', require('./inbound'));

router.use('/outbound', require('./outbound'));

router.use('/init', require('./init'));

router.use('/login', require('./login'));

module.exports = router;