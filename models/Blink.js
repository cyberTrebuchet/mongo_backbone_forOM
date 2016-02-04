'use strict';

var mongoose = require ('mongoose');

var ObjectId = mongoose.Schema.Types.ObjectId;

var blinkSchema = new mongoose.Schema({
  content: { type: String, trim: true },
  author: String,
  date: { type: Date, default: Date.now },
  nods: Number,
  parent: String
});

module.exports = mongoose.model('Blinks', blinkSchema);
