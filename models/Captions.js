var mongoose = require('mongoose');

var captionSchema = new mongoose.Schema({
  _id: { type: String, unique: true},
  captions: [{
      start: Number,
      dur: Number,
      value: String,
      extra_data: Array
  }]
});