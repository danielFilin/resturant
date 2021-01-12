const express = require('express');

const router = express.Router();

const managerController = require('../controllers/managers');

router.get('/api/signup', managerController.signupPage);

router.post('/api/signup', managerController.signupManager);

router.get('/api/login', managerController.loginPage);

router.post('/api/login', managerController.loginManager);

module.exports = router;
