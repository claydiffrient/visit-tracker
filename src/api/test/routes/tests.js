/*eslint-env mocha */
import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import config from 'config';
import app from '../../app';
import User from '../../models/User';

describe('Routes', () => {
  before((done) => {
    mongoose.connect(config.get('DB.url'), () => {
      done();
    });
  });

  after((done) => {
    mongoose.disconnect(() => {
      done();
    });
  });

  describe('PUT /auth/password', () => {
    const { password_salt, password_hash } = User.generateHashAndSalt('hunter2');
    let fakeUser = null;
    let token = null;
    before((done) => {
      fakeUser = new User({
        username: 'fake',
        password_hash: password_hash,
        password_salt: password_salt,
        email: 'fake@example.com'
      });

      fakeUser.save(function (err) {
        done(err);
      });

      token = User.generateJWT(fakeUser.username);
    });

    after((done) => {
      User.remove({}, (err) => {
        if (err) console.log(err);
        done();
      });
    });

    it('responds with 400 if missing the old body property', (done) => {
      request(app)
        .put('/auth/password')
        .set({Authorization: `Bearer ${token}`})
        .send({new: 'abc'})
        .expect(400, done);
    });

    it('responds with 400 if missing the new body property', (done) => {
      request(app)
        .put('/auth/password')
        .set({Authorization: `Bearer ${token}`})
        .send({new: 'abc'})
        .expect(400, done);
    });

    it('responds with 401 if the old password is incorrect', (done) => {
      request(app)
        .put('/auth/password')
        .set({Authorization: `Bearer ${token}`})
        .send({old: 'hunter1', new: 'abc'})
        .expect(401, done);
    });

    it('responds with 200 when everything is correct', (done) => {
      request(app)
        .put('/auth/password')
        .set({Authorization: `Bearer ${token}`})
        .send({old: 'hunter2', new: 'abc'})
        .expect(200, done);
    });

    it('sets the reset_password field to false after success', (done) => {
      request(app)
        .put('/auth/password')
        .set({Authorization: `Bearer ${token}`})
        .send({old: 'hunter2', new: 'abc'})
        .end(() => {
          User.find({username: 'fake'})
              .then((u) => {
                expect(u.reset_password).to.not.be.ok;
                done();
              });
        });
    });
  });

  describe('POST /auth/login', () => {
    const { password_salt, password_hash } = User.generateHashAndSalt('hunter2');
    let fakeUser = null;
    before((done) => {
      fakeUser = new User({
        username: 'fake',
        password_hash: password_hash,
        password_salt: password_salt,
        email: 'fake@example.com'
      });

      fakeUser.save(function (err) {
        done(err);
      });
    });

    after((done) => {
      User.remove({}, (err) => {
        if (err) console.log(err);
        done();
      });
    });

    it('responds with 400 if missing the username body property', (done) => {
      request(app)
        .post('/auth/login')
        .send({password: 'abc'})
        .expect(400, done);
    });

    it('responds with 400 if missing the password body property', (done) => {
      request(app)
        .post('/auth/login')
        .send({body: 'abc'})
        .expect(400, done);
    });

    it('responds with 401 if the password is incorrect', (done) => {
      request(app)
        .post('/auth/login')
        .send({username: 'fake', password: 'hunter1'})
        .expect(401, done);
    });

    it('responds with 401 if the username is incorrect', (done) => {
      request(app)
        .post('/auth/login')
        .send({username: 'fake2', password: 'hunter1'})
        .expect(401, done);
    });

    it('responds with 200 if everything is correct', (done) => {
      request(app)
        .post('/auth/login')
        .send({username: 'fake', password: 'hunter2'})
        .expect(200, done);
    });
  });
});
