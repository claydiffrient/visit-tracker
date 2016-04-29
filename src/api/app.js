'use strict';

const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const config = require('config');
const mongoose = require('mongoose');
const cors = require('cors');

let app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.get('DB.url'));

app.models = require('./models');

const routes = require('./routes/index');
const users = require('./routes/users');
const persons = require('./routes/persons');
const authentication = require('./routes/authentication');
const visits = require('./routes/visits');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// TODO: Make this a bit more fine grained.
app.use(cors());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const User = mongoose.model('User');

// Set up the local strategy
passport.use(new Strategy({},
  (username, password, done) => {
    User.findOne({ 'username': username })
        .select('+password_salt')
        .select('+password_hash')
        .exec()
        .then((user) => {
          if (!user) {
            return done(null, false, { message: 'Incorrect username'});
          }
          if (!user.validPassword(password)) {
            return done(null, false, { message: 'Incorrect password'});
          }
          return done(null, user);
        })
        .catch((err) => {
          return done(err, false);
        });

  }
));

app.use(passport.initialize());


app.use('/', routes);
app.use('/auth', authentication)
app.use('/users', users);
app.use('/persons', persons);
app.use('/visits', visits);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
