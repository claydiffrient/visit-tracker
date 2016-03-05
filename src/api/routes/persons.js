const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../utils/authHelpers').auth;

const Person = mongoose.model('Person');
const Visit = mongoose.model('Visit');

/**
 * @apiDefine Person
 * @apiVersion 1.0.0
 *
 * @apiSuccess {Object[]}                 persons             List of persons
 * @apiSuccess {String}                   persons.name        Name of the person
 * @apiSuccess {String}                   persons.address     Address of the person
 * @apiSuccess {String}                   persons.status      Status of the person
 * @apiSuccess {ObjectId[]}               persons.visits      List of visit IDs for the person
 * @apiSuccess {Date}                     persons.created_at  When record was created
 * @apiSuccess {Date}                     persons.updated_at  When record was last updated
 */

/**
 * @api {get} /persons Get all persons
 * @apiName GetPersons
 * @apiGroup Person
 *
 * @apiVersion 1.0.0
 * @apiUse Person
 *
 */
router.get('/', auth, (req, res) => {
  Person.find({})
        .populate('visits')
        .exec((err, persons) => {
          if (err) return res.status(500).send(err);
          res.json(persons);
        });
});

/**
 * @api {post} /persons Create a person
 * @apiName CreatePerson
 * @apiGroup Person
 *
 * @apiVersion 1.0.0
 * @apiUse Person
 *
 */
router.post('/', auth, (req, res) => {
  const person = new Person(req.body);

  person.created_by = req.user.username;

  person.save((err, savedPerson) => {
    if (err) return res.status(500).send(err);
    console.log(req.user.username);
    console.log(savedPerson);
    res.json(savedPerson);
  });
});

/**
 * @api {delete} /persons/:id Delete a person
 * @apiName DeletePerson
 * @apiGroup Person
 *
 * @apiVersion 1.0.0
 *
 * @apiParam  {Number}  id  Unique id for the person
 *
 * @apiSuccess    {Object}  deletedPerson          The person deleted
 * @apiSuccess    {Person}  deletedPerson.person   The person object representing the deleted person
 * @apiSuccess    {Boolean} deletedPerson.deleted  Indicates if the deletion was successful
 *
 */
router.delete('/:id', auth, (req, res) => {
  Person.findByIdAndRemove(req.params.id, (err, person) => {
    if (err) return res.status(500).send(err);
    res.json({
      person,
      deleted: true
    });
  });
});

/**
 * @api {post} /persons/:id/visit Register a visit
 * @apiName VisitPerson
 * @apiGroup Person
 *
 * @apiVersion 1.0.0
 *
 * @apiParam  {Number}  id              Unique id for the person
 *
 * @apiParam  {String}  notes           Notes about the visit
 * @apiParam  {Date}    date_visited    The date the visit occurred
 *
 */
router.post('/:id/visit', auth, (req, res) => {
  Person.findById(req.params.id, (err, person) => {
    if (err) return res.status(500).send(err);
    const visit = new Visit(req.body);

    visit.save((err, savedVisit) => {
      if (err) return res.status(500).send(err);

      person.visits.push(savedVisit._id);

      person.save(function (err, savedPerson) {
        if (err) return res.status(500).send(err);
        res.json(savedVisit);
      })
    });
  });
});

module.exports = router;
