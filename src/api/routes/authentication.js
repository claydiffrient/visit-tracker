'use strict';
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = mongoose.model('User');

/**
 * @api {post} /auth/register Register a user
 * @apiName RegisterUser
 * @apiGroup Authentication
 *
 * @apiVersion 1.0.0
 *
 */
router.post('/register', (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({message: 'You must provide a username and a password.'});
  }

  const saltAndHash = User.generateHashAndSalt(req.body.password);


  let user = new User({
    email: req.body.email,
    name: req.body.name,
    username: req.body.username,
    password_salt: saltAndHash.password_salt,
    password_hash: saltAndHash.password_hash
  });

  user.save(function (err) {
    console.log(err);
    if (err) { return next(err); }
    return res.json({token: user.generateJWT()});
  });

});

module.exports = router;
