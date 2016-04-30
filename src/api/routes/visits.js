const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../utils/authHelpers').auth;
const mustReset = require('../utils/authHelpers').mustReset;

const Visit = mongoose.model('Visit');

/**
 * @api {get} /visits Get all visits
 * @apiName GetVisits
 * @apiGroup Visit
 *
 * @apiVersion 1.0.0
 */
router.get('/', auth, mustReset, (req, res) => {
  Visit.find({})
       .populate('note_entered_by')
       .populate('person')
       .exec((err, visits) => {
         if (err) return res.status(500).send(err);
         res.json(visits);
       });
});

module.exports = router;
