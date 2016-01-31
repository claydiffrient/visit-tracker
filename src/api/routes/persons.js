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

router.post('/', (req, res) => {
  const person = new Person(req.body);

  person.save((err, savedPerson) => {
    if (err) res.status(500).send(err);
    console.log(req.body);
    console.log(savedPerson);
    res.json(savedPerson);
  });
});

module.exports = router;
