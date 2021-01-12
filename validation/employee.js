const isEmpty = require('./isEmpty');
const Validator = require('validator');

module.exports = function validateEmployeeInput(data) {
  let errors = {};
  if(!Validator.isLength(data.firstName, {min:2, max: 25})){
    errors.firstName = 'First name should be at least 2 and maximum 25 charachters long';
  }

  if(!Validator.isLength(data.lastName, {min:2, max: 25})){
    errors.lastName = 'Last name should be at least 2 and maximum 25 charachters long';
  }

  if(!Validator.isDate(data.DateOfBirth)){
    errors.DateOfBirth = 'You must provide correct Birth Date';
  }
  
  if(!Validator.isDate(data.dateOfEmployment)){
    errors.dateOfEmployment = 'The date of employment cannot be left blank';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }

}
