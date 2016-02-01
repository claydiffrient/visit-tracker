const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Person = mongoose.model('Person');

/* GET Persons */
router.get('/', (req, res) => {
  Person.find({}, (err, persons) => {
    if (err) return res.status(500).send(err);
    res.json(persons);
  });
});

/* POST Persons */
router.post('/', (req, res) => {
  const person = new Person(req.body);

  person.save((err, savedPerson) => {
    if (err) return res.status(500).send(err);
    console.log(req.body);
    console.log(savedPerson);
    res.json(savedPerson);
  });
});

/* DELETE Person */
router.delete('/:id', (req, res) => {
  Person.findByIdAndRemove(req.params.id, (err, person) => {
    if (err) return res.status(500).send(err);
    res.json({
      person,
      deleted: true
    });
  });
});

module.exports = router;
