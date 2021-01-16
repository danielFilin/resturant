const express = require('express');

const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const employeeController = require('../controllers/employees');

router.post('/api/employee', checkAuth, employeeController.addEmployee);

router.put('/api/employee/:id', checkAuth, employeeController.editEmployee)

router.get('/api/employees', checkAuth, employeeController.getEmployees);

router.get('/api/employee/:id', checkAuth, employeeController.getSingleEmployee);

router.delete('/api/employee/:id', checkAuth, employeeController.deleteEmployee);

module.exports = router;
