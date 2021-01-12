const express = require('express');

const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const employeeController = require('../controllers/employees');

router.post('/api/new-employee', checkAuth, employeeController.addEmployee);

router.put('/api/edit-employee/:id', checkAuth, employeeController.editEmployee)

router.get('/api/get-employees', checkAuth, employeeController.getEmployees);

router.get('/api/get-employee/:id', checkAuth, employeeController.getSingleEmployee);

router.delete('/api/delete-employee/:id', checkAuth, employeeController.deleteEmployee);

module.exports = router;
