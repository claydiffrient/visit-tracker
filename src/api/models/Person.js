const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: String,
  address: String,
  status: String,
  visits: [{type: Schema.Types.ObjectId, ref: 'Visit'}],
  created_at: Date,
  updated_at: Date
});

personSchema.pre('save', (next) => {
  const currentDate = new Date();

  this.updated_at = currentDate;

  if (!this.created_at) {
    this.created_at = currentDate;
  }

  next();
});

personSchema.methods.getLastVisit = () => {
  return this.visits[this.visits.length];
};

const Person = mongoose.model('Person', personSchema);

module.exports = Person;
