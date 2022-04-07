const { Router } = require('express');
const initController = require('../controllers/init');

const router = Router();

const { auth, verbCheck } = require('../middlewares/middlewares');

router.use('/auth', verbCheck, auth, initController.init);

router.use('/', verbCheck, initController.init);

module.exports = router;