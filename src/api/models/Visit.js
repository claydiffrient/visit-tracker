const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const visitSchema = new Schema({
  notes: String,
  date_visited: Date,
  note_entered_by: {type: Schema.Types.ObjectId, ref: 'User'},
  person: {type: Schema.Types.ObjectId, ref: 'Person'},
  created_at: Date,
  updated_at: Date
});

visitSchema.pre('save', (next) => {
  const currentDate = new Date();

  this.updated_at = currentDate;

  if (!this.created_at) {
    this.created_at = currentDate;
  }

  next();
});

const Visit = (mongoose.models.Visit) ?
                mongoose.model('Visit') :
                mongoose.model('Visit', visitSchema);


module.exports = Visit;
