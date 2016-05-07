const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');
const config = require('config');
const jwt = require('jsonwebtoken');

const userSchema = new Schema({
  name: String,
  username: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true, select: false },
  password_salt: { type: String, required: true, select: false },
  reset_password: Boolean,
  email: { type: String, required: true },
  admin: Boolean,
  created_at: Date,
  updated_at: Date
});

userSchema.pre('save', function (next) {
  const currentDate = new Date();

  this.updated_at = currentDate;

  if (!this.created_at) {
    this.created_at = currentDate;
  }

  next();
});

userSchema.statics.generateHashAndSalt = (password) => {
  const password_salt = crypto.randomBytes(16).toString('hex');
  const password_hash = crypto.pbkdf2Sync(password, password_salt, 1000, 64).toString('hex');
  return {password_salt, password_hash};
};

userSchema.statics.generateJWT = (username, id, reset_password) => {
  const today = new Date();
  const exp = new Date(today);
  const userId = id || '';

  exp.setDate(today.getDate() + 60);
  return jwt.sign({
    id: userId,
    username: username,
    reset_password: reset_password,
    exp: parseInt(exp.getTime() / 1000, 10)
  }, config.get('jwt.secret'));
};

userSchema.methods.validPassword = function (password) {
  const hash = crypto.pbkdf2Sync(new Buffer(password, 'binary'), this.password_salt, 1000, 64).toString('hex');
  return this.password_hash === hash;
}

const User = (mongoose.models.User) ?
              mongoose.model('User') :
              mongoose.model('User', userSchema);


module.exports = User;
