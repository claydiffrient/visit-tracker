const config = require('config');
const jwt = require('express-jwt');

// jwt auth helper
const auth = jwt({
  secret: config.get('jwt.secret')
});

module.exports = {
  auth
};