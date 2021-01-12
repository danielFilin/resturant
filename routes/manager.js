const express = require('express');

const router = express.Router();

const managerController = require('../controllers/managers');

router.post('/api/signup', managerController.signupManager);

router.post('/api/login', managerController.loginManager);

module.exports = router;
