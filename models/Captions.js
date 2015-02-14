var mongoose = require('mongoose');

var captionSchema = new mongoose.Schema({
  _id: { type: String, unique: true},
  url: String,
  captions: [{
      start: Number,
      dur: Number,
      value: String,
      extra_data: Array
  }]
});

module.exports = mongoose.model('Caption', captionSchema);