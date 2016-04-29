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
  Visit.find({})
       .populate('note_entered_by')
       .populate('person')
       .exec((err, visits) => {
         if (err) return res.status(500).send(err);
         visits.for
         res.json(visits);
       });
});

module.exports = router;