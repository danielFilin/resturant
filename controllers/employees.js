const Employee = require('../models/employee');
const validateEmployeeInput = require('../validation/employee');

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
        await employee.save();
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
      editedEmployee = new Employee({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        DateOfBirth: req.body.DateOfBirth,
        dateOfEmployment: req.body.dateOfEmployment,
        _id: req.params.id
      });
      const updatedResult = await Employee.updateOne({_id: req.params.id}, editedEmployee);
      console.log(updatedResult)
      if (updatedResult.n > 0) {
      res.status(200).json({
          message: 'employee information was edited',
      })
      } else {
        throw new Error ('Information was not changed');
      }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Employee edit failed',
            err: err
        })
    }
}

exports.getEmployees = async (req, res) => {
  try {
    const allEmployees = await Employee.find();
    if (allEmployees.length < 0) {
      res.status(201).json({
        message: 'no employees in the system yet'
      })
    }
    res.status(200).json({
      data: allEmployees
    })
  } catch (err) {
      res.status(500).json({
       err: err,
       message: 'getting list of employees failed'
     })
  }
}

exports.deleteEmployee = async (req, res) => {
  try {
    deletedEmployee = await Employee.deleteOne({_id: req.params.id});
      res.status(201).json({
        message: 'employee was deleted',
        data: deletedEmployee
      })
  } catch (err) {
      res.status(500).json({
       err: err,
       message: 'employee was not deleted'
     })
  }
}
