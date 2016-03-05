const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../utils/authHelpers').auth;

const Person = mongoose.model('Person');
const Visit = mongoose.model('Visit');

/**
 * @api {get} /visits Get all visits
 * @apiName GetVisits
 * @apiGroup Visit
 *
 * @apiVersion 1.0.0
 */
router.get('/', auth, (req, res) => {
  Visit.find({}, (err, visits) => {
    if (err) return res.status(500).send(err);
    res.json(visits);
  });
});


module.exports = router;

// /**
//  * @api {post} /persons/:id/visit Register a visit
//  * @apiName VisitPerson
//  * @apiGroup Person
//  *
//  * @apiVersion 1.0.0
//  *
//  * @apiParam  {Number}  id              Unique id for the person
//  *
//  * @apiParam  {String}  notes           Notes about the visit
//  * @apiParam  {Date}    date_visited    The date the visit occurred
//  *
//  */
// router.post('/:id/visit', auth, (req, res) => {
//   Person.findById(req.params.id, (err, person) => {
//     if (err) return res.status(500).send(err);
//     const visit = new Visit(req.body);

//     visit.save((err, savedVisit) => {
//       if (err) return res.status(500).send(err);

//       person.visits.push(savedVisit._id);

//       person.save(function (err, savedPerson) {
//         if (err) return res.status(500).send(err);
//         res.json(savedVisit);
//       })
//     });
//   });
// });