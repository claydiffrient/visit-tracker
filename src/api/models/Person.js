const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: String,
  address: String,
  status: String,
  visits: [{type: Schema.Types.ObjectId, ref: 'Visit'}],
  created_at: Date,
  created_by: String,
  updated_at: Date,
  updated_by: String
});

personSchema.pre('save', function (next) {
  const currentDate = new Date();
  this.updated_at = currentDate;

  if (!this.created_at) {
    this.created_at = currentDate;
  }

  next();
});

personSchema.virtual('lastVisit').get(function () {
  if (this.visits && this.visits.length) {
    console.log(this.visits[this.visits.length - 1]);
    return this.visits[this.visits.length - 1];
  } else {
    return null;
  }
});

personSchema.methods.getLastVisit = () => {
  console.log(this.visits);
  if (this.visits) {
    return this.visits[this.visits.length - 1];
  } else {
    return null;
  }
};

personSchema.set('toJSON', { virtuals: true });

const Person = (mongoose.models.Person) ?
                mongoose.model('Person') :
                mongoose.model('Person', personSchema);

module.exports = Person;
