const config = require('config');
const jwt = require('express-jwt');
const mongoose = require('mongoose');
const User = mongoose.model('User');

// jwt auth helper
const auth = jwt({
  secret: config.get('jwt.secret')
});

// must reset helper
// should always be called after auth
const mustReset = (req, res, next) => {
  if (req.user.reset_password) {
    res.status(403).send({
      message: 'Password must be reset before access to this resource will be granted'
    });
  } else {
    next();
  }
};

module.exports = {
  auth,
  mustReset
};
