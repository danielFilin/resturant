const express = require('express');

const router = express.Router();
const employeeController = require('../controllers/employees');

router.post('/api/new-employee', employeeController.addEmployee);

router.put('/api/edit-employee/:id', employeeController.editEmployee)

router.get('/api/get-employees', employeeController.getEmployees);

router.delete('/api/delete-employee/:id', employeeController.deleteEmployee);

module.exports = router;
