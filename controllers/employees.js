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
    res.status(200);
  } catch (err) {
    console.log(err);
    res.status(500).json({
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
    if (updatedResult.n > 0) {
      res.status(200).json({
        message: 'employee information was edited',
    })
    } else {
      throw new Error ('Information was not changed');
    }
  } catch (err) {
      res.status(500).json({
        message: 'Employee edit failed',
      })
  }
}

exports.getEmployees = async (req, res) => {
  try {
    const allEmployees = await Employee.find();
   
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

exports.getSingleEmployee = async (req, res) => {
  try {
    const singleEmployee = await Employee.findById(req.params.id);
    if (!singleEmployee) {
      res.status(404);
    }
    res.status(200).json({
      data: singleEmployee
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
        data: deletedEmployee
      })
  } catch (err) {
      res.status(500).json({
        err: err,
        message: 'employee was not deleted'
     })
  }
}
