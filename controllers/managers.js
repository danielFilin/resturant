const bcrypt = require('bcryptjs');
const Manager = require('../models/manager');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

let managers = [];

const validateManagerInput = require('../validation/manager');

exports.signupManager = async (req, res) => {
  const { errors, isValid} = validateManagerInput(req.body);
  if (!isValid) {
      return res.status(400).json(errors);
  }
  
  const hash = await bcrypt.hash(req.body.password, 10);
  const manager = new Manager({
    email: req.body.email,
    password: hash
  });
  try {
    managers.push(manager);
    res.status(201).json({
      message: 'User was created',
    })
  } catch (err) {
    res.status(500).json({
      err: err,
      message: 'Manager was not created!'
    })
  }

}

exports.loginManager = async (req, res) => {
  const { errors, isValid} = validateManagerInput(req.body);
  if (!isValid) {
      return res.status(400).json({
        errors: errors,
      });
  }

  try {
    const currentManager = managers.find(manager => manager.email == req.body.email);
    if (!currentManager) {
      throw new Error ('manager with such an email does not exist in the system');
    }
    const isPasswordCorrect = await bcrypt.compare(req.body.password, currentManager.password);
    console.log(isPasswordCorrect);
    if (!isPasswordCorrect) {
      throw new Error ('The user entered an invalid password');
    }
    let token = jwt.sign({email: currentManager.email, userId: currentManager._id}, keys.secretOrKey, {expiresIn: '1h'});

    res.status(200).json({
      message: 'user logged in',
      token: token,
      expiresIn: 3600,
      userId: currentManager._id
   })
  } catch (err) {
      res.status(500).json({
       err: err,
       message: 'login failed'
     })
  }
}
