const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports = async (req, res , next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, keys.secretOrKey);
    req.userData = {userId: decodedToken.userId};

    next();
  } catch (err) {
    res.status(401).json({
      message: 'Authorization failed'
    });
  }
}
