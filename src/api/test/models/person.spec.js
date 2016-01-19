/*eslint-env mocha */
'use strict';
const expect = require('chai').expect;
const mongoose = require('mongoose');
require('../../models/Person');
const Person = mongoose.model('Person');

describe('Person Model', () => {
  let person;
  before(() => {
    person = new Person({
      name: 'Test Person',
      address: '123 West Street',
      status: 'active',
      visits: []
    });
  });

  it('creates a person', () => {
    expect(person.name).to.equal('Test Person');
  });

  describe('#getLastVisit', () => {
    it('returns the last visit', () => {
      const lastVisit = person.getLastVisit();
      expect(lastVisit).to.be.a(null);
    });
  });
});
