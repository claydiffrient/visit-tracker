const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = mongoose.model('User');

/**
 * @api {get} /users Get all users
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiVersion 1.0.0
 *
 */
router.get('/', (req, res) => {
  User.find({}, (err, users) => {
    if (err) res.status(500).send(err);
    res.json(users);
  });
});

module.exports = router;
