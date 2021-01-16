const bcrypt = require('bcryptjs');
const Manager = require('../models/manager');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const validateManagerInput = require('../validation/manager');

exports.signupPage = (req, res) => {
  res.render('signup', {
    pageTitle: 'signup',
    path: '/api/signup',
  });
}

exports.loginPage = (req, res) => {
  res.render('login', {
    pageTitle: 'login',
    path: '/api/login',
  });
}

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
    const result = await manager.save();
    res.status(201).json({
      data: result
    })
  } catch (err) {
    res.status(500).json({
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
    const currentManager = await Manager.findOne({email: req.body.email});
    if (!currentManager) {
      throw new Error ('manager with such an email does not exist in the system');
    }
    const isPasswordCorrect = await bcrypt.compare(req.body.password, currentManager.password);
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
        message: 'login failed'
     })
  }
}
