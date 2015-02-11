var mongoose = require('mongoose');

var captionsSchema = new mongoose.Schema({
  _id: { type: String, unique: true},
  captions: [{
      start: Number,
      dur: Number,
      value: String,
      extra_data: Array
  }]
});

module.exports = mongoose.model('Captions', captionsSchema);