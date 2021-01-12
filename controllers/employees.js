const Employee = require('../models/employee');
const validateEmployeeInput = require('../validation/employee');
let employeesList = [];

exports.addEmployee = async (req, res) => {
    const { errors, isValid} = validateEmployeeInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const employee = new Employee({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        DateOfBirth: req.body.DateOfBirth,
        dateOfEmployment: req.body.dateOfEmployment
    })
    try {  
        employeesList.push(employee);
        res.status(200).json({
            message: 'employee was added',
    })
    } catch (err) {
    console.log(err);
    res.status(500).json({
        message: 'Employee was not added',
        err: err
    })
    }
}

exports.editEmployee = async (req, res) => {
    const { errors, isValid} = validateEmployeeInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }
    try {  
        for (let i in employeesList) {
            if (employeesList[i]._id == req.params.id) {
                employeesList[i].firstName = req.body.firstName;
                employeesList[i].lastName = req.body.lastName;
                employeesList[i].DateOfBirth = req.body.DateOfBirth;
                employeesList[i].dateOfEmployment = req.body.dateOfEmployment;
            break; 
            }
        }
        res.status(200).json({
            message: 'employee was added',
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Employee was not added',
            err: err
        })
    }
}

exports.getEmployees = async (req, res) => {
    res.status(404).render('404', {
        pageTitle: 'Page not found'
    });
  try {
    if (employeesList.length < 0) {
      res.status(201).json({
        message: 'no employees found'
      })
    }
    res.status(200).json({
      data: employeesList
    })
  } catch (err) {
      res.status(500).json({
       err: err,
       message: 'getting message list failed'
     })
  }
}

exports.deleteEmployee = async (req, res) => {
  try {
    console.log(req.params.id)
    const newList = employeesList.filter(employee => employee._id != req.params.id);
    employeesList = [...newList];
      res.status(201).json({
        message: 'employee was deleted',
      })
  } catch (err) {
      res.status(500).json({
       err: err,
       message: 'Messaged was not deleted'
     })
  }
}
