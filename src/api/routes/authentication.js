'use strict';
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const auth = require('../utils/authHelpers').auth;

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
    return res.json({token: User.generateJWT(user.username)});
  });

});

/**
 * @api {post} /auth/login Login a user
 * @apiName LoginUser
 * @apiGroup Authentication
 *
 * @apiVersion 1.0.0
 *
 */
router.post('/login', (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({message: 'You must provide a username and a password.'});
  }

  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err); }

    if (user) {
      return res.json({token: User.generateJWT(req.body.username, user._id)});
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});

router.put('/password', auth, (req, res, next) => {
  console.log(req.body);
  if (!req.body.old || !req.body.new) {
    return res.status(400).json({message: 'You must provide the old password and the new password'});
  }

  User.findOne({username: req.user.username})
      .exec()
      .then((user) => {
        if (!user.validPassword(req.body.old)) {
          return res.status(401).json({ message: 'Incorrect old password'});
        }
        const saltAndHash = User.generateHashAndSalt(req.body.new);

        user
          .update({
            password_salt: saltAndHash.password_salt,
            password_hash: saltAndHash.password_hash
          })
          .exec()
          .then(() => {
            return res.json({message: 'Password updated'});
          });
      });
});



module.exports = router;
