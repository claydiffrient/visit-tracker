const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');
const config = require('config');
const jwt = require('jsonwebtoken');

const userSchema = new Schema({
  name: String,
  username: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  password_salt: { type: String, required: true },
  email: { type: String, required: true },
  admin: Boolean,
  created_at: Date,
  updated_at: Date
});

userSchema.pre('save', (next) => {
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

userSchema.methods.generateJWT = () => {
  const today = new Date();
  const exp = new Date(today);

  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    username: this.username,
    exp: parseInt(exp.getTime() / 1000, 10)
  }, config.get('jwt.secret'));
};

const User = mongoose.model('User', userSchema);

module.exports = User;
