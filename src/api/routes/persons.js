const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Person = mongoose.model('Person');

/* GET Persons */
router.get('/', (req, res) => {
  Person.find({}, (err, persons) => {
    if (err) res.status(500).send(err);
    res.json(persons);
  });
});

module.exports = router;
