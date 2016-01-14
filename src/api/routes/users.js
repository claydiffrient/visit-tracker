const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = mongoose.model('User');

/* GET Users */
router.get('/', (req, res) => {
  User.find({}, (err, users) => {
    if (err) res.status(500).send(err);
    res.json(users);
  });
});

module.exports = router;
