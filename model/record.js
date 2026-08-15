const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  index: {type: Number, required: true},
  day: {type: String, required: true},
  from: String,
  to: String,
  duration: Number,
  activity: String,
  code: String,
}, {collection: 'record'});

module.exports = mongoose.model('Record', recordSchema);
